import datetime
import jwt
import uuid

from app.main import db
from app.main.model.ComputationAccount import ComputationAccount
from app.main.model.Session import Session
from flask import session
from .. import flask_bcrypt
from app.main.config import key


def add_user(user):
    db_user = ComputationAccount.query.filter_by(email=user['email']).first()
    db_user2 = ComputationAccount.query.filter_by(username=user['username']).first()
    if not db_user and not db_user2:
        new_user = ComputationAccount(username=user['username'],
                                      password=flask_bcrypt.generate_password_hash(user['password']).decode('utf-8'),
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

def check_user(user):
    db_user = ComputationAccount.query.filter_by(username=user['username']).first()
    if not db_user:
        response_object = {
            'status': 'fail',
            'messege': 'User login failure',
        }
        return  response_object, 403
    if not flask_bcrypt.check_password_hash(db_user.password, user['password']):
        response_object = {
            'status': 'fail',
            'messege': 'User login failure',
        }
        return response_object, 403
    else:
        sid = str(uuid.uuid4())
        token_elems = {
            'username': user['username'],
            'id': db_user.id,
            'sid': sid,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }
        response_object = {
            'status': 'success',
            'messege': 'User successfully logged',
        }
        session['sid'] = sid
        session['token'] = jwt.encode(token_elems, key)
        new_session = Session(
            sid=sid,
            id=db_user.id,
            exp=token_elems['exp']
        )
        save_changes(new_session) # fixme
        return response_object, 200


def get_user(userId):
    return ComputationAccount.query.filter_by(id=userId).first()


def save_changes(data):
    db.session.add(data)
    db.session.commit()
