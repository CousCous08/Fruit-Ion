#skeleton flask backend
from flask import Flask, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

#example function
@app.route('/api/data')
def data():
    return jsonify({'message': 'Hello from Flask!'})

if __name__ == '__main__':
    app.run()