from app.main import db
from app.main.model.ComputationApplication import ComputationApplication


def get_all_applications():
    return ComputationApplication.query.all()

def get_app_by_id(app_id):
    return ComputationApplication.query.filter_by(id=app_id).first()


def save_changes(data):
    db.session.add(data)
    db.session.commit()
