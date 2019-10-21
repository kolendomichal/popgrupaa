from flask import request
from flask_restplus import Resource
from ..util.dto import TaskDto
from ..repositories.task_repository import *

api = TaskDto.api
_task = TaskDto.task


@api.route('/')
class TaskList(Resource):
    @api.response(201, 'Task successfully created.')
    @api.doc('create a new task')
    @api.expect(_task, validate=True)
    def post(self):
        """Creates a new Task"""
        data = request.json
        return add_task(task=data)