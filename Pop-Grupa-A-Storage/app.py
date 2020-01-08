from flask import Flask
from flask_restplus import Resource, Api
import os
from flask import Flask, request, abort, jsonify, send_from_directory

app = Flask(__name__)
api = Api(app)
#todo change in dockerfile
UPLOAD_DIRECTORY = "/home/ktk/my_projects/io/popgrupaa/Pop-Grupa-A-Storage/storage"


@api.param('app_id', 'App identifier')
@api.response(200, 'Success')
@api.response(404, 'App with given id could not be found!')
@api.route('/storage/app/<app_id>')
class Storage(Resource):

    @api.doc('get app')
    #@roles_required(AccountRole.APP_USER)

    def get(self, app_id):
        print("abc")
        path = os.path.join(UPLOAD_DIRECTORY, "tasks", app_id)
        if not os.path.exists(path):
            print("wrong path")
            return 403
        return 200
        return send_from_directory(UPLOAD_DIRECTORY, path, as_attachment=True)

    def post(self, app_id):
        filename = app_id
        path = os.path.join(UPLOAD_DIRECTORY, "applications", filename)
        if not os.path.exists(path):
            os.makedirs(path)

        if "/" in filename:
            abort(400, "no subdirectories directories allowed")

        with open(path, "wb") as fp:
            fp.write(request.data)

        return "", 200


@api.route('/storage/task/<task_id>')
@api.param('task_id', 'Task identifier')
@api.response(200, 'Success')
@api.response(404, 'Task with given id could not be found!')
class Storage(Resource):
    @api.doc('get task')
    #@roles_required(AccountRole.APP_USER)

    def get(self, task_id):
        print("abc")
        path = os.path.join(UPLOAD_DIRECTORY, "tasks", task_id)
        if not os.path.exists(path):
            print("wrong path")
            return 403
        return 200
        #todo - send all files from dir?
        return send_from_directory(UPLOAD_DIRECTORY, path, as_attachment=True)

    def post(self, task_id):
        filename = task_id
        path = os.path.join(UPLOAD_DIRECTORY, "tasks", filename)
        if not os.path.exists(path):
            os.makedirs(path)

        if "/" in filename:
            abort(400, "no subdirectories directories allowed")

        with open(path, "wb") as fp:
            fp.write(request.data)

        return "", 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000,debug=True)