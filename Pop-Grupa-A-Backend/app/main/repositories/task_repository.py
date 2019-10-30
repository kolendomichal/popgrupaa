from app.main import db
from app.main.model.ComputationTask import ComputationTask
from app.main.model.ComputationStatus import ComputationStatus
from datetime import datetime
from app.main.model.ComputationAccount import ComputationAccount
from app.main.model.ComputationApplication import ComputationApplication


def get_tasks_for_user(userId):
    return ComputationTask.query.filter_by(user_id=userId).all()


def get_task_for_task_id(task_id):
    return ComputationTask.query.filter_by(task_id=task_id).all()


def change_status_for_task(task, status):
    task['status']=status 
    return task


def get_status(task_id):
    return ComputationTask.query.filter_by(task_id=task_id).all()['status']

    
def save_changes(data):
    db.session.add(data)
    db.session.commit()
