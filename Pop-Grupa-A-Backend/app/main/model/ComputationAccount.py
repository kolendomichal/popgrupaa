from .. import db, flask_bcrypt


class ComputationAccount(db.Model):
    __tablename__ = "ComputationAccount"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    created = db.Column(db.DateTime, nullable=False)
    lastLogin = db.Column(db.DateTime, nullable=False)
    username = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(100))

    #@property
    #def password(self):
    #    raise AttributeError('password: write-only field')

    #@password.setter
    #def password(self, password):
    #    self.password_hash = flask_bcrypt.generate_password_hash(password).decode('utf-8')

    #def check_password(self, password):
    #    return flask_bcrypt.check_password_hash(self.password_hash, password)

    def __repr__(self):
        return "<User '{}'>".format(self.username)
