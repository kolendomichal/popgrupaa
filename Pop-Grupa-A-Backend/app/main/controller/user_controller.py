from flask import request
from flask_restplus import Resource

from ..util.DTO.ComputationAccountDTO import ComputationAccountDto
from ..repositories.user_repository import add_user, get_user, check_user, logout_user

api = ComputationAccountDto.api
_user = ComputationAccountDto.user


@api.route('/register')
class UserCreate(Resource):
    @api.response(201, 'User successfully created.')
    @api.response(409, 'User already exist')
    @api.doc('create a new user')
    @api.expect(_user, validate=True)
    def post(self):
        """Creates a new User """
        data = request.json
        return add_user(user=data)


@api.route('/login')
class UserLogin(Resource):
    @api.response(200, 'User successfully logged')
    @api.response(403, 'User login failure')
    @api.doc('login user')
    @api.expect(_user, validate=True)
    def post(self):
        data = request.get_json()
        return check_user(user=data)


@api.route('/logout')
class UserLogout(Resource):
    @api.response(200, 'User successfully logout')
    @api.response(406, 'User logout failure')
    @api.doc('logout user')
    def post(self):
        return logout_user()


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
