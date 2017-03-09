from flask import Flask
app = Flask(__name__, static_folder='images', static_url_path='/img')

if __name__ == "__main__":
    app.run(debug=True)


