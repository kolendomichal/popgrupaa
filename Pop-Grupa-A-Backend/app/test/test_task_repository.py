import os
import unittest
import datetime
from app.main.model.ComputationTask import ComputationTask
from app.main.model.ComputationAccount import ComputationAccount
from app.main.model.ComputationApplication import ComputationApplication
from app.main.services.task_service import *
from flask import current_app
from app.main.repositories.user_repository import *
from app.main.repositories.task_repository import *
from manage import app
from app.main.config import basedir
import app.main.repositories.application_repository as application_repository
import app.main.repositories.user_repository as user_repository


class test_task_repository(unittest.TestCase):

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
            id="1",
            description="a",
            name="a",
            icon="a"
        )
        application_repository.save_changes(application)

    @classmethod
    def tearDownClass(cls):
        db.session.rollback()

    def test_add_task_success(self):
        task = {'app_id': 1, 'user_id': 1}
        response = add_task(task)
        self.assertEqual(response[1], 201)

    def test_get_tasks_for_user_returns_empty_list(self):
        response = get_tasks_for_user(999)
        print(response)
        self.assertEqual(response, [])

    def test_change_status_for_task_success(self):
        task = {'app_id': 1, 'user_id': 1, 'status': ComputationStatus.SUBMITTED.value}
        response = change_status_for_task(task, ComputationStatus.WORKING.value )
        self.assertEqual(response['status'], ComputationStatus.WORKING.value)

    def test_get_status_success(self):
        task = {'app_id': 1, 'user_id': 1, 'id':2, 'status': ComputationStatus.SUBMITTED.value}
        add_task(task)
        task = get_tasks_for_user(1)[-1]
        status= task.status
        response = get_status(task.id)
        self.assertEqual(response, status)

    def test_update_task_success(self):
        task = {'app_id': 1, 'user_id': 1, 'id': 2, 'status': ComputationStatus.PAUSED.value}
        response = update_task(task)
        self.assertEqual(response[1], 200)


if __name__ == "__main__":
    unittest.main()

