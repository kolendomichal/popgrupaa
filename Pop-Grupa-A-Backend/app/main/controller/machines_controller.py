from flask import request
from flask_restplus import Resource

from ..util.DTO.MachineDTO import MachineDTO
from ..services.machines_service import get_cluster_node_machine_list

api = MachineDTO.api
_machine = MachineDTO.machine


@api.route('/<cluster_node_id>')
@api.param('cluster_node_id', 'Cluster node id (string)')
@api.response(200, 'Machine list successfully selected')
class ClusterMachineList(Resource):
    @api.doc('get machine list for node')
    def get(self, cluster_node_id):
        return get_cluster_node_machine_list(cluster_node_id)
