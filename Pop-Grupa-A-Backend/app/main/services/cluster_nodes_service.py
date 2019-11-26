import app.main.repositories.cluster_nodes_repository as nodes_repository
import app.main.repositories.machines_repository as machines_repository

from app.main.model.NodeStatus import NodeStatus
from app.main.model.ClusterNode import ClusterNode
from app.main.model.Machine import Machine

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

def create_node(createNodeDto):
    new_node = ClusterNode(
        is_private = createNodeDto.get('is_private', False),
        status = NodeStatus.CREATED
    )
    inserted_node = nodes_repository.save_and_return(new_node)
    machines_list = []
    for ip in createNodeDto.get('ip_list', []):
        if ip == '':
            return 'Cluster node could not be created. ' \
                    + 'Ip list element cannot be empty string', 400
        if machines_repository.get_machine_by_ip(ip):
            return 'Cluster node could not be created. ' \
                    + f'There already is a machine with ip address: {ip}', 400
        machines_list.append(Machine(
            ip_address = ip,
            cluster_node_id = inserted_node.id,
            cpus = '',
            gpus = ''
        ))
    if len(machines_list) > 0:
        machines_repository.save_machines_list(machines_list)
    return 'Succesfully created node and machines with given IPs', 201

def verify_machine(machine):
    threshold = 10000
    number = random.randrange(threshold)
    url = 'http://' + machine.ip_address + '/verify/' + str(number)
    response = urlopen(url).read()
    return bin(number) == bin(int(response,2))