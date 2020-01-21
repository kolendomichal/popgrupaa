from flask import Flask
from flask import jsonify
import os
import netifaces as ni
import subprocess

MOCK_FILE_CONTENT ="""# Python program to print all 
# prime number in an interval

start = 11
end = 50025

for val in range(start, end + 1): 
    
# If num is divisible by any number   
# between 2 and val, it is not prime  
\tif val > 1: 
\t\tfor n in range(2, val): 
\t\t\tif (val % n) == 0: 
\t\t\t\tbreak
\t\telse: 
\t\t\tprint(val)
"""

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

#Check if currently any application is running on this machine
@app.route("/get-machine-task-info", methods=['GET'])
def get_macine_task_info():
    try:
        TASK_PID = str(subprocess.check_output('ps -aux | grep application | grep -v grep', shell=True)).split()[1]
        return jsonify({"status":"BUSY", "message":"At least one task is currently running on machine.","PID":TASK_PID})
    except:
        return jsonify({"status":"FREE", "message":"No tasks are running on machine."})

#Get Percentage CPU usage
@app.route("/get-machine-load-info", methods=['GET'])
def get_machine_load_info():
    CPU_Pct = str(subprocess.check_output('ps -aux --sort=-pcpu | head -n 2 | tail -n 1', shell=True)).split()[2]
    return jsonify({"load_percent":CPU_Pct})

#Function to mock downloading files from storage, because IStorage is not working right now
def create_files(id):
    f= open("entrypoint"+id+".sh","w+")
    f.write("#!/bin/sh \n")
    f.write("python3 application"+id+".py \n")
    f.close()

    os.chmod("entrypoint"+id+".sh", 509)
    
    with open("application"+id+".py", "w") as file:
        for line in MOCK_FILE_CONTENT:
            file.write(line)

#Create files for machine
@app.route("/task/<id>/create")
def create_new_task(id):
    #Mock downloading, IStorage is not working right now
    create_files(id)

    return jsonify("Task created")
 
#Run files on machine
@app.route("/task/<id>/activate")
def activate_task(id):
    proc = subprocess.Popen(['/entrypoint'+id+'.sh'], shell=True,
             stdin=None, stdout=None, stderr=None, close_fds=True)
    return jsonify({"Sucess":"OK"})

@app.route("/verify/<number>", methods=['GET'])
def get_binary_string(number):
    return bin(int(number))


if __name__ == '__main__':
      app.run(host=ip_address, port=int(port))