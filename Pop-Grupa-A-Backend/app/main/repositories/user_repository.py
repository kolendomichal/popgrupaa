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


def get_user(userId):
    return ComputationAccount.query.filter_by(id=userId).first()
