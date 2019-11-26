from app.main import db
from app.main.model.Machine import Machine


def get_cluster_node_machine_list(cluster_node_id):
    machine_list = Machine.query.filter_by(cluster_node_id=int(cluster_node_id)).all()
    list = []
    for row in machine_list:
        list.append({"id": row.id,
                     "cluster_node_id": row.cluster_node_id,
                     "cpus": row.cpus,
                     "gpus": row.gpus,
                     "ip_address": row.ip_address
                     })
    return list, 200


def save_changes(data):
    db.session.add(data)
    db.session.commit()
