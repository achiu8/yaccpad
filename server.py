import os
import logging
import redis
import gevent
import ast
from flask import Flask, render_template
from flask_sockets import Sockets

REDIS_URL = os.environ['REDIS_URL']
REDIS_CHAN = 'server'

app = Flask(__name__, template_folder='build', static_folder='build/static')
app.debug = 'DEBUG' in os.environ

sockets = Sockets(app)
redis = redis.from_url(REDIS_URL)

class Manager(object):
    def __init__(self):
        self.clients = list()
        self.pubsub = redis.pubsub()
        self.pubsub.subscribe(REDIS_CHAN)
        self.last_message = ''

    def __iter_data(self):
        for message in self.pubsub.listen():
            raw_data = message.get('data')
            if message['type'] == 'message':
                data = ast.literal_eval(raw_data)
                app.logger.info('Sending message: {}'.format(data))
                self.last_message = data['message']
                yield data

    def register(self, client):
        self.clients.append(client)

    def send(self, client, data):
        try:
            client.send(data)
        except Exception:
            self.clients.remove(client)

    def send_last(self, client):
        self.send(client, self.last_message)

    def run(self):
        for data in self.__iter_data():
            for client in self.clients:
                if hash(client) != data['from']:
                    gevent.spawn(self.send, client, data['message'])
    
    def start(self):
        gevent.spawn(self.run)

manager = Manager()
manager.start()

@app.route('/')
def root():
    return render_template('index.html')

@sockets.route('/submit')
def submit(ws):
    while not ws.closed:
        gevent.sleep(0.1)
        message = ws.receive()

        if message:
            data = {'from': hash(ws), 'message': message}
            app.logger.info('Inserting message: {}'.format(data))
            redis.publish(REDIS_CHAN, data)

@sockets.route('/receive')
def receive(ws):
    manager.register(ws)
    manager.send_last(ws)

    while not ws.closed:
        gevent.sleep(0.1)
