from sqlalchemy.sql import text

from app.main import db
from app.main.model.ComputationTask import ComputationTask
from app.main.model.ComputationApplication import ComputationApplication


def get_tasks_for_user(user_id):
    # return db.session.query(ComputationTask.id.label('id'), ComputationTask.status.label('status'), 
    #     ComputationTask.start_date.label('start_date'), ComputationTask.end_date.label('end_date'), 
    #     ComputationApplication.name.label('app_name')) \
    #     .join(ComputationApplication, ComputationApplication.id == ComputationTask.app_id) \
    #     .filter(ComputationTask.user_id==user_id).all()ssssasd
    
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
