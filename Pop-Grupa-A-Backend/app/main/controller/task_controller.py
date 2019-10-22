from flask import request
from flask_restplus import Resource
from ..util.dto import TaskDto, StatusDto
from ..repositories.task_repository import *
from app.main.model.ComputationTask import ComputationTask


api = TaskDto.api
_task = TaskDto.task
_status = StatusDto.status

@api.route('/')
class TaskList(Resource):
    @api.response(201, 'Task successfully created.')
    @api.doc('create a new task')
    @api.expect(_task, validate=True)
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

@api.route('/<task_id>')
@api.response(200, 'Task successfully activated.')
@api.response(400, 'Task not found')
@api.param('task_id', 'The task identifier')
class TaskActivate(Resource):
    @api.doc('activates task')
    @api.marshal_with(_task)
    def post(self, task_id):
        try:
            task = ComputationTask.query.filter_by(task_id=task_id).all()
            task['status'] = '3'
            return update_task(task)
        except:
            return {
                  "id": 0,
                  "status": 0,
                  "start_date":  datetime.now(),
                  "end_date":  datetime.now(),
                  "app_id": 0,
                  "user_id": 0
                }
