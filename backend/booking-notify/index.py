import json
import os
import smtplib
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formataddr


def send_email_to(to_email: str, subject: str, html_body: str) -> bool:
    host = os.environ.get('SMTP_HOST')
    user = os.environ.get('SMTP_USER')
    password = os.environ.get('SMTP_PASSWORD')

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
        print(f'Email send error to {to_email}: {e}')
        return False


def esc(s: str) -> str:
    return (s or '').replace('<', '&lt;').replace('>', '&gt;')


def handler(event: dict, context) -> dict:
    '''
    Business: Уведомление менеджеру о новой попытке брони — отправляется ДО оплаты,
             чтобы менеджер мог связаться с клиентом, даже если оплата не прошла.
    Args: event - dict с httpMethod, body (mother_name, phone, child_name, age, email, shift_id, shift_name, early_start)
          context - объект с request_id
    Returns: HTTP response со статусом отправки
    '''
    method = event.get('httpMethod', 'POST')

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
        body = json.loads(event.get('body') or '{}')
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid JSON'}),
        }

    mother_name = (body.get('mother_name') or '').strip()
    phone = (body.get('phone') or '').strip()
    child_name = (body.get('child_name') or '').strip()
    age = (body.get('age') or '').strip()
    email = (body.get('email') or '').strip()
    shift_id = body.get('shift_id')
    shift_name = (body.get('shift_name') or '').strip()
    early_start = bool(body.get('early_start'))
    stage = (body.get('stage') or 'submit').strip()

    if not mother_name or not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'mother_name and phone required'}),
        }

    early_html = ''
    if early_start:
        early_html = (
            '<tr><td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;background:#FFF1E2;">'
            '<b>🌅 Доп. опция:</b></td>'
            '<td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;background:#FFF1E2;">'
            '<b style="color:#FF5E1A;">Раннее посещение с 8:00 (+3000 ₽, с завтраком)</b>'
            '</td></tr>'
        )

    stage_label = '💳 Перешли к оплате' if stage == 'submit' else '⚠️ Открыли форму'

    html = f"""
    <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;padding:20px;background:#FFF8F0;border-radius:12px;">
      <div style="background:linear-gradient(135deg,#FF3D8B 0%,#FF9A56 50%,#FFD93D 100%);padding:18px;border-radius:10px;margin-bottom:16px;text-align:center;">
        <h2 style="color:white;margin:0;font-size:22px;text-shadow:0 1px 2px rgba(0,0,0,0.2);">
          🎉 Новая бронь — Рыбка Долли
        </h2>
        <div style="color:white;font-size:13px;margin-top:6px;opacity:0.95;">{stage_label}</div>
      </div>
      <table style="width:100%;border-collapse:collapse;background:white;border-radius:8px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.06);">
        <tr><td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;width:42%;"><b>Мама:</b></td>
            <td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;">{esc(mother_name)}</td></tr>
        <tr><td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;"><b>Телефон:</b></td>
            <td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;">
              <a href="tel:{esc(phone)}" style="color:#FF5E1A;font-weight:bold;text-decoration:none;">{esc(phone)}</a>
            </td></tr>
        <tr><td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;"><b>Email:</b></td>
            <td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;">
              <a href="mailto:{esc(email)}" style="color:#FF5E1A;">{esc(email) or '—'}</a>
            </td></tr>
        <tr><td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;"><b>Ребёнок:</b></td>
            <td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;">{esc(child_name)}, {esc(age)} лет</td></tr>
        <tr><td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;"><b>Смена:</b></td>
            <td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;">№{shift_id} — {esc(shift_name)}</td></tr>
        {early_html}
      </table>
      <p style="color:#777;font-size:13px;margin-top:14px;line-height:1.5;">
        💡 Свяжитесь с клиентом по телефону, даже если оплата не прошла — это поможет не потерять заявку.
      </p>
    </div>
    """

    admin = os.environ.get('NOTIFICATION_EMAIL')
    sent = False
    if admin:
        sent = send_email_to(admin, f'🎉 Новая бронь: {mother_name} — смена №{shift_id}', html)

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        'body': json.dumps({'ok': True, 'email_sent': sent}),
    }
