from flask import request, abort
from flask_restplus import Resource

from ..repositories.task_repository import get_tasks_for_user as _get_tasks_for_user
from ..repositories.user_repository import get_user 

def get_tasks_for_user(user_id):
        user = get_user(user_id)
        if not user:
            response_object = { "message":"User with given id could not be found!"}
            return abort(404, 'User with given id could not be found!') #response_object, 404
        tasks_list = _get_tasks_for_user(user_id)
        status_code = 204 if len(tasks_list) == 0 else 200
        return tasks_list, status_code