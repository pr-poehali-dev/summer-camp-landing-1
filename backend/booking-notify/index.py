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


def esc(s) -> str:
    return (str(s) if s is not None else '').replace('<', '&lt;').replace('>', '&gt;')


def handler(event: dict, context) -> dict:
    '''
    Business: Уведомление менеджеру о бронировании или брошенной форме.
             stage="submit" — родитель нажал "Оплатить", форма прошла валидацию.
             stage="abandoned" — родитель открыл форму, что-то заполнил и закрыл.
    Args: event - dict с httpMethod, body
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
    with_friend = bool(body.get('with_friend'))
    friend_name = (body.get('friend_name') or '').strip()
    stage = (body.get('stage') or 'submit').strip()

    is_abandoned = stage == 'abandoned'

    if is_abandoned:
        if not any([mother_name, phone, child_name, age, email, shift_id]):
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Empty form, nothing to notify'}),
            }
    else:
        if not mother_name or not phone:
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'mother_name and phone required'}),
            }

    if is_abandoned:
        stage_label = '⚠️ Не дошёл до оплаты — заполнял форму, но закрыл'
        header_bg = 'linear-gradient(135deg,#FF9A56 0%,#FFB347 50%,#FFD93D 100%)'
        title_text = '⚠️ Брошенная форма брони'
        subject = f'⚠️ Брошенная форма: {mother_name or "(имя не указано)"} — смена №{shift_id or "?"}'
        footer_hint = (
            '💡 Клиент заинтересовался, но не закончил оформление. '
            'Если есть телефон — позвоните: скорее всего, остался вопрос или сомнение, '
            'которое легко закрыть и довести его до оплаты.'
        )
    else:
        stage_label = '💳 Перешли к оплате'
        header_bg = 'linear-gradient(135deg,#FF3D8B 0%,#FF9A56 50%,#FFD93D 100%)'
        title_text = '🎉 Новая бронь — Рыбка Долли'
        subject = f'🎉 Новая бронь: {mother_name} — смена №{shift_id}'
        footer_hint = (
            '💡 Свяжитесь с клиентом по телефону, даже если оплата не прошла — '
            'это поможет не потерять заявку.'
        )

    def cell(label: str, value: str, link: str = '') -> str:
        is_empty = not value or value in ('(не указано)', '—')
        display = link if link and not is_empty else esc(value or '—')
        bg = ';background:#FFF5EE' if is_empty and is_abandoned else ''
        return (
            f'<tr><td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;width:42%{bg};"><b>{label}</b></td>'
            f'<td style="padding:10px 14px;border-bottom:1px solid #FFE5D9{bg};">{display}</td></tr>'
        )

    phone_link = (
        f'<a href="tel:{esc(phone)}" style="color:#FF5E1A;font-weight:bold;text-decoration:none;">{esc(phone)}</a>'
        if phone else ''
    )
    email_link = (
        f'<a href="mailto:{esc(email)}" style="color:#FF5E1A;">{esc(email)}</a>'
        if email else ''
    )

    early_html = ''
    if early_start:
        early_html = (
            '<tr><td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;background:#FFF1E2;">'
            '<b>🌅 Доп. опция:</b></td>'
            '<td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;background:#FFF1E2;">'
            '<b style="color:#FF5E1A;">Раннее посещение с 8:00 (+3000 ₽, с завтраком)</b>'
            '</td></tr>'
        )

    friend_html = ''
    if with_friend:
        friend_value = esc(friend_name) if friend_name else '<i>имя не указано</i>'
        friend_html = (
            '<tr><td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;background:#E8FBF5;">'
            '<b>👯 Акция «Я с другом»:</b></td>'
            '<td style="padding:10px 14px;border-bottom:1px solid #FFE5D9;background:#E8FBF5;">'
            f'<b style="color:#008F78;">−10% обоим</b> · друг: {friend_value}'
            '</td></tr>'
        )

    child_value = ''
    if child_name or age:
        child_value = f'{esc(child_name) or "—"}, {esc(age) or "?"} лет'

    shift_value = ''
    if shift_id:
        shift_value = f'№{esc(shift_id)} — {esc(shift_name)}'

    rows = (
        cell('Мама:', mother_name)
        + cell('Телефон:', phone, phone_link)
        + cell('Email:', email, email_link)
        + cell('Ребёнок:', child_value)
        + cell('Смена:', shift_value)
        + early_html
        + friend_html
    )

    html = f"""
    <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;padding:20px;background:#FFF8F0;border-radius:12px;">
      <div style="background:{header_bg};padding:18px;border-radius:10px;margin-bottom:16px;text-align:center;">
        <h2 style="color:white;margin:0;font-size:22px;text-shadow:0 1px 2px rgba(0,0,0,0.2);">
          {title_text}
        </h2>
        <div style="color:white;font-size:13px;margin-top:6px;opacity:0.95;">{stage_label}</div>
      </div>
      <table style="width:100%;border-collapse:collapse;background:white;border-radius:8px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.06);">
        {rows}
      </table>
      <p style="color:#777;font-size:13px;margin-top:14px;line-height:1.5;">{footer_hint}</p>
    </div>
    """

    admin = os.environ.get('NOTIFICATION_EMAIL')
    sent = False
    if admin:
        sent = send_email_to(admin, subject, html)

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        'body': json.dumps({'ok': True, 'email_sent': sent, 'stage': stage}),
    }