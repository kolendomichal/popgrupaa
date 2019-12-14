from app.main import db
from app.main.model.Machine import Machine

def create_new_machines_list(createNodeDto, newClusterId):
    machines_list = []
    for ip in createNodeDto.get('ip_list', []):
        if ip == '' or ' ' in ip:
            raise Exception('\nCluster node could not be created.\n ' \
                             + 'Ip list element cannot be empty string or contain a white space')
        if get_machine_by_ip(ip):
            raise Exception('\nCluster node could not be created.\n' \
                            + f'There already is a machine with ip address: {ip}')

        machines_list.append(Machine(
            ip_address = ip,
            cluster_node_id = newClusterId,
            cpus = '',
            gpus = ''
        )) 
    if len(machines_list) > 0:
        save_machines_list(machines_list)
        return True
    else:
        return False       

def get_all_machines():
    return Machine.query.all()

def get_machines_for_cluster_node(cluster_node_id):
    return Machine.query.filter_by(cluster_node_id=cluster_node_id).order_by(Machine.id).all()

def get_machine_by_id(id):
    return Machine.query.filter_by(id=id).first()

def get_machine_by_ip(ip):
    return Machine.query.filter_by(ip_address=ip).first()

def remove_machine_by_id(machine_id):
    db.session.query(Machine).filter(Machine.id == machine_id).delete()
    db.session.commit()

def remove_machines_by_node_id(node_id):
    db.session.query(Machine).filter(Machine.cluster_node_id == node_id).delete()
    db.session.commit()

def save_machines_list(machines_list):
    db.session.bulk_save_objects(machines_list)
    db.session.commit()

def save_changes(data):
    db.session.add(data)
    db.session.commit()
