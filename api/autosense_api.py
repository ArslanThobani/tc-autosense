from flask import Flask, request
import psycopg2
import psycopg2.extras
import os

app = Flask(__name__)

SELECT_TOPICS = "select distinct topic from forumposts"
SELECT_DATA_FOR_TOPICS = "select postid, model, postdate, brand, topic from forumposts where topic=%s"

def db_connect():
    connection = psycopg2.connect(
        host="autosense-1.ciqghxikd2ck.us-east-1.rds.amazonaws.com",
        database="postgres",
        user=os.getenv('DB_USERNAME'),
        password=os.getenv('DB_PASSWORD')
    )

    return connection


@app.route('/api/get-topics')
def get_topics():
    connection = db_connect()
    cursor = connection.cursor()

    cursor.execute(SELECT_TOPICS)
    topics = cursor.fetchall()

    topics = [x[0] for x in topics]
    try:
        topics.remove('no match')
    except:
        pass

    return {
        'topics': topics
    }


@app.route('/api/get-data')
def get_data_for_topic():
    topic = request.args.get('topic')

    connection = db_connect()
    cursor = connection.cursor(cursor_factory = psycopg2.extras.RealDictCursor)

    cursor.execute(SELECT_DATA_FOR_TOPICS, (topic,))
    data = cursor.fetchall()


    return {
        'data': data
    }

