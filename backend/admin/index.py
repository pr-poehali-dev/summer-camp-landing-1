import json
import os
import hmac
import hashlib
import psycopg2
import psycopg2.extras


CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
    'Access-Control-Max-Age': '86400',
}


def make_token(password: str) -> str:
    return hashlib.sha256(f'rybka-dolly::{password}'.encode('utf-8')).hexdigest()


def check_token(event: dict) -> bool:
    pwd = os.environ.get('ADMIN_PASSWORD', '')
    if not pwd:
        return False
    expected = make_token(pwd)
    headers = event.get('headers') or {}
    token = headers.get('X-Admin-Token') or headers.get('x-admin-token') or ''
    if not token:
        return False
    return hmac.compare_digest(token, expected)


def json_resp(status: int, data: dict) -> dict:
    return {
        'statusCode': status,
        'headers': {**CORS, 'Content-Type': 'application/json'},
        'body': json.dumps(data, default=str),
    }


def handler(event: dict, context) -> dict:
    '''
    Business: Админка — авторизация по паролю, модерация отзывов, просмотр заявок вожатых
    Args: event - dict с httpMethod, queryStringParameters (action), body
          context - объект с request_id
    Returns: HTTP response с данными или статусом
    '''
    method: str = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    qs = event.get('queryStringParameters') or {}
    action = qs.get('action') or ''

    # Логин: проверяем пароль и возвращаем токен
    if method == 'POST' and action == 'login':
        try:
            body = json.loads(event.get('body') or '{}')
        except json.JSONDecodeError:
            return json_resp(400, {'error': 'Invalid JSON'})
        password = (body.get('password') or '').strip()
        admin_pwd = os.environ.get('ADMIN_PASSWORD', '')
        if not admin_pwd:
            return json_resp(500, {'error': 'ADMIN_PASSWORD не задан'})
        if not password or not hmac.compare_digest(password, admin_pwd):
            return json_resp(401, {'error': 'Неверный пароль'})
        return json_resp(200, {'ok': True, 'token': make_token(admin_pwd)})

    # GET ?action=shift_spots — публичное чтение (для сайта), без токена
    if method == 'GET' and action == 'shift_spots':
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        try:
            with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                cur.execute(
                    "CREATE TABLE IF NOT EXISTS shift_spots ("
                    "shift_id INTEGER PRIMARY KEY, "
                    "count INTEGER NOT NULL DEFAULT 0, "
                    "updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
                )
                cur.execute(
                    "INSERT INTO shift_spots (shift_id, count) VALUES "
                    "(3,5),(5,3),(6,5),(7,7) "
                    "ON CONFLICT (shift_id) DO NOTHING"
                )
                conn.commit()
                cur.execute(
                    "SELECT shift_id, count FROM shift_spots ORDER BY shift_id"
                )
                rows = cur.fetchall()
        finally:
            conn.close()
        spots = {str(r['shift_id']): r['count'] for r in rows}
        return json_resp(200, {'spots': spots})

    # Все остальные действия требуют токен
    if not check_token(event):
        return json_resp(401, {'error': 'Не авторизован'})

    dsn = os.environ['DATABASE_URL']

    # PUT ?action=shift_spots — body: {shift_id, count} (только админ)
    if method == 'PUT' and action == 'shift_spots':
        try:
            body = json.loads(event.get('body') or '{}')
        except json.JSONDecodeError:
            return json_resp(400, {'error': 'Invalid JSON'})
        try:
            shift_id = int(body.get('shift_id'))
            count = int(body.get('count'))
        except (TypeError, ValueError):
            return json_resp(400, {'error': 'Неверные данные'})
        if count < 0:
            count = 0
        conn = psycopg2.connect(dsn)
        try:
            with conn.cursor() as cur:
                cur.execute(
                    f"INSERT INTO shift_spots (shift_id, count, updated_at) "
                    f"VALUES ({shift_id}, {count}, CURRENT_TIMESTAMP) "
                    f"ON CONFLICT (shift_id) DO UPDATE SET "
                    f"count = {count}, updated_at = CURRENT_TIMESTAMP"
                )
            conn.commit()
        finally:
            conn.close()
        return json_resp(200, {'ok': True})

    # GET ?action=reviews&status=pending|approved|rejected|all
    if method == 'GET' and action == 'reviews':
        status_filter = qs.get('status') or 'all'
        where = ''
        if status_filter in ('pending', 'approved', 'rejected'):
            where = f"WHERE status = '{status_filter}'"
        conn = psycopg2.connect(dsn)
        try:
            with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                cur.execute(
                    f"SELECT id, parent_name, child_name, rating, text, status, created_at "
                    f"FROM reviews {where} ORDER BY created_at DESC LIMIT 200"
                )
                rows = cur.fetchall()
        finally:
            conn.close()
        return json_resp(200, {'items': [dict(r) for r in rows]})

    # PUT ?action=review_status — body: {id, status}
    if method == 'PUT' and action == 'review_status':
        try:
            body = json.loads(event.get('body') or '{}')
        except json.JSONDecodeError:
            return json_resp(400, {'error': 'Invalid JSON'})
        try:
            review_id = int(body.get('id'))
        except (TypeError, ValueError):
            return json_resp(400, {'error': 'Неверный id'})
        new_status = (body.get('status') or '').strip()
        if new_status not in ('pending', 'approved', 'rejected'):
            return json_resp(400, {'error': 'Неверный статус'})
        conn = psycopg2.connect(dsn)
        try:
            with conn.cursor() as cur:
                cur.execute(
                    f"UPDATE reviews SET status = '{new_status}' WHERE id = {review_id}"
                )
            conn.commit()
        finally:
            conn.close()
        return json_resp(200, {'ok': True})

    # DELETE ?action=review&id=N
    if method == 'DELETE' and action == 'review':
        try:
            review_id = int(qs.get('id'))
        except (TypeError, ValueError):
            return json_resp(400, {'error': 'Неверный id'})
        conn = psycopg2.connect(dsn)
        try:
            with conn.cursor() as cur:
                cur.execute(f"DELETE FROM reviews WHERE id = {review_id}")
            conn.commit()
        finally:
            conn.close()
        return json_resp(200, {'ok': True})

    # GET ?action=applications
    if method == 'GET' and action == 'applications':
        conn = psycopg2.connect(dsn)
        try:
            with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                cur.execute(
                    "SELECT id, full_name, age, phone, email, about, experience, created_at "
                    "FROM counselor_applications ORDER BY created_at DESC LIMIT 200"
                )
                rows = cur.fetchall()
        finally:
            conn.close()
        return json_resp(200, {'items': [dict(r) for r in rows]})

    # DELETE ?action=application&id=N
    if method == 'DELETE' and action == 'application':
        try:
            app_id = int(qs.get('id'))
        except (TypeError, ValueError):
            return json_resp(400, {'error': 'Неверный id'})
        conn = psycopg2.connect(dsn)
        try:
            with conn.cursor() as cur:
                cur.execute(f"DELETE FROM counselor_applications WHERE id = {app_id}")
            conn.commit()
        finally:
            conn.close()
        return json_resp(200, {'ok': True})

    # GET ?action=stats
    if method == 'GET' and action == 'stats':
        conn = psycopg2.connect(dsn)
        try:
            with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                cur.execute(
                    "SELECT "
                    "(SELECT COUNT(*) FROM reviews WHERE status = 'pending') AS pending_reviews, "
                    "(SELECT COUNT(*) FROM reviews WHERE status = 'approved') AS approved_reviews, "
                    "(SELECT COUNT(*) FROM counselor_applications) AS applications"
                )
                row = cur.fetchone()
        finally:
            conn.close()
        return json_resp(200, dict(row))

    return json_resp(404, {'error': 'Unknown action'})