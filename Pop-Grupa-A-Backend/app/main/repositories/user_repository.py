from app.main import db
from app.main.model.ComputationAccount import ComputationAccount


def add_user(user):
    db_user = ComputationAccount.query.filter_by(email=user.email).first()
    if not db_user:
        save_changes(user)
        return ComputationAccount.query.filter_by(email=user.email).first()
    else:
        raise ValueError('User with that email exists.')

def get_user(userId):
    return ComputationAccount.query.filter_by(id=userId).first()


def save_changes(data):
    db.session.add(data)
    db.session.commit()
