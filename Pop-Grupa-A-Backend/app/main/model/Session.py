from .. import db
import datetime


class Session(db.Model):
    __tablename__ = "Session"
    sid = db.Column(db.String(100), unique=True, nullable=False)
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    exp = db.Column(db.DateTime, unique=False, nullable=True)