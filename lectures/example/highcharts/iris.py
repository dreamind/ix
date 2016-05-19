from flask import Flask
app = Flask(__name__, static_folder='.', static_url_path='')

import re
import csv
import json

@app.route("/iris.json")
def iris():
  data = csv.DictReader(open('iris.csv'))
  obj = map(lambda row: { key.strip(): float(value) if re.match(r"^[-+]?\d*\.?\d+([eE][-+]?\d+)?$", value) else value for key, value in row.iteritems() }, data)
  body = json.dumps(obj)
  return body, 200, {'Content-Type': 'application/json'}

if __name__ == "__main__":
    app.run(debug=True, host='127.0.0.1', port=8767)