import pika, os
import json
from app.helper import fetchMachines
from app.algorithm.algorithmManager import AlgorithmManager

EXCHANGE = "task_assign"
params = pika.URLParameters(os.environ.get("RABBIT_URL"))

connection = pika.BlockingConnection(params)
channel = connection.channel()
channel.queue_declare(queue="ActivateComputationTask", durable=True)
channel.exchange_declare(exchange=EXCHANGE, exchange_type="direct")

machines = fetchMachines()
algorithmManager = AlgorithmManager(machines)
print(" [*] Waiting for messages from ActivateComputationTask")


def consumeNewTask(ch, method, properties, body):
    body = json.loads(body)
    print("-- [x] -- Received task: " + str(body.get("task_id")))
    global algorithmManager
    chosenMachine = algorithmManager.assignMachineForTask()
    sendTaskToChoosenMachine(chosenMachine, body)
    ch.basic_ack(delivery_tag=method.delivery_tag)


def sendTaskToChoosenMachine(machine, messageBody):
    channel.basic_publish(
        exchange=EXCHANGE,
        routing_key=machine,
        body=json.dumps(messageBody),
        properties=pika.BasicProperties(delivery_mode=2,)
    )


channel.basic_qos(prefetch_count=1)
channel.basic_consume(
    queue="ActivateComputationTask", on_message_callback=consumeNewTask
)
channel.start_consuming()
