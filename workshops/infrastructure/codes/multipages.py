from flask import Flask
app = Flask(__name__, static_folder='.', static_url_path='')
import os
path = os.path.abspath(os.path.dirname(__file__)) + '/'

@app.route("/")
def root():
    return '''
    <html><body>
    <a href="/page1">page 1</a><br />
    <a href="/page2">page 2</a>
    </body></html>
    ''', 200, {'Content-Type': 'text/html'}

@app.route("/page1")
def page1():
    return 'Page1', 200, {'Content-Type': 'text/plain'}

@app.route("/page2")
def page2():
    return open(path + '/page2.html').read(), 200, {'Content-Type': 'text/html'}

if __name__ == "__main__":
    app.run(debug=True)


