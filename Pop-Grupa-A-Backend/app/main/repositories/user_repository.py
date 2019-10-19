import datetime

from app.main import db
from app.main.model.ComputationAccount import ComputationAccount


def add_user(user):
    db_user = ComputationAccount.query.filter_by(email=user['email']).first()
    if not db_user:
        new_user = ComputationAccount(username=user['username'],
                                      password=user['password'],
                                      created=datetime.datetime.now(),
                                      lastLogin=datetime.datetime.now(),
                                      email=user['email'])
        save_changes(new_user)
        response_object = {
            'status': 'success',
            'message': 'User successfuly created.'
        }
        return response_object, 201
    else:
        response_object = {
            'status': 'fail',
            'message': 'User already exists. Please Log in.',
        }
        return response_object, 409


def get_user(userId):
    return ComputationAccount.query.filter_by(id=userId).first()


def save_changes(data):
    db.session.add(data)
    db.session.commit()
