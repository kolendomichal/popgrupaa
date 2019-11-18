from flask_restplus import Namespace, fields


class ComputationApplicationDto:
    api = Namespace('application', description='application related operations')
    application = api.model('application', {
        'name': fields.String(required=False, description='application name'),
        'description': fields.String(required=False, description='application description'),
        'icon': fields.String(required=False, description='application icon as string of bytes'),
        'id': fields.Integer(description='application identifier')
    })