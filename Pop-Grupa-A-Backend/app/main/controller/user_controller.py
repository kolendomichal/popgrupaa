from flask import request
from flask_restplus import Resource

from ..util.DTO.ComputationAccount.UserDTO import UserDto
from ..repositories.user_repository import add_user, get_user

api = UserDto.api
_user = UserDto.user


@api.route('/')
class UserList(Resource):
    @api.response(201, 'User successfully created.')
    @api.doc('create a new user')
    @api.expect(_user, validate=True)
    def post(self):
        """Creates a new User """
        data = request.json
        return add_user(user=data)


@api.route('/<public_id>')
@api.param('public_id', 'The User identifier')
@api.response(404, 'User not found.')
class User(Resource):
    @api.doc('get a user')
    @api.marshal_with(_user)
    def get(self, public_id):
        """get a user given its identifier"""
        user = get_user(public_id)
        if not user:
            api.abort(404)
        else:
            return user
