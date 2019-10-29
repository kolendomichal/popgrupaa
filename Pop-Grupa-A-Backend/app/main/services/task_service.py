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

        return 0
     
    if not db_user:
        return 1
    
    return 2
    

def get_tasks_for_user(user_id):
        user = get_user(user_id)
        if not user:
            response_object = { "message":"User with given id could not be found!"}
            return abort(404, 'User with given id could not be found!') #response_object, 404
        tasks_list = task_repository.get_tasks_for_user(user_id)
        status_code = 204 if len(tasks_list) == 0 else 200
        return tasks_list, status_code