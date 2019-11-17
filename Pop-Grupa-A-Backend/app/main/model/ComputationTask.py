from .. import db
from app.main.model.ComputationStatus import ComputationStatus
import datetime


class ComputationTask(db.Model):
    __tablename__ = "ComputationTask"

    computation_applications = db.relationship('ComputationApplication', backref='app', uselist=False)
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    status = db.Column(db.Enum(ComputationStatus), unique=False, nullable=False)
    start_date = db.Column(db.DateTime(), unique=False, nullable=True)
    app_id = db.Column(db.Integer, db.ForeignKey('ComputationApplication.id'), unique=False, nullable=False)
    end_date = db.Column(db.DateTime(), unique=False, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('ComputationAccount.id'), unique=False, nullable=False)

    def __repr__(self):
        return "<Task '{}'>".format(self.id)
