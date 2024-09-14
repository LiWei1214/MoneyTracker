from flask import Flask
from flask_socketio import SocketIO, emit
import json
import sqlite3
db = sqlite3.connect('userData.sqlite')

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@socketio.on('connect', namespace='/login')
def handle_connect_account():
    print("Connected to /login")

@socketio.on('client_connected', namespace="/login")
def handle_client_connected_account(data):
    print('Connection Status: {}'.format(data['connected']))

@socketio.on('client_send', namespace='/login')
def handle_client_send_account(username, password):
    cursor = db.cursor()
    user = cursor.execute("SELECT email FROM users WHERE email=?", [username])
    if user == password:
        emit('server_send', json.dumps({
            'stateCheck': True
        }), namespace='/login')
    else:
        emit('server_send', json.dumps({
            'stateCheck': False
        }), namespace='/login')

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug='true')