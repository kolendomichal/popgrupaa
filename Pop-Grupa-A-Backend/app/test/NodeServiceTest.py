from unittest.mock import Mock, patch
import unittest
from flask import current_app
from manage import app
from app.main.services.cluster_nodes_service import verify_ping_pong, fill_machine_data
from app.main.model.Machine import Machine

class TestClusterNodesService(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.mock_get_patcher = patch('app.main.services.cluster_nodes_service.urlopen')
        cls.mock_rand = patch('random.randrange')
        cls.mock_random = cls.mock_rand.start()
        cls.mock_get = cls.mock_get_patcher.start()
        cls.machine = Machine(
            id=1,
            cluster_node_id = 1,
            cpus = 'Intel(R) Core(TM) i5-5200U CPU @ 2.20GHz',
            gpus = 'GeForce GTX 680',
            ip_address = "127.0.0.1:5500"
            )
        
    @classmethod
    def tearDownClass(cls):
        cls.mock_get_patcher.stop()
        cls.mock_random.stop()


    def test_Verify_Ping_Pong(self):
        self.mock_get.return_value.ok = True
        self.mock_get.return_value = Mock()
        self.mock_get.return_value.read.return_value = "11"
        self.mock_random.return_value = 3

        response = verify_ping_pong(self.machine)
        self.assertTrue(self.mock_get.called)
        self.assertTrue(self.mock_random.called)

    def test_fill_machine_data(self):
        self.mock_get.return_value.ok = True
        self.mock_get.return_value = Mock()
        self.mock_get.return_value.read.return_value = '{ "CONTAINER_IP_ADDRESS": "172.18.0.4:5500", "CPU": "Intel(R) Core(TM) i5-5200U CPU @ 2.20GHz", "GPU": "GeForce GTX 680", "IP_ADDRESS": "127.0.0.1:5500" }'
        
        fill_machine_data(self.machine)
        self.assertTrue(self.mock_get.called)

    def test_fill_machine_data_throws_Exception(self):
        self.mock_get.return_value.ok = False
        self.mock_get.return_value.read.return_value = None
        with self.assertRaises(Exception) as context:
            fill_machine_data(self.machine)
        self.assertTrue("\nMachine didn't answer for hardware verification! \nPlease check if machine's IP is correct." in str(context.exception))
        

    def test_verify_ping_pong_throws_Exception(self):
        self.mock_get.return_value.read.return_value = "01"
        self.mock_random.return_value = 3
        with self.assertRaises(Exception) as context:
            verify_ping_pong(self.machine)
        self.assertTrue("Wrong answer for verification message." in str(context.exception))

    def test_verify_ping_pong_throws_Exception2(self):
        self.mock_get.return_value.ok = False
        self.mock_get.return_value.read.return_value = None
        with self.assertRaises(Exception) as context:
            verify_ping_pong(self.machine)
        # self.assertEquals("\nMachine didn't answer for ping pong verification! \nPlease check if machine's IP is correct.", str(context.exception))


