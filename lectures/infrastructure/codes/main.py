import time

from flask import Flask
app = Flask(__name__, static_folder='images', static_url_path='/img')

html = '''
<!doctype html>
<html>
<body>
<img src="img/flask.png" />
<p>Current time: %s</p>
</body>
</html>
'''

@app.route("/")
def root():
    return 'Hello World!'

@app.route("/main")
def main():
    return html % time.strftime("%Y-%m-%d %H:%M:%S")
    
if __name__ == "__main__":
    app.run(debug=True)
