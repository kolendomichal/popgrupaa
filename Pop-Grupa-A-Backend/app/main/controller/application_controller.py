from flask import request
from flask_restplus import Resource

from ..util.dto import ApplicationDto
from ..repositories.application_repository import get_all_applications

api = ApplicationDto.api
_application = ApplicationDto.application


@api.route('/')
class ApplicationList(Resource):
    # @api.response(200, 'List successfully collected.')
    @api.doc('Get list of all applications')
    @api.marshal_with(_application, as_list=True)
    def get(self):
        """get application list"""
        applications_list = get_all_applications()
        # if len(applications_list) == 0:
        status_code = 204 if len(applications_list) == 0 else 200
        # else:
            # status_code = 200
        return applications_list , status_code