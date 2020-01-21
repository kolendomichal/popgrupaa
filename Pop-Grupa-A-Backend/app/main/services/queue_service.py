import pika
import json

def push_machine_task(machine_id, task_id, application_id):
    params = pika.URLParameters('amqp://testuser:testpassword@172.17.0.1:5672/test-vhost')
    connection = pika.BlockingConnection(params)
    channel = connection.channel()
    queue_id = 'machine_' + str(machine_id)
    body = json.dumps({"task_id": task_id, "application_id": application_id})
    channel.basic_publish(exchange='', routing_key=queue_id, body=body)
    connection.close()

def push_unassigned_task(task_id, application_id):
    params = pika.URLParameters('amqp://testuser:testpassword@172.17.0.1:5672/test-vhost')
    connection = pika.BlockingConnection(params)
    channel = connection.channel()
    channel.queue_declare(queue='activate_computation_task')
    body = json.dumps({"task_id": task_id, "application_id": application_id})
    channel.basic_publish(exchange='', routing_key='activate_computation_task', body=body)
    connection.close()

def push_task_status(task_status, task_id, reason):
    params = pika.URLParameters('amqp://testuser:testpassword@172.17.0.1:5672/test-vhost')
    connection = pika.BlockingConnection(params)
    channel = connection.channel()
    channel.queue_declare(queue='queue_task_status')
    body = json.dumps({"task_status": task_status,"task_id": task_id, "reason": reason})
    channel.basic_publish(exchange='', routing_key='queue_task_status', body=body)
    connection.close()

def pop_machine_task(machine_id):
    params = pika.URLParameters('amqp://testuser:testpassword@172.17.0.1:5672/test-vhost')
    connection = pika.BlockingConnection(params)
    channel = connection.channel()
    queue_id = 'machine_' + str(machine_id)
    channel.queue_declare(queue=queue_id)
    method_frame, header_frame, body = channel.basic_get(queue_id)
    if method_frame:
        channel.basic_ack(method_frame.delivery_tag)
    connection.close()
    return body

def pop_unassigned_task():
    params = pika.URLParameters('amqp://testuser:testpassword@172.17.0.1:5672/test-vhost')
    connection = pika.BlockingConnection(params)
    channel = connection.channel()
    channel.queue_declare(queue='activate_computation_task')
    method_frame, header_frame, body = channel.basic_get('activate_computation_task')
    if method_frame:
        channel.basic_ack(method_frame.delivery_tag)
    connection.close()
    return body

def pop_taks_status():
    params = pika.URLParameters('amqp://testuser:testpassword@172.17.0.1:5672/test-vhost')
    connection = pika.BlockingConnection(params)
    channel = connection.channel()
    channel.queue_declare(queue='queue_task_status')
    method_frame, header_frame, body = channel.basic_get('queue_task_status')
    if method_frame:
        channel.basic_ack(method_frame.delivery_tag)
    connection.close()
    return body
