# app/__init__.py

from flask_restplus import Api
from flask import Blueprint

from .main.controller.user_controller import api as user_ns
from .main.controller.application_controller import api as application_ns
from .main.controller.task_controller import api as task_ns
from .main.controller.nodes_controller import api as nodes_ns
from .main.controller.machines_controller import api as machines_ns


blueprint = Blueprint('api', __name__)

api = Api(blueprint,
          title='REST API for BalticLSC project',
          version='1.0',
          description='REST API for BalticLSC project.'
          )

api.add_namespace(user_ns, path='/user')
api.add_namespace(application_ns, path='/application')
api.add_namespace(task_ns, path='/task')
api.add_namespace(nodes_ns, path='/nodes')
api.add_namespace(machines_ns, path='/machines')
