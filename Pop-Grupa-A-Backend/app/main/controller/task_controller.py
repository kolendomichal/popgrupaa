from flask import request
from flask_restplus import Resource

from ..util.DTO.ComputationTaskDTO import ComputationTaskDto
from ..services.task_service import get_tasks_for_user, add_task, activate_task
from app.main.util.user_validator import roles_required

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
    @roles_required('APP_USER')
    def get(self, user_id):
        """get computation tasks list for user"""
        return get_tasks_for_user(user_id)

@api.route('/')
class TaskCreate(Resource):
    @api.response(201, 'Task successfully created.')
    @api.doc('create a new task')
    @api.expect(_createModel, validate=True)
    @roles_required('APP_USER')
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
    @roles_required('APP_USER')
    def post(self, task_id):
        """Activates task"""
        return activate_task(task_id)
        
