from flask import request, abort

from app.main.model.ComputationTask import ComputationTask
from app.main.model.ComputationStatus import ComputationStatus
from app.main.model.ComputationAccount import ComputationAccount
from app.main.model.ComputationApplication import ComputationApplication

import app.main.repositories.task_repository as task_repository
from ..repositories.user_repository import get_user 

def add_task(task):
    db_user = ComputationAccount.query.filter_by(id=task['user_id']).first()
    db_app = ComputationApplication.query.filter_by(id=task['app_id']).first()

    if db_user and db_app:
        new_task = ComputationTask(
            status = ComputationStatus.SUBMITTED.value,
            user_id = task['user_id'],
            app_id = task['app_id']
        )

        task_repository.save_changes(new_task)

        return {
                'status': 'success',
                'message': 'Task successfuly created.'
                }, 201
    if not db_app:
        return {
                'status': 'fail',
                'message': f"App with id = {task['app_id']} does not exist",
                }, 400
     
    return {
            'status': 'fail',
            'message': f"User with id = {task['user_id']} does not exist",
            }, 400


def activate_task(task_id):
    try:
        task = task_repository.get_task_for_task_id(task_id)
        task.status=ComputationStatus.WORKING.value
        task_repository.save_changes(task)
        response_object = {
            'status': 'success',
            'message': 'Task successfuly activated.'
        }

        return response_object, 200
    except:
        response_object = {
            'status': 'failure',
            'message': 'Error occur while activating task'
        }
        return response_object, 404
    



def get_tasks_for_user(user_id):
        user = get_user(user_id)
        if not user:
            return abort(404, 'User with given id could not be found!')
        tasks_list = task_repository.get_tasks_for_user(user_id)
        status_code = 204 if len(tasks_list) == 0 else 200
        return tasks_list, status_code
