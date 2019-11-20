from flask import request
from flask_restplus import Resource

from ..util.DTO.ClusterNodeDTO import ClusterNodeDTO
import app.main.services.cluster_nodes_service as node_service

api = ClusterNodeDTO.api
node_dto = ClusterNodeDTO.nodeDTO


@api.route('/<user_id>')
@api.param('user_id', 'The User identifier')
@api.response(200, 'Success')
@api.response(204, 'User does not have any cluser nodes')
@api.response(404, 'User with given id could not be found!')
class TaskListForUser(Resource):
    @api.doc('Get list of cluster nodes for supplier')
    @api.marshal_with(node_dto, as_list=True)
    def get(self, user_id):
        """get computation tasks list for user"""
        return node_service.get_nodes_for_user(user_id)