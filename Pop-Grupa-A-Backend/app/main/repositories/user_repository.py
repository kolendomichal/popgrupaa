import datetime
import jwt
import uuid

from app.main import db
from app.main.model.ComputationAccount import ComputationAccount
from app.main.model.Session import Session
from flask import Flask, session
from .. import flask_bcrypt
from app.main.config import key


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


def add_new_user(user):
    new_user = ComputationAccount(username=user['username'],
                                  password=flask_bcrypt.generate_password_hash(user['password']).decode('utf-8'),
                                  created=datetime.datetime.now(),
                                  lastLogin=datetime.datetime.now(),
                                  email=user['email'],
                                  role=user['role'])
    save_changes(new_user)

def add_new_session(sid):
    new_session = Session(
            sid=sid,
            exp=datetime.datetime.utcnow() + datetime.timedelta(minutes=5)
    )
    save_changes(new_session)

def remove_session(sid):
    Session.query.filter_by(sid=sid).delete()

def get_user(userId):
    return ComputationAccount.query.filter_by(id=userId).first()

def get_user_by_username(username):
    return ComputationAccount.query.filter_by(username=username).first()

def get_user_by_email(email):
    return ComputationAccount.query.filter_by(email=email).first()

def save_changes(data):
    db.session.add(data)
    db.session.commit()

