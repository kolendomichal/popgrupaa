from .. import db
import datetime


class ComputationTask(db.Model):
    __tablename__ = "ComputationTask"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    status = db.Column(db.Integer, unique=False, nullable=False)
    start_date = db.Column(db.DateTime(), unique=False, nullable=True)
    app_id = db.Column(db.Integer, unique=False, nullable=False)
    end_date = db.Column(db.DateTime(), unique=False, nullable=True)
    user_id = db.Column(db.Integer, unique=False, nullable=False)

    def __repr__(self):
        return "<Task '{}'>".format(self.id)
