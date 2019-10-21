from flask_restplus import Namespace, fields


class UserDto:
    api = Namespace('user', description='user related operations')
    user = api.model('user', {
        'email': fields.String(required=True, description='user email address'),
        'username': fields.String(required=True, description='user username'),
        'password': fields.String(required=True, description='user password'),
        'id': fields.Integer(description='user Identifier')
    })


class TaskDto:
    api = Namespace('task', description='task related operations')
    task = api.model('task', {
        'id': fields.Integer(description='task Identifier'),
        'status': fields.Integer(description='task status'),
        'start_time': fields.Date(description='task start time date'),
        'end_time': fields.Date(description='task end time date'),
        'user_id': fields.Integer(required=True, description='user Identifier')
    })