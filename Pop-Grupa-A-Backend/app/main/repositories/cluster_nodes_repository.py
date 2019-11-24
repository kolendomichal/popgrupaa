from app.main import db
from app.main.model.ClusterNode import ClusterNode

def get_all_cluster_nodes():
    return ClusterNode.query.all()

def save_changes(data):
    db.session.add(data)
    db.session.commit()
