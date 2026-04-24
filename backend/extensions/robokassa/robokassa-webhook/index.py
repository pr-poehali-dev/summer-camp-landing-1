import json
import os
import hashlib
import smtplib
import ssl
import psycopg2
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formataddr
from urllib.parse import parse_qs


def calculate_signature(*args) -> str:
    """Создание MD5 подписи по документации Robokassa"""
    joined = ':'.join(str(arg) for arg in args)
    return hashlib.md5(joined.encode()).hexdigest().upper()


def get_db_connection():
    """Получение подключения к БД"""
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        raise ValueError('DATABASE_URL not configured')
    return psycopg2.connect(dsn)


def send_email(subject: str, html_body: str) -> bool:
    """Отправляет письмо на NOTIFICATION_EMAIL через SMTP. Возвращает True при успехе."""
    host = os.environ.get('SMTP_HOST')
    user = os.environ.get('SMTP_USER')
    password = os.environ.get('SMTP_PASSWORD')
    to_email = os.environ.get('NOTIFICATION_EMAIL')

    if not all([host, user, password, to_email]):
        print('SMTP config missing, skip email')
        return False

    try:
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = formataddr(('Рыбка Долли', user))
        msg['To'] = to_email
        msg.attach(MIMEText(html_body, 'html', 'utf-8'))

        ctx = ssl.create_default_context()
        with smtplib.SMTP_SSL(host, 465, context=ctx, timeout=15) as server:
            server.login(user, password)
            server.sendmail(user, [to_email], msg.as_string())
        return True
    except Exception as e:
        print(f'Email send error: {e}')
        return False


HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'text/plain'
}


def handler(event: dict, context) -> dict:
    '''
    Result URL вебхук от Robokassa для подтверждения оплаты.
    Robokassa отправляет: OutSum, InvId, SignatureValue
    Returns: OK{InvId} если подпись верна и заказ обновлён
    '''
    method = event.get('httpMethod', 'GET').upper()

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': HEADERS, 'body': '', 'isBase64Encoded': False}

    password_2 = os.environ.get('ROBOKASSA_PASSWORD_2')
    if not password_2:
        return {'statusCode': 500, 'headers': HEADERS, 'body': 'Configuration error', 'isBase64Encoded': False}

    # Парсинг параметров из body или query string
    params = {}
    body = event.get('body', '')

    if method == 'POST' and body:
        if event.get('isBase64Encoded', False):
            import base64
            body = base64.b64decode(body).decode('utf-8')
        parsed = parse_qs(body)
        params = {k: v[0] for k, v in parsed.items()}

    if not params:
        params = event.get('queryStringParameters') or {}

    out_sum = params.get('OutSum', params.get('out_summ', ''))
    inv_id = params.get('InvId', params.get('inv_id', ''))
    signature_value = params.get('SignatureValue', params.get('crc', '')).upper()

    if not out_sum or not inv_id or not signature_value:
        return {'statusCode': 400, 'headers': HEADERS, 'body': 'Missing required parameters', 'isBase64Encoded': False}

    # Проверка подписи
    expected_signature = calculate_signature(out_sum, inv_id, password_2)
    if signature_value != expected_signature:
        return {'statusCode': 400, 'headers': HEADERS, 'body': 'Invalid signature', 'isBase64Encoded': False}

    # Обновление статуса заказа
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        UPDATE orders
        SET status = 'paid', paid_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
        WHERE robokassa_inv_id = %s AND status = 'pending'
        RETURNING id, order_number, user_name, user_email, user_phone, amount, order_comment
    """, (int(inv_id),))

    result = cur.fetchone()

    if not result:
        cur.execute("SELECT status FROM orders WHERE robokassa_inv_id = %s", (int(inv_id),))
        existing = cur.fetchone()
        conn.close()

        if existing and existing[0] == 'paid':
            return {'statusCode': 200, 'headers': HEADERS, 'body': f'OK{inv_id}', 'isBase64Encoded': False}
        return {'statusCode': 404, 'headers': HEADERS, 'body': 'Order not found', 'isBase64Encoded': False}

    conn.commit()
    cur.close()
    conn.close()

    order_id, order_number, user_name, user_email, user_phone, amount, order_comment = result

    subject = f'🎉 Новая бронь: {user_name} — {amount} ₽'
    html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#FFF8F0;border-radius:12px;">
      <h2 style="color:#FF9A56;margin:0 0 16px;">🎉 Новая бронь оплачена!</h2>
      <table style="width:100%;border-collapse:collapse;background:white;border-radius:8px;overflow:hidden;">
        <tr><td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;"><b>Номер заказа:</b></td><td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;">{order_number}</td></tr>
        <tr><td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;"><b>Сумма:</b></td><td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;color:#00C9A7;font-weight:bold;">{amount} ₽</td></tr>
        <tr><td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;"><b>Имя:</b></td><td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;">{user_name}</td></tr>
        <tr><td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;"><b>Телефон:</b></td><td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;"><a href="tel:{user_phone or ''}">{user_phone or '—'}</a></td></tr>
        <tr><td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;"><b>Email:</b></td><td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;"><a href="mailto:{user_email}">{user_email}</a></td></tr>
        <tr><td style="padding:10px 14px;"><b>Комментарий:</b></td><td style="padding:10px 14px;">{order_comment or '—'}</td></tr>
      </table>
      <p style="color:#777;font-size:13px;margin-top:16px;">Свяжитесь с клиентом и подтвердите бронь в течение дня.</p>
    </div>
    """
    send_email(subject, html)

    return {'statusCode': 200, 'headers': HEADERS, 'body': f'OK{inv_id}', 'isBase64Encoded': False}