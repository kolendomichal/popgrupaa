import os
import json
import unittest
import datetime
from flask import current_app
from manage import app
from app.main.config import basedir
import app.main.repositories.application_repository as application_repository
import app.main.repositories.user_repository as user_repository
from app.main.model.ComputationTask import ComputationTask
from app.main.model.ComputationAccount import ComputationAccount
from app.main.model.ComputationApplication import ComputationApplication


class test_task_controller(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        app.config.from_object('app.main.config.TestingConfig')
        cls.app = app.test_client()
        ComputationApplication.query.delete()
        ComputationAccount.query.delete()
        ComputationTask.query.delete()
        user = ComputationAccount(
            id=1,
            username='username',
            password='password',
            created=datetime.datetime.now(),
            lastLogin=datetime.datetime.now(),
            email='email')
        user_repository.save_changes(user)
        application = ComputationApplication(
            id=1,
            description="a",
            name="a",
            icon="a"
        )
        application_repository.save_changes(application)

    @classmethod
    def tearDownClass(cls):
        pass

    def test_get_user_tasks_returns_ok(self):
        response = self.app.get('/task/1', follow_redirects=True)
        self.assertEqual(response.status, "200 OK")

    # def test_create_user_task_returns_ok(self):
    #   task = {"app_id": 1, "user_id": 1}
    #   task4 = "{ \"app_id\": 1, \"user_id\": 1}"
    #   task2 = dict(app_id=1, user_id=1)
    #   response = self.app.post('/task/',data=task4)
    #   self.assertEqual(response.data, "201")


if __name__ == "__main__":
    unittest.main()
