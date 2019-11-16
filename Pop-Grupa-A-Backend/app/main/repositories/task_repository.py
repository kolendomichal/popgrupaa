from app.main import db
from app.main.model.ComputationTask import ComputationTask
from app.main.model.ComputationStatus import ComputationStatus
from app.main.model.ComputationAccount import ComputationAccount
from app.main.model.ComputationApplication import ComputationApplication


def get_tasks_for_user(userId):
    return ComputationTask.query.filter_by(user_id=userId).order_by(ComputationTask.id).all()

def get_task_for_task_id(id=id):
    return ComputationTask.query.filter_by(id=id).first()

def get_status(task_id):
    return ComputationTask.query.filter_by(task_id=task_id).first()['status']



def save_changes(data):
    db.session.add(data)
    db.session.commit()
