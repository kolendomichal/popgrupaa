import requests

BACKEND = "http://172.18.0.3:5000"
ALL_MACHINES = "/machines/all"
MACHINE_TASK_INFO = "/get-machine-task-info"
MACHINE_DATA = "/machine-data"

def fetchMachines():
    data = requests.get(BACKEND + ALL_MACHINES).json()
    return data;

def machineHealthCheck(address):
    try:
        req = requests.get("http://{}:5500".format(address) + MACHINE_DATA)
    except requests.ConnectionError:
        return False    
    return req.status_code == 200;
