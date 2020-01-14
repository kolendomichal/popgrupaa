import requests
#todo move to env
STORAGE_URL = '0.0.0.0:8000'
STORAGE_APP_URL = STORAGE_URL + "/app"
STORAGE_TASK_URL = STORAGE_URL +"/task"

def getApplication(app_id):
    response = requests.get(STORAGE_APP_URL, app_id)
    #todo parse response- get files
    return response #lista plików - applikacja + enrypoint.sh

def saveTaskOutput(task_id, result_file):
    #result file ->?
    files = {'file': open(result_file, 'rb')}
    response = requests.post(STORAGE_TASK_URL, files=files)
    return response