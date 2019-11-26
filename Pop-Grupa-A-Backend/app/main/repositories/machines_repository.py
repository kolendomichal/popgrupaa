from app.main import db
from app.main.model.Machine import Machine
from flask import jsonify

import json


def get_all_machines():
    return Machine.query.all()


def save_changes(data):
    db.session.add(data)
    db.session.commit()
