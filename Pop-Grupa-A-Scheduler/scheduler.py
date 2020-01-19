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


# For testing purposes
# def test():
#     for i in range(0,2):
#         message = i
#         channel.queue_declare(queue="machine_12", durable=True)
#         channel.basic_publish(exchange=EXCHANGE,
#                               routing_key='machine_12',
#                               body=str(message))
#     for i in range(13,20):
#         message = i
#         channel.queue_declare(queue="machine_{}".format(str(i)), durable=True)
#         channel.basic_publish(exchange=EXCHANGE,
#                               routing_key='machine_{}'.format(str(i)),
#                               body=str(message))
#
# test()

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


def sendTaskToChoosenMachine(chosenMachine, messageBody):
    print("Sending {} to machine with ID = {}".format(messageBody, chosenMachine))
    channel.basic_publish(
        exchange=EXCHANGE,
        routing_key='machine_{}'.format(chosenMachine),
        body=json.dumps(messageBody),
        properties=pika.BasicProperties(delivery_mode=2,)
    )


channel.basic_qos(prefetch_count=1)
channel.basic_consume(
    queue="ActivateComputationTask", on_message_callback=consumeNewTask
)
channel.start_consuming()
