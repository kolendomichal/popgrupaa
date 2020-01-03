from flask import Flask
from flask import jsonify
import os
import netifaces as ni

app = Flask(__name__)
port = os.environ['FLASK_RUN_PORT']
ip_address = os.environ['FLASK_APP_IP']
@app.route("/", methods=['GET'])
def hello():
    return "Hello, World!"

@app.route("/machine-data", methods=['GET'])
def get_machine_data():
    CPU = ''
    GPU = 'GeForce GTX 680'
    container_ip = ni.ifaddresses('eth0')[ni.AF_INET][0]['addr']
    with open("/proc/cpuinfo", "r") as cpuinfo:
        for line in cpuinfo.readlines():
            if 'model name' in line:
                CPU = line.split(':')[1].replace('\n','')
                break
                    
    return jsonify({ "CPU": CPU, "GPU": GPU, "IP_ADDRESS": ip_address + ':' + str(port), "CONTAINER_IP_ADDRESS": container_ip + ':' + str(port)})

@app.route("/get-machine-task-info", methods=['GET'])
def get_macine_task_info():
    # sprawdz czy jakies zadanie chodzi na maszynie
    is_free = True
    if is_free:
        return jsonify({"status":"FREE", "message":"No tasks are running on machine."})
    else:
        return jsonify({"status":"BUSY", "message":"At least one task is currently running on machine."})
 
@app.route("/get-machine-load-info", methods=['GET'])
def get_machine_load_info():
    CPU_Pct=str(round(float(os.popen('''grep 'cpu ' /proc/stat | awk '{usage=($2+$4)*100/($2+$4+$5)} END {print usage }' ''').readline()),2))
    return jsonify({"load_percent":CPU_Pct})

@app.route("/task/<id>/create")
def create_new_task(id):
    # pobierz aplikacje za pomocą IStorage
    # zapisz aplikcaje na dysku
    # trzeba jeszcze uwzglednić id taska
    return jsonify("Task created")
 
@app.route("/task/<id>/activate")
def activate_task():
    # uruchomic wczesniej zapisany task
    return jsonify("Task activted")

@app.route("/verify/<number>", methods=['GET'])
def get_binary_string(number):
    return bin(int(number))


if __name__ == '__main__':
      app.run(host=ip_address, port=int(port))