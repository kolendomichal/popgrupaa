from flask import request, abort

import app.main.repositories.task_repository as task_repository
import app.main.repositories.user_repository as user_repository
import app.main.repositories.application_repository as application_repository

def add_task(task):
    db_user = user_repository.get_user(task['user_id'])   
    db_app =  application_repository.get_app_by_id(task['app_id'])

    if db_user and db_app:
        task_repository.add_new_task(task)
        return {
                'status': 'Success',
                'message': 'Task successfuly created.'
                }, 201
    if not db_app:
        return {
                'status': 'Fail',
                'message': f"App with id = {task['app_id']} does not exist",
                }, 400
    return {
            'status': 'Fail',
            'message': f"User with id = {task['user_id']} does not exist",
            }, 400


def activate_task(task_id):
    try:
        task = task_repository.change_task_status_to_active(task_id)
        response_object = {
            'status': 'Success',
            'message': 'Task successfuly activated.'
        }
        return response_object, 200
    except:
        response_object = {
            'status': 'Fail',
            'message': 'Error occur while activating task'
        }
        return response_object, 404
    

def get_tasks_for_user(user_id):
        user = user_repository.get_user(user_id)
        if not user:
            return abort(404, 'User with given id could not be found!')

        tasks_list = task_repository.get_tasks_for_user(user_id)

        if len(tasks_list) == 0:
            return tasks_list, 204
        return tasks_list, 200

