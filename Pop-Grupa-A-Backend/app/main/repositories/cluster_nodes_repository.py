from app.main import db
from app.main.model.ClusterNode import ClusterNode
from app.main.model.NodeStatus import NodeStatus


def get_all_cluster_nodes():
    return ClusterNode.query.order_by(ClusterNode.id).all()

def get_node_for_id(node_id):
    return ClusterNode.query.filter_by(id=node_id).first()


def create_node_and_return(new_node):
    db.session.add(new_node)
    db.session.flush()
    return new_node

def remove_cluster_node(node_id):
    db.session.query(ClusterNode).filter(ClusterNode.id == node_id).delete()
    db.session.commit()

def commit_changes():
    db.session.commit()

def save_changes(data):
    db.session.add(data)
    db.session.commit()
    
def get_cluster_nodes_for_user(userId):
    return ClusterNode.query.filter_by(user_id=userId).order_by(ClusterNode.id).all()

def change_state_to_submitted(node):
    node.status = NodeStatus.SUBMITTED
    save_changes(node)
