from flask import Flask, request
import json
from urllib import urlopen

app = Flask(__name__, static_folder='.', static_url_path='')

html = '''
<!doctype html>
<html>
<body>
%s
</body>
</html>
'''

@app.route("/show-book", methods=['GET'])
def root():
  json_file = request.args.get('json_file')
  book = json.load(open(json_file))
  str = '<ul>'
  for key, value in book.iteritems():
    str += '<li><b>' + key.capitalize() + '</b>: ' + value + '</li>'
  str += '</ul>'
  return html % (str)

if __name__ == "__main__":
    app.run(debug=True)
