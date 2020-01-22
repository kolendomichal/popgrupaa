import unittest
from app import GetApplication, SaveTaskResults


class TestClass(unittest.TestCase):
	def test_GetApplication(self):
		result = GetApplication.get(self, app_id="1")
		self.assertEqual(result, 403)
	
	def test_SaveTaskResults(self):
		result = SaveTaskResults.post(self, task_id="1")
		self.assertEqual(result, 400)