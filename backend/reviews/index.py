import json
import os
import psycopg2
import psycopg2.extras


CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
}


def handler(event: dict, context) -> dict:
    '''
    Business: Публичные отзывы родителей. GET — список одобренных, POST — отправка нового на модерацию
    Args: event - dict с httpMethod, body (parent_name, child_name, rating, text)
          context - объект с request_id
    Returns: HTTP response с данными или статусом
    '''
    method: str = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    dsn = os.environ['DATABASE_URL']

    if method == 'GET':
        conn = psycopg2.connect(dsn)
        try:
            with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                cur.execute(
                    "SELECT id, parent_name, child_name, rating, text, created_at "
                    "FROM reviews WHERE status = 'approved' "
                    "ORDER BY is_pinned DESC, created_at DESC LIMIT 50"
                )
                rows = cur.fetchall()
        finally:
            conn.close()
        items = []
        for r in rows:
            items.append({
                'id': r['id'],
                'parent_name': r['parent_name'],
                'child_name': r['child_name'],
                'rating': r['rating'],
                'text': r['text'],
                'created_at': r['created_at'].isoformat() if r['created_at'] else None,
            })
        return {
            'statusCode': 200,
            'headers': {**CORS, 'Content-Type': 'application/json'},
            'body': json.dumps({'items': items}),
        }

    if method == 'POST':
        try:
            body_data = json.loads(event.get('body') or '{}')
        except json.JSONDecodeError:
            return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'Invalid JSON'})}

        parent_name = (body_data.get('parent_name') or '').strip()
        child_name = (body_data.get('child_name') or '').strip()
        text = (body_data.get('text') or '').strip()
        try:
            rating = int(body_data.get('rating') or 5)
        except (TypeError, ValueError):
            rating = 5
        rating = max(1, min(5, rating))

        if not parent_name or not text:
            return {
                'statusCode': 400,
                'headers': CORS,
                'body': json.dumps({'error': 'Заполните имя и текст отзыва'}),
            }

        def esc(s: str) -> str:
            return s.replace("'", "''")

        conn = psycopg2.connect(dsn)
        try:
            with conn.cursor() as cur:
                cur.execute(
                    f"INSERT INTO reviews (parent_name, child_name, rating, text, status) "
                    f"VALUES ('{esc(parent_name)}', '{esc(child_name)}', {rating}, '{esc(text)}', 'pending') "
                    f"RETURNING id"
                )
                new_id = cur.fetchone()[0]
            conn.commit()
        finally:
            conn.close()

        return {
            'statusCode': 200,
            'headers': {**CORS, 'Content-Type': 'application/json'},
            'body': json.dumps({'ok': True, 'id': new_id}),
        }

    return {'statusCode': 405, 'headers': CORS, 'body': json.dumps({'error': 'Method not allowed'})}