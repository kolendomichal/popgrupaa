from flask_restplus import Namespace, fields


class ComputationTaskDto:
    api = Namespace('task', description='task related operations')
    task = api.model('task', {
        'id': fields.Integer(description='task Identifier'),
        'status': fields.Integer(description='task status'),
        'start_date': fields.Date(description='task start time date'),
        'end_date': fields.Date(description='task end time date'),
        'app_id': fields.Integer(required=True, description='app Identifier'),
        'user_id': fields.Integer(required=True, description='user Identifier')
    })
    task_user_list = api.model('task', {
        'id': fields.Integer(description='task Identifier'),
        'status': fields.Integer(description='task status'),
        'start_date': fields.Date(description='task start time date'),
        'end_date': fields.Date(description='task end time date'),
        'app_name': fields.String(description='app name for this task'),
    })
    createModel = api.model('createModel', {
        'app_id': fields.Integer(required=True, description='app Identifier'),
        'user_id': fields.Integer(required=True, description='user Identifier')
    })