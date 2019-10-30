from flask import request
from flask_restplus import Resource
from ..util.DTO.ComputationTask.TaskDTO import ComputationTaskDto
from flask_restplus import Resource
from ..util.DTO.ComputationTask.TaskDTO import StatusDto
from ..services.task_service import *

api = ComputationTaskDto.api
_createModel = ComputationTaskDto.createModel
_taskDTO = ComputationTaskDto.task


@api.route('/')
class TaskCreate(Resource):
    @api.response(201, 'Task successfully created.')
    @api.doc('create a new task')
    @api.expect(_createModel, validate=True)
    def post(self):
        """Creates a new Task"""
        data = request.json

        return add_task(task=data)

@api.route('/<user_id>')
@api.param('user_id', 'The User identifier')
class TaskGet(Resource):
    @api.doc('get user tasks')
    @api.marshal_with(_taskDTO)
    def get(self, user_id):
        return get_tasks_for_user(user_id)

@api.route('/<task_id>')
@api.response(200, 'Task successfully activated')
@api.response(404, 'Task not found')
@api.param('task_id', 'The Task identifier')
class TaskActivate(Resource):
    @api.doc('activates task')
    @api.marshal_with(_taskDTO)
    def post(self, task_id):
        try:
            task = get_task_for_task_id(task_id=task_id)
            task = change_status_for_task(task, ComputationStatus.WORKING.value)
            return 200, task
        except:
            return 404

