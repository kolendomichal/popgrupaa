from flask_restplus import Resource
from app.main.util.user_validator import roles_required
from app.main.model.AccountRole import AccountRole
from ..util.DTO.MachineDTO import MachineDTO
import app.main.services.machines_service as machine_service

api = MachineDTO.api
_machine = MachineDTO.machine


@api.route('/all')
@api.response(200, 'Success')
class AllMachinesList(Resource):
    @api.doc('get all machines')
    @api.marshal_with(_machine, as_list=True)
    @roles_required(AccountRole.SCHEDULER)
    def get(self):
        return machine_service.get_all_machines_list()


@api.route('/<cluster_node_id>')
@api.param('cluster_node_id', 'Cluster node id (int)')
@api.response(200, 'Success')
@api.response(406, 'Cannot parse string into int')
@api.response(204, 'No machines assigned to passed cluster node')
class ClusterMachineList(Resource):
    @api.doc('get machine list for node')
    @api.marshal_with(_machine, as_list=True)
    @roles_required(AccountRole.SUPPLIER)
    def get(self, cluster_node_id):
        return machine_service.get_cluster_node_machine_list(cluster_node_id)


@api.route('/get-machine-by-ip/<machine_ip>')
@api.param('machine_ip', 'Cluster node ip (string)')
@api.response(200, 'Success')
@api.response(406, 'err')
class ClusterMachineList(Resource):
    @api.doc('get machine by ip')
    @api.marshal_with(_machine)
    def get(self, machine_ip):
        return machine_service.get_machine_by_id(machine_ip)


@api.route('/<machine_id>/delete')
@api.response(201, 'Machine successfully deleted.')
@api.param('machine_id', 'The Machine identifier')
class MachineDelete(Resource):
    @api.doc('Delete machine by id')
    @roles_required(AccountRole.SUPPLIER)
    def delete(self, machine_id):
        """Deletes a machine"""
        return machine_service.remove_machine_by_id(machine_id)
