from flask import request, abort
from flask_restplus import Resource

from ..util.dto import TaskDto
from ..repositories.task_repository import get_tasks_for_user
from ..repositories.user_repository import get_user


api = TaskDto.api
_task = TaskDto.task


@api.route('/<user_id>')
@api.param('user_id', 'The User identifier')
@api.response(200, 'Success')
@api.response(204, 'User does not have any computation tasks')
@api.response(404, 'User with given id could not be found!')
class TaskListForUser(Resource):
    @api.doc('Get list of computation tasks for user')
    @api.marshal_with(_task, as_list=True)
    def get(self, user_id):
        """get computation tasks list for user"""
        user = get_user(user_id)
        if not user:
            api.abort(404, 'User with given id could not be found!')
        tasks_list = get_tasks_for_user(user_id)
        status_code = 204 if len(tasks_list) == 0 else 200
        return tasks_list , status_code