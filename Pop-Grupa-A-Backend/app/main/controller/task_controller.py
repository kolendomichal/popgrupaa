from flask import request
from flask_restplus import Resource
from ..util.DTO.ComputationTask.TaskDTO import ComputationTaskDto
from ..repositories.task_repository import *
from flask_restplus import cors

api = ComputationTaskDto.api
_createModel = ComputationTaskDto.createModel
_task = ComputationTaskDto.task

@api.route('/')
class TaskList(Resource):
    @api.response(201, 'Task successfully created.')
    @api.doc('create a new task')
    @api.expect(_createModel, validate=True)
    @cors.crossdomain(origin='*')
    def post(self):
        """Creates a new Task"""
        data = request.json
        return add_task(task=data)

@api.route('/<user_id>')
@api.param('user_id', 'The User identifier')
class TaskGet(Resource):
    @api.doc('get user tasks')
    @api.marshal_with(_task)
    def get(self, user_id):
        return get_tasks_for_user(user_id)
