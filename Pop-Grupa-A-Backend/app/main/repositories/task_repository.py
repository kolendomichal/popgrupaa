from app.main import db
from app.main.model import ComputationTask
from app.main.model.ComputationTask import ComputationTask
from datetime import date


def add_task(task):
    new_task = ComputationTask(
        status = task['status'],
        user_id = task['user_id']
    )
    save_changes(new_task)
    response_object = {
        'status': 'success',
        'message': 'Task successfuly created.'
    }
    return response_object, 201


def get_tasks_for_user(userId):
    return ComputationTask.query.filter_by(User_id=userId).all()


def save_changes(data):
    db.session.add(data)
    db.session.commit()
