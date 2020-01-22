import app.main.repositories.machines_repository as machine_repository


def get_all_machines_list():
    return machine_repository.get_all_machines()

def get_cluster_node_machine_list(cluster_node_id):
    machine_list = machine_repository.get_machines_for_cluster_node(cluster_node_id)
    if not machine_list:
        return {
                'status': 'Fail',
                'message': 'Cluster node with id = {cluster_node_id} has no machines assigned'
                }, 204

    return machine_list, 200


def remove_machine_by_id(machine_id):
    if not machine_repository.get_machine_by_id(machine_id):
        return {
                   'status': 'Fail',
                   'message': f"Machine with id = {machine_id} does not exist",
               }, 400
    machine_repository.remove_machine_by_id(machine_id)
    return { 
        'status': 'Success',
        'message': f'Succesfully deleted machine with id = {machine_id}'
        }, 201
      
