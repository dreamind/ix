from flask import Flask
app = Flask(__name__, static_folder='.', static_url_path='')

@app.route("/")
def root():
    return 'Hello World!'

if __name__ == "__main__":
    app.run(debug=True, host='127.0.0.1', port=80)


