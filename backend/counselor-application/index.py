import json
import os
import smtplib
import ssl
import psycopg2
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


def send_email(subject: str, html_body: str) -> bool:
    admin = os.environ.get('NOTIFICATION_EMAIL')
    if not admin:
        return False
    return send_email_to(admin, subject, html_body)


def handler(event: dict, context) -> dict:
    '''
    Business: Принимает заявки от кандидатов в вожатые-помощники летнего клуба
    Args: event - dict с httpMethod, body (full_name, age, phone, email, about, experience)
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

    full_name = (body_data.get('full_name') or '').strip()
    age = (body_data.get('age') or '').strip()
    phone = (body_data.get('phone') or '').strip()
    email = (body_data.get('email') or '').strip()
    about = (body_data.get('about') or '').strip()
    experience = (body_data.get('experience') or '').strip()

    if not full_name or not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Заполните имя и телефон'}),
        }

    def esc(s: str) -> str:
        return s.replace("'", "''")

    dsn = os.environ['DATABASE_URL']
    conn = psycopg2.connect(dsn)
    try:
        with conn.cursor() as cur:
            cur.execute(
                f"INSERT INTO counselor_applications (full_name, age, phone, email, about, experience) "
                f"VALUES ('{esc(full_name)}', '{esc(age)}', '{esc(phone)}', '{esc(email)}', '{esc(about)}', '{esc(experience)}') "
                f"RETURNING id"
            )
            new_id = cur.fetchone()[0]
        conn.commit()
    finally:
        conn.close()

    def br(s: str) -> str:
        return s.replace('<', '&lt;').replace('>', '&gt;').replace('\n', '<br>')

    html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#FFF8F0;border-radius:12px;">
      <h2 style="color:#FF3D8B;margin:0 0 16px;">🌟 Новая заявка в команду вожатых</h2>
      <table style="width:100%;border-collapse:collapse;background:white;border-radius:8px;overflow:hidden;">
        <tr><td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;width:40%;"><b>Имя:</b></td><td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;">{full_name}</td></tr>
        <tr><td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;"><b>Возраст:</b></td><td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;">{age or '—'}</td></tr>
        <tr><td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;"><b>Телефон:</b></td><td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;"><a href="tel:{phone}">{phone}</a></td></tr>
        <tr><td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;"><b>Email:</b></td><td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;">{email or '—'}</td></tr>
        <tr><td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;vertical-align:top;"><b>О себе:</b></td><td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;">{br(about) or '—'}</td></tr>
        <tr><td style="padding:10px 14px;vertical-align:top;"><b>Опыт:</b></td><td style="padding:10px 14px;">{br(experience) or '—'}</td></tr>
      </table>
      <p style="color:#777;font-size:13px;margin-top:16px;">Свяжитесь с кандидатом по телефону или email.</p>
    </div>
    """
    send_email(f'🌟 Заявка в команду от {full_name}', html)

    if email and '@' in email:
        client_html = f"""
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:0;background:#FFF8F0;border-radius:16px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#6C5CE7 0%,#A855F7 50%,#FF3D8B 100%);padding:28px 24px;text-align:center;">
            <div style="font-size:48px;margin-bottom:8px;">🌟</div>
            <h1 style="color:white;margin:0;font-size:24px;font-family:'Baloo 2',Arial,sans-serif;text-shadow:0 2px 4px rgba(0,0,0,0.15);">Спасибо за заявку!</h1>
          </div>
          <div style="padding:24px;">
            <p style="font-size:16px;color:#3D3D3D;margin:0 0 14px;">Здравствуйте, <b>{full_name}</b>!</p>
            <p style="font-size:15px;color:#3D3D3D;line-height:1.6;margin:0 0 18px;">
              Мы получили вашу заявку и свяжемся с вами в ближайшее время, чтобы познакомиться и обсудить детали.
            </p>
            <p style="font-size:14px;color:#3D3D3D;margin:0;">С уважением,<br><b>Команда летнего клуба «Рыбка Долли»</b> 🐠</p>
          </div>
          <div style="background:#3D3D3D;padding:14px 24px;text-align:center;">
            <p style="color:rgba(255,255,255,0.6);font-size:12px;margin:0;">© Летний клуб «Рыбка Долли» · г. Керчь</p>
          </div>
        </div>
        """
        send_email_to(email, '🌟 Заявка получена — «Рыбка Долли»', client_html)

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        'body': json.dumps({'ok': True, 'id': new_id}),
    }
