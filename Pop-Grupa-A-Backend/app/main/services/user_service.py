import uuid
from flask import session
from .. import flask_bcrypt
import datetime
from app.main.model.Session import Session
import app.main.repositories.user_repository as user_repository
from app.main.model.AccountRole import AccountRole
from app.main.model.ComputationAccount import ComputationAccount

def add_user(user):
    db_user = user_repository.get_user_by_email(user['email'])
    db_user2 = user_repository.get_user_by_username(user['username'])
    if db_user or db_user2:
        response_object = {
            'status': 'Fail',
            'message': 'User already exists. Please Log in.',
        }
        return response_object, 409

    if user.get('role') not in AccountRole._member_names_:
        response_object = {
            'status': 'Fail',
            'message': "Cannot register user with role = {user.get('role')}",
        }
        return response_object, 409

    new_user = ComputationAccount(username=user['username'],
                                  password=flask_bcrypt.generate_password_hash(user['password']).decode('utf-8'),
                                  created=datetime.datetime.now(),
                                  lastLogin=datetime.datetime.now(),
                                  email=user['email'],
                                  role=user['role'])
    user_repository.add_new_user(user)
    response_object = {
        'status': 'Success',
        'message': f'New account has been successfully created'
    }
    return response_object, 201

def check_user(user):
    db_user = user_repository.get_user_by_username(user['username'])
    if not db_user:
        response_object = {
            'status': 'Fail',
            'message': 'Incorrect login or password',
        }
        return response_object, 403
    if not flask_bcrypt.check_password_hash(db_user.password, user['password']):
        response_object = {
            'status': 'Fail',
            'message': 'Incorrect login or password',
        }
        return response_object, 403
    else:
        sid = str(uuid.uuid4())
        response_object = {
            'status': 'Success',
            'message': 'User successfully logged in',
            'user_id': db_user.id,
            'role': str(db_user.role),
            'username': db_user.username
        }
        session['sid'] = sid
        session['username'] = user['username']
        session['role'] = str(db_user.role)
        new_session = Session(
            sid=sid,
            exp=datetime.datetime.utcnow() + datetime.timedelta(minutes=5)
        )
        user_repository.add_new_session(new_session)
        return response_object, 200


def logout_user():
    try:
        sid = session['sid']
        user_repository.remove_session(sid)
        session.pop('role', None)
        session.pop('username', None)
        session.pop('sid', None)
    except:
        response_object = {
            'status': 'Fail',
            'message': 'User logout failure',
        }
        return response_object, 406
    response_object = {
        'status': 'Success',
        'message': 'User successfully logged out',
    }
    return response_object, 200

def get_role_of_current_user():
    return session.get('role')