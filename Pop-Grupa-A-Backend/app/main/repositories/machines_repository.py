from app.main import db
from app.main.model.Machine import Machine


def get_all_machines():
    return Machine.query.all()

def get_all_machines_for_cluster_node(cluster_node_id):
    return Machine.query.filter_by(id=cluster_node_id).all()

def save_changes(data):
    db.session.add(data)
    db.session.commit()
