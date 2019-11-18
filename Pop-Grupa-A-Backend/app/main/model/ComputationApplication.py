from .. import db


class ComputationApplication(db.Model):
    __tablename__ = "ComputationApplication"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    description = db.Column(db.String(255), unique=False, nullable=False)
    name = db.Column(db.String(255), unique=False, nullable=False)
    icon = db.Column(db.Text, unique=False, nullable=False)

    def __repr__(self):
        return "<App '{}'>".format(self.id)
