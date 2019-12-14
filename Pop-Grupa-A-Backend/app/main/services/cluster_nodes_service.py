import app.main.repositories.cluster_nodes_repository as nodes_repository
import app.main.repositories.machines_repository as machines_repository
from app.main.model.NodeStatus import NodeStatus

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

    nodes_repository.change_state_to_submitted(node)
    return {
               'status': 'Success',
               'message': 'Cluster node successfuly submitted.'
           }, 201


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
    inserted_node = nodes_repository.create_node_and_return(createNodeDto)
    try:
        machines_were_created = machines_repository.create_new_machines_list(createNodeDto, inserted_node.id)
    except Exception as e:
        return { 
                'status': 'Fail',
                'message': str(e)
                }, 400

    if not machines_were_created: 
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
      


