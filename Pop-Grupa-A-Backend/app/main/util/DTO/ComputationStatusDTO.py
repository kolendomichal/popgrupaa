from flask_restplus import Namespace, fields


class ComputationStatusDto:
    api = Namespace('task', description='status related operations')
    status = api.model('task', {
        'status': fields.Integer(description='task status'),
        'message': fields.Integer(description='task message'),
    })