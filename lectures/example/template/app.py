from flask import Flask, render_template
app = Flask(__name__, static_folder='.', static_url_path='')
import json

@app.route('/display/')
@app.route('/display/<name>')
def display(name='ivo'):
    return render_template('person.html', data=json.load(open(name + '.json')))

if __name__ == "__main__":
    app.run(debug=True, host='127.0.0.1', port=8768)