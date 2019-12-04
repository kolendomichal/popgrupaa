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

@app.route("/verify/<number>", methods=['GET'])
def get_binary_string(number):
    return bin(int(number))


if __name__ == '__main__':
      app.run(host=ip_address, port=int(port))