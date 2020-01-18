from app.algorithm.algorithm import Algorithm
from app.helper import machineHealthCheck


class RoundRobinAlgorithm(Algorithm):

    def __init__(self, machines):
        self.machinesDict = self.prepareData(machines)
        print('Loaded round robin algorithm.')

    def assignNewMachineForTask(self):
        sortedMachines = sorted(self.machines, key=self.machines.get)
        for machine in sortedMachines:
            if machineHealthCheck(machine):
                self.machines[machine] += 1
                return machine

    def prepareData(self, machines):
        machinesDict = dict()
        for machine in machines:
            address = machine.get("ip_address").split(":")[0]
            machinesDict[address] = 0
        return machinesDict