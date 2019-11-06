from flask_restplus import Namespace, fields
from app.main.model.ComputationStatus import ComputationStatus

class ComputationTaskDto:
    api = Namespace('task', description='task related operations')
    task = api.model('task', {
        'id': fields.Integer(description='task Identifier'),
        'status': fields.String(description='task status', enum=ComputationStatus._member_names_),
        'start_date': fields.Date(description='task start time date'),
        'end_date': fields.Date(description='task end time date'),
        'app_id': fields.Integer(required=True, description='app Identifier'),
        'user_id': fields.Integer(required=True, description='user Identifier')
    })
    task_user_list = api.model('task', {
        'id': fields.Integer(description='task Identifier'),
        'status': fields.String(description='task status', enum=ComputationStatus._member_names_),
        'start_date': fields.Date(description='task start time date'),
        'end_date': fields.Date(description='task end time date'),
        'app_name': fields.String(attribute='computation_applications.name', description='app name for this task'),
    })
    createModel = api.model('createModel', {
        'app_id': fields.Integer(required=True, description='app Identifier'),
        'user_id': fields.Integer(required=True, description='user Identifier')
    })

class StatusDto:
    api = Namespace('task', description='status related operations')
    status = api.model('task', {
        'status': fields.Integer(description='task status'),
        'message': fields.Integer(description='task message')
    })