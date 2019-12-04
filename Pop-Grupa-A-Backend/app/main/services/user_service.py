import datetime
import uuid

from app.main import db
from app.main.model.ComputationAccount import ComputationAccount
from app.main.model.Session import Session
from app.main.model.AccountRole import AccountRole
from flask import session
from .. import flask_bcrypt


def add_user(user):
    db_user = ComputationAccount.query.filter_by(email=user['email']).first()
    db_user2 = ComputationAccount.query.filter_by(username=user['username']).first()
    if db_user or db_user2:
        response_object = {
            'status': 'fail',
            'message': 'User already exists. Please Log in.',
        }
        return response_object, 409

    if user.get('role') not in AccountRole._member_names_:
        response_object = {
            'status': 'fail',
            'message': f"Cannot register user with role = {user.get('role')}",
        }
        return response_object, 409

    new_user = ComputationAccount(username=user['username'],
                                  password=flask_bcrypt.generate_password_hash(user['password']).decode('utf-8'),
                                  created=datetime.datetime.now(),
                                  lastLogin=datetime.datetime.now(),
                                  email=user['email'],
                                  role=user['role'])
    save_changes(new_user)
    response_object = {
        'status': 'success',
        'message': 'User successfuly created.'
    }
    return response_object, 201

def check_user(user):
    db_user = ComputationAccount.query.filter_by(username=user['username']).first()
    if not db_user:
        response_object = {
            'status': 'fail',
            'messege': 'User login failure',
        }
        return response_object, 403
    if not flask_bcrypt.check_password_hash(db_user.password, user['password']):
        response_object = {
            'status': 'fail',
            'messege': 'User login failure',
        }
        return response_object, 403
    else:
        sid = str(uuid.uuid4())
        response_object = {
            'status': 'success',
            'messege': 'User successfully logged',
            'user_id': db_user.id
        }
        session['sid'] = sid
        session['username'] = user['username']
        session['role'] = user['role']
        new_session = Session(
            sid=sid,
            exp=datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        )
        save_changes(new_session)
        return response_object, 200


def logout_user():
    try:
        sid = session['sid']
        Session.query.filter_by(sid=sid).delete()

        session.pop('username', None)
        session.pop('sid', None)
    except:
        response_object = {
            'status': 'fail',
            'messege': 'User logout failure',
        }
        return response_object, 406
    response_object = {
        'status': 'success',
        'messege': 'User successfully logout',
    }
    return response_object, 200

def get_role_of_current_user():
    return session.get('role')

def save_changes(data):
    db.session.add(data)
    db.session.commit()

