from app.algorithm.algorithm import Algorithm
from app.helper import machineHealthCheck


class RoundRobinAlgorithm(Algorithm):

    def __init__(self, machines, healthCheck):
        self.machinesWorkLoad, self.machinesAdress = self.prepareData(machines)
        self.healthCheck = healthCheck
        print('Loaded round robin algorithm.')

    def assignNewMachineForTask(self):
        sortedMachines = sorted(self.machinesWorkLoad, key=self.machinesWorkLoad.get)
        for machine in sortedMachines:
            if self.healthCheck is False:
                self.machinesWorkLoad[machine] += 1
                return str(machine)
            if machineHealthCheck(self.machinesAdress[machine]):
                self.machinesWorkLoad[machine] += 1
                return str(machine)

    def prepareData(self, machines):
        machinesAdress = dict()
        machinesWorkLoad = dict()
        for machine in machines:
            address = machine.get("ip_address").split(":")[0]
            machinesAdress[machine.get("id")] = address
            machinesWorkLoad[machine.get("id")] = 0
        return machinesWorkLoad, machinesAdress