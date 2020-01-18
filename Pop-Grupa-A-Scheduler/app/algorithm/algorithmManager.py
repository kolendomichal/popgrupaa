from app.algorithm.roundRobinAlgorithm import RoundRobinAlgorithm
from app.algorithm.loadBalancingAlgorithm import LoadBalancingAlgorithm
import configparser


class AlgorithmManager:

    CONFIG_PATH = '../../config.ini'

    def __init__(self, machines):
        self.algorithm = self.loadAlgorithmModeFromConfigFile(machines)

    def assignMachineForTask(self):
        self.algorithm.assignNewMachineForTask()


    def loadAlgorithmModeFromConfigFile(self, machines):
        config = configparser.ConfigParser()
        config.read(AlgorithmManager.CONFIG_PATH)
        mode = config['scheduler']['algorithm']
        if mode == 'RR':
            return RoundRobinAlgorithm(machines)
        if mode == 'LB':
            return LoadBalancingAlgorithm(machines)
        raise Exception('No algorithm defined for {} abbreviation'.format(mode))
