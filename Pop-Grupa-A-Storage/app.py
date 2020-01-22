from flask import Flask, send_file
from flask_restplus import Resource, Api
import os
from flask import Flask, request, abort, jsonify, send_from_directory
import zipfile
import pathlib

app = Flask(__name__)
api = Api(app)
UPLOAD_DIRECTORY = "storage"


@api.param('app_id', 'App identifier')
@api.response(200, 'Success')
@api.response(404, 'App with given id could not be found!')
@api.route('/storage/app/<app_id>')
class GetApplication(Resource):
    @api.doc('Get application')
    #@roles_required(AccountRole.APP_USER)
    def get(self, app_id):
        path = os.path.join(UPLOAD_DIRECTORY, "applications", app_id)
        if not os.path.exists(path):
            return 403
        else:
            print("exists")
            zipf = zipfile.ZipFile("application_" + app_id + ".zip", 'w', zipfile.ZIP_DEFLATED)
            print("path" ,  path)
            dirPath = path
            with zipfile.ZipFile("application_" + app_id + ".zip", 'w', zipfile.ZIP_DEFLATED) as z:
                zipf.write(dirPath)
            return send_file("application_" + app_id + ".zip",
                             mimetype='zip',
                             attachment_filename="application_" + app_id + ".zip",
                             as_attachment=True)


@api.route('/storage/task/<task_id>')
@api.param('task_id', 'Task identifier')
@api.response(200, 'Success')
@api.response(400, 'Could not find results to save')
class SaveTaskResults(Resource):
    @api.doc('get task')
    def post(self, task_id):
        path = os.path.join(UPLOAD_DIRECTORY, "tasks", task_id)
        print(path)
        if not os.path.exists(path):
            os.makedirs(path)
        if request.data:
            with open(path + "/task_result_" + task_id + ".txt", "wb") as fp:
                fp.write(request.data)
            return 200
        else:
            return 400
    

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
