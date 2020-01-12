from flask import request
from flask_restplus import Resource
from app.main.model.AccountRole import AccountRole
from ..util.DTO.ComputationTaskDTO import ComputationTaskDto
import app.main.services.task_service as task_service

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
    @roles_required(AccountRole.APP_USER)
    def get(self, user_id):
        """get computation tasks list for user"""
        return task_service.get_tasks_for_user(user_id)

@api.route('/')
class TaskCreate(Resource):
    @api.response(201, 'Task successfully created.')
    @api.doc('create a new task')
    @api.expect(_createModel, validate=True)
    @roles_required(AccountRole.APP_USER)
    def post(self):
        """Creates a new Task"""
        data = request.json
        return task_service.add_task(task=data)


@api.route('/<task_id>/activate')
@api.response(200, 'Task successfully activated')
@api.response(404, 'Task not found')
@api.param('task_id', 'The Task identifier')
class TaskActivate(Resource):
    @api.doc('activates task')
    @roles_required(AccountRole.APP_USER)
    def post(self, task_id):
        """Activates task"""
        return task_service.activate_task(task_id)

@api.route('/<task_id>/assign')
@api.response(200, 'Task successfully assigned')
@api.response(404, 'Task not found')
@api.param('task_id', 'The Task identifier')
class TaskAssign(Resource):
    @api.doc('assigns task')
    def post(self, task_id):
        """Marks task as assigned"""
        return task_service.assign_task(task_id)

@api.route('/<task_id>/start')
@api.response(200, 'Task successfully started')
@api.response(404, 'Task not found')
@api.param('task_id', 'The Task identifier')
class TaskStart(Resource):
    @api.doc('start work on task')
    def post(self, task_id):
        """Starts task on machine"""
        return task_service.start_task(task_id)

@api.route('/<task_id>/fail')
@api.response(200, 'Task successfully mark as failed')
@api.response(404, 'Task not found')
@api.param('task_id', 'The Task identifier')
class TaskFail(Resource):
    @api.doc('error occured, mark task as failed')
    def post(self, task_id):
        """Marks task as failed"""
        return task_service.fail_task(task_id)

@api.route('/<task_id>/complete')
@api.response(200, 'Task successfully completed')
@api.response(404, 'Task not found')
@api.param('task_id', 'The Task identifier')
class TaskComplete(Resource):
    @api.doc('completes task')
    def post(self, task_id):
        """Marks task as completed"""
        return task_service.complete_task(task_id)