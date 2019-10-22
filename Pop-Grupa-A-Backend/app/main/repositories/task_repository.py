from app.main import db
from app.main.model import ComputationTask
from app.main.model.ComputationTask import ComputationTask
from app.main.model.ComputationStatus import ComputationStatus
from datetime import date
from datetime import datetime


def add_task(task):
    new_task = ComputationTask(
        status = task['status'],
        start_date= datetime.now(),
        end_date= datetime.now(),
        user_id = task['user_id'],
        app_id = task['app_id']
    )
    save_changes(new_task)
    response_object = {
        'status': 'success',
        'message': 'Task successfuly created.'
    }
    return response_object, 201


def get_tasks_for_user(userId):
    return ComputationTask.query.filter_by(user_id=userId).all()


def activate_task(task_id):
    try:
        task = ComputationTask.query.filter_by(task_id=task_id).all()
    except:
        response_object = {
            'status': 'failure',
            'message': 'Coundn\'t get task'
        }
        return 400
    task['status'] = ComputationStatus.WORKING
    print(task)
    save_changes(task)
    response_object = {
        'status': 'success',
        'message': 'Task successfuly activated.'
    }
    return response_object, 200

def save_changes(data):
    print(data)
    db.session.add(data)
    db.session.commit()
