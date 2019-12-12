import app.main.repositories.cluster_nodes_repository as nodes_repository
import app.main.repositories.machines_repository as machines_repository

from app.main.model.NodeStatus import NodeStatus
from app.main.model.ClusterNode import ClusterNode
from app.main.model.Machine import Machine

import random
from urllib.request import urlopen
import json


def get_nodes_for_user(userId):
    return nodes_repository.get_cluster_nodes_for_user(userId)

def submit_node(node_id):
    node = nodes_repository.get_node_for_id(node_id)
    if not node:
        return {
                   'status': 'Fail',
                   'message': f"Node with id = {node_id} does not exist",
               }, 400

    if node.status is NodeStatus.SUBMITTED:
        return {
                   'status': 'Fail',
                   'message': f"Node with id = {node_id} is already submitted.",
               }, 400

    for machine in node.machines:
        try:
            verify_machine(machine)
        except Exception as e:
            return {
                       'status': 'Fail',
                       'message': f"Couldn't verify machine with IP = {machine.ip_address}." + str(e),
                   }, 400

    node.status = NodeStatus.SUBMITTED
    nodes_repository.save_changes(node)
    return {
               'status': 'Success',
               'message': 'Cluster node successfuly submitted.'
           }, 201


def verify_machine(machine):
    threshold = 10000
    number = random.randrange(threshold)
    url = 'http://' + machine.ip_address + '/verify/' + str(number)
    response = urlopen(url).read()
    return bin(number) == bin(int(response,2))

def verify_machine(machine):
    verify_ping_pong(machine)
    fill_machine_data(machine)

def verify_ping_pong(machine):
    threshold = 10000
    number = random.randrange(threshold)
    url = 'http://' + machine.ip_address + '/verify/' + str(number)
    try:
        response = urlopen(url).read()
    except Exception:
        raise Exception("\nMachine didn't answer for ping pong verification! \nPlease check if machine's IP is correct.")
    if bin(number) != bin(int(response, 2)):
        raise Exception("Wrong answer for verification message.")

def fill_machine_data(machine):
    url = 'http://' + machine.ip_address + '/machine-data'
    try:
        machine_data = json.loads(urlopen(url).read())
    except Exception:
        raise Exception("\nMachine didn't answer for hardware verification! \nPlease check if machine's IP is correct.")
    if machine_data.get('CPU'):
        machine.cpus = machine_data['CPU']
    if machine_data.get('GPU'):
        machine.gpus = machine_data['GPU']


def create_node(createNodeDto):
    new_node = ClusterNode(
        is_private = createNodeDto.get('is_private', False),
        user_id = createNodeDto.get('user_id'),
        status = NodeStatus.CREATED
    )
    inserted_node = nodes_repository.save_and_return(new_node)
    machines_list = []
    for ip in createNodeDto.get('ip_list', []):
        if ip == '' or ' ' in ip:
            return { 
                'status': 'Fail',
                'message':'\nCluster node could not be created.\n ' \
                    + 'Ip list element cannot be empty string or contain a white space'
                }, 400
        if machines_repository.get_machine_by_ip(ip):
            return { 
                'status': 'Fail',
                'message':'\nCluster node could not be created.\n' \
                    + f'There already is a machine with ip address: {ip}'
                }, 400
        machines_list.append(Machine(
            ip_address = ip,
            cluster_node_id = inserted_node.id,
            cpus = '',
            gpus = ''
        ))
    if len(machines_list) > 0:
        machines_repository.save_machines_list(machines_list)
    else: 
        nodes_repository.commit_changes()

    return { 
        'status': 'Success',
        'message': 'Succesfully created node and machines with given IP addresses.'
        }, 201


def remove_cluster_node_with_machines(node_id):
    if not nodes_repository.get_node_for_id(node_id):
        return {
                   'status': 'Fail',
                   'message': f"Node with id = {node_id} does not exist",
               }, 400
    machines_repository.remove_machines_by_node_id(node_id)
    nodes_repository.remove_cluster_node(node_id)
    return { 
        'status': 'Success',
        'message': f'Succesfully deleted node with id = {node_id} and all of it\'s machines.'
        }, 201
      


