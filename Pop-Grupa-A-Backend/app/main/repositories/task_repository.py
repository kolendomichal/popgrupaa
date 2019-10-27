from app.main import db
from app.main.model import ComputationTask
from app.main.model.ComputationTask import ComputationTask
from app.main.model.ComputationStatus import ComputationStatus
from app.main.model.ComputationAccount import ComputationAccount
from app.main.model.ComputationApplication import ComputationApplication


def add_task(task):
    db_user = ComputationAccount.query.filter_by(id=task['user_id']).first()
    db_app = ComputationApplication.query.filter_by(id=task['app_id']).first()

    if db_user and db_app:
        new_task = ComputationTask(
            status = ComputationStatus.SUBMITTED.value,
            user_id = task['user_id'],
            app_id = task['app_id']
        )
        save_changes(new_task)
        response_object = {
            'status': 'success',
            'message': 'Task successfuly created.'
        }
        return response_object, 201

    if not db_user:
        response_object = {
            'status': 'fail',
            'message': f"User with id = {task['user_id']} does not exist",
        }
        return response_object, 400

    response_object = {
        'status': 'fail',
        'message': f"App with id = {task['app_id']} does not exist",
    }
    return response_object, 400


def get_tasks_for_user(userId):
    return ComputationTask.query.filter_by(user_id=userId).all()


def save_changes(data):
    db.session.add(data)
    db.session.commit()
