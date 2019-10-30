from app.main import db
from app.main.model.ComputationTask import ComputationTask


def get_tasks_for_user(userId):
    return ComputationTask.query.filter_by(user_id=userId).all()


def save_changes(data):
    db.session.add(data)
    db.session.commit()
