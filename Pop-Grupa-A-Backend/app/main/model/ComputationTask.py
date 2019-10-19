from .. import db


class ComputationTask(db.Model):
    __tablename__ = "ComputationTask"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    status = db.Column(db.Integer, unique=False, nullable=False)
    start_time = db.Column(db.Date, unique=False, nullable=False)
    end_time = db.Column(db.Date, unique=False, nullable=False)
    user_id = db.Column(db.Integer, unique=False, nullable=False)

    def __repr__(self):
        return "<Task '{}'>".format(self.id)
