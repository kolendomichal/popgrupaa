from .. import db, flask_bcrypt
from app.main.model.AccountRole import AccountRole

class ComputationAccount(db.Model):
    __tablename__ = "ComputationAccount"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    created = db.Column(db.DateTime, nullable=False)
    lastLogin = db.Column(db.DateTime, nullable=False)
    username = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(100))
    role = db.Column(db.Enum(AccountRole), unique=False, nullable=False)

    def __repr__(self):
        return "<User '{}'>".format(self.username)
