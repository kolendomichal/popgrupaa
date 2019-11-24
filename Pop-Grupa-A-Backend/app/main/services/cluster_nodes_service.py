import app.main.repositories.cluster_nodes_repository as nodes_repository
from app.main.model.NodeStatus import NodeStatus
import random
from urllib.request import urlopen

def get_nodes_for_user(userId):
    #TODO below is to be fixed 
    return nodes_repository.get_all_cluster_nodes()

def submit_node(node_id):
    node = nodes_repository.get_node_for_id(node_id)
    if not node:
        return {
                   'status': 'fail',
                   'message': f"Node with id = {node_id} does not exist",
               }, 400

    if node.status is NodeStatus.SUBMITTED:
        return {
                   'status': 'fail',
                   'message': f"Node is already submitted.",
               }, 400

    for machine in node.machines:
        if not verify_machine(machine):
            return {
                       'status': 'fail',
                       'message': f"Couldn't verify machine with IP = {machine.ip_address}",
                   }, 400

    node.status = NodeStatus.SUBMITTED
    nodes_repository.save_changes(node)
    return {
               'status': 'success',
               'message': 'Cluster node successfuly submitted.'
           }, 201

def verify_machine(machine):
    threshold = 10000
    number = random.randrange(threshold)
    url = 'http://' + machine.ip_address + '/verify/' + str(number)
    response = urlopen(url).read()
    return bin(number) == bin(int(response,2))