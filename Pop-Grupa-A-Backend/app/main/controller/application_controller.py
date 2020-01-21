from flask_restplus import Resource
from app.main.model.AccountRole import AccountRole
from app.main.util.user_validator import roles_required
from ..util.DTO.ComputationApplicationDTO import ComputationApplicationDto
import app.main.services.application_service as application_service

api = ComputationApplicationDto.api
_application = ComputationApplicationDto.application


@api.route('/')
@api.response(200, 'Success.')
@api.response(204, 'Could not find any application.')
class ApplicationList(Resource):
    @api.doc('Get list of all applications')
    @api.marshal_with(_application, as_list=True)
    @roles_required(AccountRole.APP_USER)
    def get(self):
        """get application list"""
        return application_service.get_all_applications()