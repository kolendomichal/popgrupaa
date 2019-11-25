import datetime
import jwt
import uuid

from app.main import db
from app.main.model.ComputationAccount import ComputationAccount
from app.main.model.Session import Session
from flask import Flask, session
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

        sid = str(uuid.uuid4())
        session['sid'] = sid
        session['username'] = user['username']
        new_session = Session(
            sid=sid,
            exp=datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        )
        save_changes(new_session)
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
        }
        session['sid'] = sid
        session['username'] = user['username']
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


def check_session():
    try:
        sid = session['sid']
        db_session = Session.query.filter_by(sid=sid).first()
        if not db_session:
            return False
        else:
            if db_session.exp > datetime.datetime.utcnow():
                return True
    except:
        return False
    return False


def get_user(userId):
    return ComputationAccount.query.filter_by(id=userId).first()


def save_changes(data):
    db.session.add(data)
    db.session.commit()
