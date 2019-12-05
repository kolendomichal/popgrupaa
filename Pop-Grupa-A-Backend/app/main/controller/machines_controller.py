from flask_restplus import Resource
from app.main.util.user_validator import roles_required
from app.main.model.AccountRole import AccountRole
from ..util.DTO.MachineDTO import MachineDTO
import app.main.services.machines_service as machine_service

api = MachineDTO.api
_machine = MachineDTO.machine


@api.route('/<cluster_node_id>')
@api.param('cluster_node_id', 'Cluster node id (int)')
@api.response(200, 'Succes')
@api.response(406, 'Cannot parse string into int')
@api.response(204, 'No machines assigned to passed cluster node')
class ClusterMachineList(Resource):
    @api.doc('get machine list for node')
    @api.marshal_with(_machine, as_list=True)
    @roles_required(AccountRole.SUPPLIER)
    def get(self, cluster_node_id):
        return machine_service.get_cluster_node_machine_list(cluster_node_id)
