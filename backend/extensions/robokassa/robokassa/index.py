import json
import os
import hashlib
import psycopg2
import random
from urllib.parse import urlencode, quote
from datetime import datetime


def calculate_signature(*args) -> str:
    """Создание MD5 подписи по документации Robokassa"""
    joined = ':'.join(str(arg) for arg in args)
    return hashlib.md5(joined.encode()).hexdigest()


def get_db_connection():
    """Получение подключения к БД"""
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        raise ValueError('DATABASE_URL not configured')
    return psycopg2.connect(dsn)


HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Session-Id, X-Auth-Token',
    'Access-Control-Max-Age': '86400',
    'Content-Type': 'application/json'
}

ROBOKASSA_URL = 'https://auth.robokassa.ru/Merchant/Index.aspx'


def build_receipt(cart_items: list, total_amount: float) -> dict:
    """
    Формирует объект Receipt для Robokassa (ФЗ-54).
    Патентная система налогообложения, НДС не облагается.
    """
    items = []

    if cart_items:
        # Используем переданные позиции корзины
        for item in cart_items:
            name = str(item.get('name', 'Услуга'))[:128]
            quantity = int(item.get('quantity', 1))
            price = float(item.get('price', 0))
            item_sum = round(price * quantity, 2)
            items.append({
                'name': name,
                'quantity': quantity,
                'sum': item_sum,
                'tax': 'none',
                'payment_method': 'full_payment',
                'payment_object': 'service',
            })
    else:
        # Fallback: одна позиция на всю сумму
        items.append({
            'name': 'Летняя смена детского клуба Рыбка Долли',
            'quantity': 1,
            'sum': round(total_amount, 2),
            'tax': 'none',
            'payment_method': 'full_payment',
            'payment_object': 'service',
        })

    # Выравниваем сумму позиций до суммы заказа (копеечные расхождения)
    items_total = round(sum(i['sum'] for i in items), 2)
    if items_total != round(total_amount, 2) and items:
        diff = round(total_amount - items_total, 2)
        items[-1]['sum'] = round(items[-1]['sum'] + diff, 2)

    return {
        'sno': 'patent',
        'items': items,
    }


def handler(event: dict, context) -> dict:
    '''
    Создание заказа и генерация ссылки на оплату Robokassa.
    POST body: amount, user_name, user_email, user_phone, user_address, cart_items
    Returns: payment_url, order_id, order_number
    Передаёт Receipt с номенклатурой по ФЗ-54 (патентная система, tax=none).
    '''
    method = event.get('httpMethod', 'GET').upper()

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': HEADERS, 'body': '', 'isBase64Encoded': False}

    if method != 'POST':
        return {'statusCode': 405, 'headers': HEADERS, 'body': json.dumps({'error': 'Method not allowed'}), 'isBase64Encoded': False}

    try:
        merchant_login = os.environ.get('ROBOKASSA_MERCHANT_LOGIN')
        password_1 = os.environ.get('ROBOKASSA_PASSWORD_1')

        if not merchant_login or not password_1:
            return {'statusCode': 500, 'headers': HEADERS, 'body': json.dumps({'error': 'Robokassa credentials not configured'}), 'isBase64Encoded': False}

        body_str = event.get('body', '{}')
        payload = json.loads(body_str)

        amount = float(payload.get('amount', 0))
        user_name = str(payload.get('user_name', ''))
        user_email = str(payload.get('user_email', ''))
        user_phone = str(payload.get('user_phone', ''))
        user_address = str(payload.get('user_address', ''))
        order_comment = str(payload.get('order_comment', ''))
        cart_items = payload.get('cart_items', [])
        success_url = str(payload.get('success_url', ''))
        fail_url = str(payload.get('fail_url', ''))

        if amount <= 0:
            return {'statusCode': 400, 'headers': HEADERS, 'body': json.dumps({'error': 'Amount must be greater than 0'}), 'isBase64Encoded': False}
        if not user_name or not user_email:
            return {'statusCode': 400, 'headers': HEADERS, 'body': json.dumps({'error': 'user_name and user_email required'}), 'isBase64Encoded': False}

        conn = get_db_connection()
        cur = conn.cursor()

        # Генерация уникального InvoiceID
        for _ in range(10):
            robokassa_inv_id = random.randint(100000, 2147483647)
            cur.execute("SELECT COUNT(*) FROM orders WHERE robokassa_inv_id = %s", (robokassa_inv_id,))
            if cur.fetchone()[0] == 0:
                break

        order_number = f"ORD-{datetime.now().strftime('%Y%m%d')}-{robokassa_inv_id}"

        cur.execute("""
            INSERT INTO orders (order_number, user_name, user_email, user_phone, amount, robokassa_inv_id, status, delivery_address, order_comment)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (order_number, user_name, user_email, user_phone, round(amount, 2), robokassa_inv_id, 'pending', user_address, order_comment))

        order_id = cur.fetchone()[0]

        for item in cart_items:
            cur.execute("""
                INSERT INTO order_items (order_id, product_id, product_name, product_price, quantity)
                VALUES (%s, %s, %s, %s, %s)
            """, (order_id, item.get('id'), item.get('name'), item.get('price'), item.get('quantity')))

        # Формирование ссылки на оплату
        amount_str = f"{amount:.2f}"

        # Receipt: компактный JSON (raw) — для подписи; URL-кодированный — для URL
        receipt = build_receipt(cart_items, amount)
        receipt_json = json.dumps(receipt, ensure_ascii=False, separators=(',', ':'))
        receipt_encoded = quote(receipt_json, safe='')

        # Подпись по документации Robokassa с фискализацией:
        # MerchantLogin:OutSum:InvId:Receipt:Password#1
        # Receipt в подписи — URL-кодированный JSON (как в URL).
        signature = calculate_signature(
            merchant_login, amount_str, robokassa_inv_id,
            receipt_encoded, password_1
        )
        print(f"[Robokassa] sig_input: {merchant_login}:{amount_str}:{robokassa_inv_id}:{receipt_encoded}:***")
        print(f"[Robokassa] receipt_json: {receipt_json}")
        print(f"[Robokassa] signature: {signature}")

        query_params = {
            'MerchantLogin': merchant_login,
            'OutSum': amount_str,
            'InvId': robokassa_inv_id,
            'SignatureValue': signature,
            'Email': user_email,
            'Culture': 'ru',
            'Description': f'Заказ {order_number}',
        }

        # Receipt уже URL-закодирован — добавляем как есть, без повторного кодирования
        payment_url = f"{ROBOKASSA_URL}?{urlencode(query_params)}&Receipt={receipt_encoded}"

        cur.execute("UPDATE orders SET payment_url = %s WHERE id = %s", (payment_url, order_id))
        conn.commit()
        cur.close()
        conn.close()

        return {
            'statusCode': 200,
            'headers': HEADERS,
            'body': json.dumps({
                'payment_url': payment_url,
                'order_id': order_id,
                'order_number': order_number
            }),
            'isBase64Encoded': False
        }
    except Exception as e:
        import traceback
        print(f"Robokassa error: {e}")
        print(traceback.format_exc())
        return {
            'statusCode': 500,
            'headers': HEADERS,
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }