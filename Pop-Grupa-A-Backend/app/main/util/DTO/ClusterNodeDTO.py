from flask_restplus import Namespace, fields

class ClusterNodeDTO:
    api = Namespace('nodes', description='Cluster nodes releted operations')
    nodeDTO = api.model('nodes', {
        'id': fields.Integer(description='node Identifier')
        # TODO fill the rest
    })

    createNodeDTO = api.model('nodes', {
        'is_private': fields.Boolean(description='Is node private determiner'),
        'ip_list': fields.String(required=False, description='Joined string of requested ip adresses')
    })