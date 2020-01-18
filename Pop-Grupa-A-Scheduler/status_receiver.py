import pika, os, time
import json
from app.helper import sendTaskStatusChangeRequest


def changeStatusToAddress(status):
    switcher = {
        "COMPLETED": "complete",
        "FAILED": 'fail'
    }
    return switcher.get(status, "Invalid month")

params = pika.URLParameters(os.environ.get("RABBIT_URL"))

connection = pika.BlockingConnection(params)
channel = connection.channel()
channel.queue_declare(queue="TaskStatus", durable=True)

print(" [*] Waiting for messages from TaskStatus")


def readTaskAndChangeStatus(ch, method, properties, body):
    data = json.loads(body)
    task_id = data.get('task_id')
    address = changeStatusToAddress(data.get('status'))
    sendTaskStatusChangeRequest(str(task_id), address)
    ch.basic_ack(delivery_tag=method.delivery_tag)


channel.basic_qos(prefetch_count=1)
channel.basic_consume(
    queue="TaskStatus", on_message_callback=readTaskAndChangeStatus
)
channel.start_consuming()


