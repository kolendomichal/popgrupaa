from app.helper import machineHealthCheck

def applyRoundRobinAlgorithm(machines):
    sortedMachines = sorted(machines, key=machines.get)
    for machine in sortedMachines:
        if machineHealthCheck(machine):
            machines[machine] = machines[machine] + 1
            return machine, machines

    return "machine", sortedMachines


def prepareDict(machines):
    machinesDict = dict()
    for machine in machines:
        address = machine.get("ip_address").split(":")[0]
        machinesDict[address] = 0
    return machinesDict