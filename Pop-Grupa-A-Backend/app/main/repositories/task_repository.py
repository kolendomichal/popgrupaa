from app.main import db
from app.main.model.ComputationTask import ComputationTask
from app.main.model.ComputationStatus import ComputationStatus
from app.main.model.ComputationAccount import ComputationAccount
from app.main.model.ComputationApplication import ComputationApplication


def get_tasks_for_user(userId):
    return ComputationTask.query.filter_by(user_id=userId).all()
    
def get_task_for_task_id(id=id):
    return ComputationTask.query.filter_by(id=id).first()

def update_task(task_id, status):
    task = get_task_for_task_id(id=task_id)
    db_user = ComputationAccount.query.filter_by(id=task.user_id).first()
    db_app = ComputationApplication.query.filter_by(id=task.app_id).first()

    if db_user and db_app:
        task.status = status
        updated_task = task

    try:
        save_changes(updated_task)
        return task, 200
    except:
        response_object = {
            'status': 'failure',
            'message': 'Coundn\'t update task'
        }
        return response_object, 400


def change_status_for_task(task_id, status):
    task = get_task_for_task_id(id=task_id).id
    task.status = status
    #save_changes(task)
    return task

def save_changes(data):
    db.session.add(data)
    db.session.commit()
