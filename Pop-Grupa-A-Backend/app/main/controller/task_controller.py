from flask import request
from flask_restplus import Resource

from ..util.DTO.ComputationTaskDTO import ComputationTaskDto
from ..util.DTO.ComputationStatusDTO import ComputationStatusDto

from ..repositories.task_repository import update_task

from ..services.task_service import get_tasks_for_user, add_task

from app.main.model.ComputationTask import ComputationTask
from app.main.model.ComputationStatus import ComputationStatus


api = ComputationTaskDto.api
_task = ComputationTaskDto.task
_createModel = ComputationTaskDto.createModel


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
        return get_tasks_for_user(user_id)

@api.route('/')
class TaskCreate(Resource):
    @api.response(201, 'Task successfully created.')
    @api.doc('create a new task')
    @api.expect(_createModel, validate=True)
    def post(self):
        """Creates a new Task"""
        data = request.json

        return add_task(task=data)


@api.route('/<task_id>')
@api.response(200, 'Task successfully activated')
@api.response(404, 'Task not found')
@api.param('task_id', 'The Task identifier')
class TaskActivate(Resource):
    @api.doc('activates task')
    @api.marshal_with(_task)
    def post(self, task_id):
        try:
            task = get_task_for_task_id(task_id=task_id)
            task = change_status_for_task(task, ComputationStatus.WORKING.value)
            return 200, task
        except:
            return 404

