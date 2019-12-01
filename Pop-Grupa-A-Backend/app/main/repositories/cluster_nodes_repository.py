from app.main import db
from app.main.model.ClusterNode import ClusterNode

def get_all_cluster_nodes():
    return ClusterNode.query.all()

def save_changes(data):
    db.session.add(data)
    db.session.commit()
    
def get_cluster_nodes_for_user(userId):
    return ClusterNode.query.filter_by(user_id=userId).order_by(ClusterNode.id).all()
