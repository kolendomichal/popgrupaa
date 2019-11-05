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

def get_tasks_for_user(user_id):
        user = get_user(user_id)
        if not user:
            return abort(404, 'User with given id could not be found!')
        tasks_list = task_repository.get_tasks_for_user(user_id)
        if len(tasks_list) == 0:
            return tasks_list, 204
    
        return _map_status_for_task_list(tasks_list), 200


def _map_status_for_task_list(tasks_list):
    mapped_list = []
    for task in tasks_list:
        task_dict = dict(task.items())
        if 'status' in task_dict:
            try:
                task_dict['status'] = ComputationStatus(task_dict['status']).name
            except ValueError:
                task_dict['status'] = ''
        mapped_list.append(task_dict)
    return mapped_list