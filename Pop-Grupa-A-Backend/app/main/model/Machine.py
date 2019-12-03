from .. import db


class Machine(db.Model):
    __tablename__ = "Machines"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    cluster_node_id = db.Column(db.Integer, db.ForeignKey('ClusterNodes.id'), unique=False, nullable=False)
    cpus = db.Column(db.String(255), unique=False, nullable=False)
    gpus = db.Column(db.String(255), unique=False, nullable=False)
    ip_address = db.Column(db.String(15), unique=False, nullable=False)
