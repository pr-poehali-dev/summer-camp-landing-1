import json
import os
import smtplib
import ssl
import psycopg2
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formataddr


def send_email(subject: str, html_body: str) -> bool:
    """Отправляет письмо на NOTIFICATION_EMAIL через SMTP."""
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


def handler(event: dict, context) -> dict:
    '''
    Business: Принимает вопросы посетителей сайта из формы "Задать вопрос"
    Args: event - dict с httpMethod, body (name, child_age, email, question)
          context - объект с request_id
    Returns: HTTP response со статусом сохранения
    '''
    method: str = event.get('httpMethod', 'POST')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    try:
        body_data = json.loads(event.get('body') or '{}')
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid JSON'}),
        }

    name = (body_data.get('name') or '').strip()
    child_age = (body_data.get('child_age') or '').strip()
    email = (body_data.get('email') or '').strip()
    question = (body_data.get('question') or '').strip()

    if not name or not email or not question:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Заполните имя, email и вопрос'}),
        }

    def esc(s: str) -> str:
        return s.replace("'", "''")

    dsn = os.environ['DATABASE_URL']
    conn = psycopg2.connect(dsn)
    try:
        with conn.cursor() as cur:
            cur.execute(
                f"INSERT INTO questions (name, child_age, email, question) "
                f"VALUES ('{esc(name)}', '{esc(child_age)}', '{esc(email)}', '{esc(question)}') "
                f"RETURNING id"
            )
            new_id = cur.fetchone()[0]
        conn.commit()
    finally:
        conn.close()

    question_escaped = question.replace('<', '&lt;').replace('>', '&gt;').replace('\n', '<br>')
    html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#FFF8F0;border-radius:12px;">
      <h2 style="color:#FF9A56;margin:0 0 16px;">❓ Новый вопрос с сайта</h2>
      <table style="width:100%;border-collapse:collapse;background:white;border-radius:8px;overflow:hidden;">
        <tr><td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;width:40%;"><b>Имя:</b></td><td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;">{name}</td></tr>
        <tr><td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;"><b>Возраст ребёнка:</b></td><td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;">{child_age or '—'}</td></tr>
        <tr><td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;"><b>Email:</b></td><td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;"><a href="mailto:{email}">{email}</a></td></tr>
        <tr><td style="padding:10px 14px;vertical-align:top;"><b>Вопрос:</b></td><td style="padding:10px 14px;">{question_escaped}</td></tr>
      </table>
      <p style="color:#777;font-size:13px;margin-top:16px;">Ответьте клиенту на указанный email.</p>
    </div>
    """
    send_email(f'❓ Новый вопрос от {name}', html)

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        'body': json.dumps({'ok': True, 'id': new_id}),
    }