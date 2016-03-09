import os
root = os.path.abspath(os.path.dirname(__file__)) + '/'

from flask import Flask, request
app = Flask(__name__, static_folder='.', static_url_path='')

@app.route('/handler', methods=['POST'])
def handler():
  body = ''
  if request.method == 'POST':
    number_raw = request.form['number']
    try:
      number = float(number_raw)
      body = 'Input is a number'
    except ValueError:
      body = 'Input is NOT a number'
  return body, 200, {'Content-Type': 'text/plain'}

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
