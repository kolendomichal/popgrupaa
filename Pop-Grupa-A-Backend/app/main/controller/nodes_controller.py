from flask import request
from flask_restplus import Resource

from ..util.DTO.ClusterNodeDTO import ClusterNodeDTO
import app.main.services.cluster_nodes_service as node_service

api = ClusterNodeDTO.api
node_dto = ClusterNodeDTO.nodeDTO


#TODO This method should have route user/<id_user>/nodes according to convention,
#TODO similarly for user tasks should be user/<id_user>/tasks
@api.route('/user/<user_id>')
@api.param('user_id', 'The User identifier')
@api.response(200, 'Success')
@api.response(204, 'User does not have any cluser nodes')
@api.response(404, 'User with given id could not be found!')
class NodesListForUser(Resource):
    @api.doc('Get list of cluster nodes for supplier')
    @api.marshal_with(node_dto, as_list=True)
    def get(self, user_id):
        """get cluster node list for user"""
        return node_service.get_nodes_for_user(user_id)


@api.route('/<node_id>/submit')
@api.response(201, 'Node successfully submitted.')
@api.param('node_id', 'The Node identifier')
class NodeSubmit(Resource):
    @api.doc('Submit a new cluster node')
    def post(self, node_id):
        """Submits a cluster node"""
        return node_service.submit_node(node_id)