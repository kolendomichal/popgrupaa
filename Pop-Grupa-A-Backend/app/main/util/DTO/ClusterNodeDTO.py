from flask_restplus import Namespace, fields
from app.main.model.NodeStatus import NodeStatus

class ClusterNodeDTO:
    api = Namespace('nodes', description='Cluster nodes releted operations')
    nodeDTO = api.model('nodes', {
        'id': fields.Integer(description='node Identifier'),
        'status': fields.String(description='node status', enum=NodeStatus._member_names_)
    })

    createNodeDTO = api.model('nodes', {
        'is_private': fields.Boolean(description='Is node private determiner'),
        'user_id': fields.String(required=True, description='Id of user that is the owner of the node'),
        'ip_list': fields.List(fields.String(required=False, description='List of ip addresses as string'))
    })