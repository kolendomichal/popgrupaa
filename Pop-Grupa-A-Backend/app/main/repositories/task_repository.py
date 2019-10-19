from app.main import db
from app.main.model.ComputationAccount import ComputationAccount


def add_task(task):
    save_changes(task)
    return task


def get_tasks_for_user(userId):
    return ComputationTask.query.filter_by(User_id=userId).all()


def save_changes(data):
    db.session.add(data)
    db.session.commit()
