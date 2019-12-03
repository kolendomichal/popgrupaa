from app.main import db
from app.main.model.ClusterNode import ClusterNode

def get_all_cluster_nodes():
    return ClusterNode.query.all()

def get_node_for_id(node_id):
    return ClusterNode.query.filter_by(id=node_id).first()

def save_and_return(data):
    db.session.add(data)
    db.session.flush()
    return data

def commit_changes():
    db.session.commit()

def save_changes(data):
    db.session.add(data)
    db.session.commit()
    
def get_cluster_nodes_for_user(userId):
    return ClusterNode.query.filter_by(user_id=userId).order_by(ClusterNode.id).all()
