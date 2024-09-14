# from flask import Flask
# from flask_socketio import SocketIO, emit
# import json
# import sqlite3
# import re

# EMAIL_REGEX = re.compile(r"[^@]+@[^@]+\.[^@]+")

# db = sqlite3.connect('userData.sqlite')

# app = Flask(__name__)
# app.config['SECRET_KEY'] = 'secret!'
# socketio = SocketIO(app)

# @socketio.on('connect', namespace='/register')
# def handle_connect_account():
#     print("Connected to /register")

# @socketio.on('client_connected', namespace="/register")
# def handle_client_connected_account(data):
#     print('Connection Status: {}'.format(data['connected']))

# @socketio.on('client_send', namespace='/register')
# def handle_client_send_account(email, username, password):
#     cursor = db.cursor()
#     user = cursor.execute("SELECT accountname FROM users")
#     check_email = cursor.execute("SELECT email from users")
#     if not EMAIL_REGEX.match(email) or email == check_email:
#         emit('server_send', json.dumps({
#             'accountCreate': "Email format incorrect"
#         }), namespace='/register')
#     elif user == username:
#         emit('server_send', json.dumps({
#             'accountCreate': "User exist"
#         }), namespace='/register')
#     elif user!=username and EMAIL_REGEX.match(email) and email != check_email:
#         cursor.execute('''INSERT INTO users(accountname, accountpass, email) VALUES (?,?,?)''', [username, password, email])
#         emit('server_send', json.dumps({
#             'accountCreate': "Account created"
#         }), namespace="/register")

# if __name__ == '__main__':
#     socketio.run(app, host='0.0.0.0', port=5000, debug='true')

from flask import Flask
from flask_socketio import SocketIO, emit
import json
import sqlite3
import re

EMAIL_REGEX = re.compile(r"[^@]+@[^@]+\.[^@]+")

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

def get_db_connection():
    # Create a new database connection for each request
    return sqlite3.connect('userData.sqlite')

@socketio.on('connect', namespace='/register')
def handle_connect_account():
    print("Connected to /register")

@socketio.on('client_connected', namespace="/register")
def handle_client_connected_account(data):
    print('Connection Status: {}'.format(data['connected']))

def create_userDetails_table():
    db = sqlite3.connect('userData.sqlite')
    cursor = db.cursor()

    cursor.execute('''CREATE TABLE IF NOT EXISTS userDetails(
           id INTEGER PRIMARY KEY,
           accountname text NOT NULL,
           accountpass text NOT NULL,
           email text NOT NULL)
           ''')

    db.commit()
    db.close()

@socketio.on('client_send', namespace='/register')
def handle_client_send_account(email, username, password):
    db = get_db_connection()  # Get a fresh DB connection
    cursor = db.cursor()
    
    # Check if email and username already exist in the database
    cursor.execute("SELECT accountname, email FROM userDetails WHERE accountname = ? OR email = ?", (username, email))
    user = cursor.fetchone()

    if not EMAIL_REGEX.match(email):
        emit('server_send', json.dumps({
            'accountCreate': "Email format incorrect"
        }))
    elif user:
        if user[0] == username:
            emit('server_send', json.dumps({
                'accountCreate': "User already exists"
            }))
        elif user[1] == email:
            emit('server_send', json.dumps({
                'accountCreate': "Email already exists"
            }))
    else:
        # Insert the new user into the database
        cursor.execute('''INSERT INTO userDetails(accountname, accountpass, email) VALUES (?, ?, ?)''', (username, password, email))
        db.commit()  # Don't forget to commit changes!
        emit('server_send', json.dumps({
            'accountCreate': "Account created"
        }))

    db.close()  # Always close the connection after operation

@socketio.on('client_login', namespace='/login')
def handle_client_send_account(username, password):
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute("SELECT accountpass FROM userDetails WHERE email=?", [username])
    user = cursor.fetchone()
    if user[0] == password:
        emit('server_send', json.dumps({
            'stateCheck': True
        }))
    else:
        emit('server_send', json.dumps({
            'stateCheck': False
        }))

@socketio.on('client_get_account_info', namespace='/account_details')
def handle_client_get_account_info(email):
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute("SELECT accountname, email FROM userDetails WHERE email=?", [email])
    user = cursor.fetchone()
    if (user):
        emit('server_send', json.dumps({
            'username': user[0],
            'email': user[1],
        }))

if __name__ == '__main__':
    create_userDetails_table()
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
