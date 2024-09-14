from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# In-memory user store (for demonstration purposes)
users = {}

# Signup route
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if email in users:
        return jsonify({'message': 'User already exists'}), 400

    users[email] = {'email': email, 'password': password}
    return jsonify({'message': 'Signup successful', 'user': users[email]}), 201

# Login route
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = users.get(email)
    if not user or user['password'] != password:
        return jsonify({'message': 'Invalid credentials'}), 401

    return jsonify({'message': 'Login successful', 'user': user}), 200

if __name__ == '__main__':
    app.run(debug=True)
