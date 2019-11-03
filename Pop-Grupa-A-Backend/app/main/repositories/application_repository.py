from app.main import db
from app.main.model.ComputationApplication import ComputationApplication


def get_all_applications():
    return ComputationApplication.query.all()


def save_changes(data):
    db.session.add(data)
    db.session.commit()
