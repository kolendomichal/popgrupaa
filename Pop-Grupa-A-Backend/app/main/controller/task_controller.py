from flask import request
from flask_restplus import Resource

from ..util.DTO.ComputationTaskDTO import ComputationTaskDto
from ..util.DTO.ComputationStatusDTO import ComputationStatusDto

from ..repositories.task_repository import *
from ..repositories.user_repository import get_user

from ..service.task_service import get_tasks_for_user as tmp_get_tasks_for_user

from app.main.model.ComputationTask import ComputationTask


api = ComputationTaskDto.api
_task = ComputationTaskDto.task
_createModel = ComputationTaskDto.createModel
_task_user_list = ComputationTaskDto.task_user_list


@api.route('/<user_id>')
@api.param('user_id', 'The User identifier')
@api.response(200, 'Success')
@api.response(204, 'User does not have any computation tasks')
@api.response(404, 'User with given id could not be found!')
class TaskListForUser(Resource):
    @api.doc('Get list of computation tasks for user')
    @api.marshal_with(_task_user_list, as_list=True)
    def get(self, user_id):
        """get computation tasks list for user"""
        return tmp_get_tasks_for_user(user_id)

@api.route('/')
class TaskList(Resource):
    @api.response(201, 'Task successfully created.')
    @api.doc('create a new task')
    @api.expect(_createModel, validate=True)
    def post(self):
        """Creates a new Task"""
        data = request.json
        return add_task(task=data)

@api.route('/<task_id>')
@api.response(200, 'Task successfully activated')
@api.response(400, 'Task not found')
@api.param('task_id', 'The task identifier')
class TaskActivate(Resource):
    @api.doc('activates task')
    @api.marshal_with(_task)
    def post(self, task_id):
        try:
            task = ComputationTask.query.filter_by(task_id=task_id).all()
            task['status'] = '3'
            return 200, update_task(task)
        except:
            return 404, "task not found"
