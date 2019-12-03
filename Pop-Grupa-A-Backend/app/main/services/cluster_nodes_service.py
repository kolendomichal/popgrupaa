import app.main.repositories.cluster_nodes_repository as nodes_repository
from app.main.model.NodeStatus import NodeStatus
import random
from urllib.request import urlopen
import json


def get_nodes_for_user(userId):
    #TODO below is to be fixed 
    return nodes_repository.get_cluster_nodes_for_user(userId)

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
        try:
            verify_machine(machine)
        except Exception as e:
            return {
                       'status': 'fail',
                       'message': f"Couldn't verify machine with IP = {machine.ip_address}." + str(e),
                   }, 400

    node.status = NodeStatus.SUBMITTED
    nodes_repository.save_changes(node)
    return {
               'status': 'success',
               'message': 'Cluster node successfuly submitted.'
           }, 201

def verify_machine(machine):
    verify_ping_pong(machine)
    verify_cpu_gpu(machine)

def verify_ping_pong(machine):
    threshold = 10000
    number = random.randrange(threshold)
    url = 'http://' + machine.ip_address + '/verify/' + str(number)
    try:
        response = urlopen(url).read()
    except Exception:
        raise Exception("Machine didn't answer for ping pong verification! Please check if machine's IP is correct.")
    if bin(number) != bin(int(response, 2)):
        raise Exception("Wrong answer for verification message.")

def verify_cpu_gpu(machine):
    url = 'http://' + machine.ip_address + '/machine-data'
    try:
        machine_data = json.loads(urlopen(url).read())
    except Exception:
        raise Exception("Machine didn't answer for hardware verification! Please check if machine's IP is correct.")
    if machine_data['CPU'] != machine.cpus:
        raise Exception(f"CPU in database '{machine.cpus}' does not match machine's CPU '{machine_data['CPU']}'!")
    if machine_data['GPU'] != machine.gpus:
        raise Exception(f"GPU in database '{machine.gpus}' does not match machine's GPU '{machine_data['GPU']}'!")


