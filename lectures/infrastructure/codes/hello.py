from flask import Flask
app = Flask(__name__, static_folder='.', static_url_path='')

@app.route("/")
def f():
    return 'Hello From the Top'
    
@app.route("/hello")
def root():
    return 'Hello World!'

if __name__ == "__main__":
    app.run(debug=True)


