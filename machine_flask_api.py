from flask import Flask
from flask import jsonify
import os
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
    with open("/proc/cpuinfo", "r") as cpuinfo:
        for line in cpuinfo.readlines():
            if 'model name' in line:
                CPU = line.split(':')[1].replace('\n','')
                break
                    
    return jsonify({ "CPU": CPU, "GPU": GPU, "IP_ADDRESS": ip_address + ':' + str(port)})

if __name__ == '__main__':
      app.run(host=ip_address, port=int(port))