from flask import request
from flask_restplus import Resource

from ..util.DTO.ComputationApplicationDTO import ComputationApplicationDto
from ..services.application_service import get_all_applications

api = ComputationApplicationDto.api
_application = ComputationApplicationDto.application


@api.route('/')
@api.response(200, 'Success.')
@api.response(204, 'Could not find any application.')
class ApplicationList(Resource):
    @api.doc('Get list of all applications')
    @api.marshal_with(_application, as_list=True)
    def get(self):
        """get application list"""
        return get_all_applications()