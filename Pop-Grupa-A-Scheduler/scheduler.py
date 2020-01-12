import pika, os, time


url = os.environ.get('CLOUDAMQP_URL', 'amqp://rabbitmq:rabbitmq@172.18.0.6:5672/%2f')
params = pika.URLParameters(url)
#params.socket_timeout = 5

connection = pika.BlockingConnection(params) # Connect to CloudAMQP
channel = connection.channel() # start a channel
channel.queue_declare(queue='scheduling2', durable=True)

print(' [*] Waiting for messages. To exit press CTRL+C')

def callback(ch, method, properties, body):
    print(" [x] Received %r" % body)
    time.sleep(body.count(b'.'))
    print(" [x] Done")
    ch.basic_ack(delivery_tag=method.delivery_tag)


channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='scheduling2', on_message_callback=callback)

channel.start_consuming()
