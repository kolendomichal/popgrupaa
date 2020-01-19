from app.algorithm.algorithm import Algorithm
from app.helper import machineHealthCheck
import pika, os

class LoadBalancingAlgorithm(Algorithm):

    def __init__(self, machines):
        self.machinesWorkLoad, self.machinesAdress = self.prepareData(machines)
        self.queues = self.loadQueues()
        print('Loaded load balancing algorithm.')

    def assignNewMachineForTask(self):
        self.queues = self.loadQueues()
        self.updateMachinesWorkLoad()
        sortedMachines = sorted(self.machinesWorkLoad, key=self.machinesWorkLoad.get)
        for machine in sortedMachines:
            # if machineHealthCheck(self.machinesAdress[machine]):
            return str(machine)

    def prepareData(self, machines):
        machinesAdress = dict()
        machinesWorkLoad = dict()
        for machine in machines:
            address = machine.get("ip_address").split(":")[0]
            machinesAdress[machine.get("id")] = address
            machinesWorkLoad[machine.get("id")] = 0
        return machinesWorkLoad, machinesAdress

    def loadQueues(self):
        params = pika.URLParameters(os.environ.get("RABBIT_URL"))
        connection = pika.BlockingConnection(params)
        channel = connection.channel()
        queues = dict()
        for machine_id in self.machinesWorkLoad:
            queues[machine_id] = channel.queue_declare(queue='machine_{}'.format(machine_id), durable=True)
        return queues

    def updateMachinesWorkLoad(self):
        for machine_id in self.machinesWorkLoad:
            self.machinesWorkLoad[machine_id] = self.getNumberOfTasksForMachine(machine_id)

    def getNumberOfTasksForMachine(self, machineId):
            return self.queues[machineId].method.message_count