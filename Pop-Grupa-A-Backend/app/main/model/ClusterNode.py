from .. import db
from app.main.model.NodeStatus import NodeStatus

class ClusterNode(db.Model):
    __tablename__ = "ClusterNodes"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    status = db.Column(db.Enum(NodeStatus), unique=False, nullable=False)
    is_private = db.Column(db.Boolean, nullable=False)
    user_id = db.Column(db.Integer, unique=False, nullable=False)
