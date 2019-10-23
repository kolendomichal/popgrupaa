from flask_restplus import Namespace, fields


class UserDto:
    api = Namespace('user', description='user related operations')
    user = api.model('user', {
        'email': fields.String(required=True, description='user email address'),
        'username': fields.String(required=True, description='user username'),
        'password': fields.String(required=True, description='user password'),
        'id': fields.Integer(description='user Identifier')
    })

class ApplicationDto:
    api = Namespace('application', description='application related operations')
    application = api.model('application', {
        'name': fields.String(required=False, description='application name'),
        'description': fields.String(required=False, description='application description'),
        'icon': fields.String(required=False, description='application icon as string of bytes'),
        'id': fields.Integer(description='application identifier')
    })

class TaskDto:
    api = Namespace('task', description='task related operations')
    task = api.model('task', {
        'id': fields.Integer(description='task Identifier'),
        'status': fields.Integer(description='task status'),
        'start_date': fields.Date(description='task start time date'),
        'end_date': fields.Date(description='task end time date'),
        'app_id': fields.Integer(required=True, description='app Identifier'),
        'user_id': fields.Integer(required=True, description='user Identifier')
    })

class StatusDto:
    api = Namespace('task', description='status related operations')
    status = api.model('task', {
        'status': fields.Integer(description='task status'),
        'message': fields.Integer(description='task message'),
    })