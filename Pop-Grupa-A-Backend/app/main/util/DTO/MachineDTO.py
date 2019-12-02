from flask_restplus import Namespace, fields


class MachineDTO:
    api = Namespace('machines', description='machine related operations')
    machine = api.model('machines', {
        'id': fields.Integer(required=True, description='machine id'),
        'cluster_node_id': fields.Integer(required=True, description='machine id'),
        'cpus': fields.String(required=True, description='cpus list'),
        'gpus': fields.String(required=True, description='gpus list'),
        'ip_address': fields.String(required=True, description='machine ip address')
    })
