from app.main import db
from app.main.model.ClusterNode import ClusterNode

def get_all_cluster_nodes():
    return ClusterNode.query.order_by(ClusterNode.id).all()

def get_node_for_id(node_id):
    return ClusterNode.query.filter_by(id=node_id).first()

def save_changes(data):
    db.session.add(data)
    db.session.commit()
