from sqlalchemy.sql import text

from app.main import db
from app.main.model.ComputationTask import ComputationTask


def get_tasks_for_user(user_id):
    sql = text('SELECT task.id AS id, task.status AS status, \
                task.start_date AS start_date, task.end_date AS end_date, \
                app.name AS app_name \
                FROM "ComputationTask" AS task, "ComputationApplication" AS app \
                WHERE task.app_id = app.id AND task.user_id = :user_id')
    return db.engine.execute(sql, user_id=user_id).fetchall()


def update_task(task):
    try:
        save_changes(task)
        return task, 200
    except:
        response_object = {
            'status': 'failure',
            'message': 'Coundn\'t update task'
        }
        return response_object, 400
    

def save_changes(data):
    db.session.add(data)
    db.session.commit()
