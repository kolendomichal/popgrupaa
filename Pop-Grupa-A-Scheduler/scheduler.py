import pika, os, time
from app.helper import fetchMachines
from app.roundRobin import applyRoundRobinAlgorithm, prepareDict

params = pika.URLParameters(os.environ.get('RABBIT_URL'))
#params.socket_timeout = 5

connection = pika.BlockingConnection(params) # Connect to CloudAMQP
channel = connection.channel() # start a channel
channel.queue_declare(queue='scheduling2', durable=True)


#Przykładowe wywołanie pod algorytm round robin, machines to aktualizowany słownik maszyn z licznikami ile zadań dostały
machines = prepareDict(fetchMachines())

#Nowe zadanie pobrano z kolejki, tu o id = 1
task_id = 1
choosenMachine, machines = applyRoundRobinAlgorithm(machines)
#Wstaw do kolejki 'queue' + choosenMachine zadanie 'task_id' (?)


print(' [*] Waiting for messages. To exit press CTRL+C')

def callback(ch, method, properties, body):
    print(" [x] Received %r" % body)
    time.sleep(body.count(b'.'))
    print(" [x] Done")
    ch.basic_ack(delivery_tag=method.delivery_tag)


channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='scheduling2', on_message_callback=callback)

channel.start_consuming()
