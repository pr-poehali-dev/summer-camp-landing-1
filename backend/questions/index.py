import json
import os
import psycopg2


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

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        'body': json.dumps({'ok': True, 'id': new_id}),
    }
