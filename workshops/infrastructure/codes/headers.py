import json
from flask import Flask, request
app = Flask(__name__, static_folder='.', static_url_path='')

@app.route("/")
def root():
    return json.dumps(dict(request.headers)), 200, {'Content-Type': 'application/json'}

if __name__ == "__main__":
    app.run(debug=True, host='127.0.0.1', port=80)
