import os
root = os.path.abspath(os.path.dirname(__file__)) + '/'

from flask import Flask, request
app = Flask(__name__, static_folder='.', static_url_path='')

@app.route('/handler', methods=['POST', 'GET'])
def handler():
  body = '''Name: %s
Gender: %s
Interests: %s
Car: %s
Description: %s
'''

  if request.method == 'POST':
    name = request.form['name']
    gender = request.form['gender']
    interests = request.form.getlist('interests')
    car = request.form['car']
    description = request.form['description']
  else:
    name = request.args.get('name')
    gender = request.args.get('gender')
    interests = request.args.getlist('interests')
    car = request.args.get('car')
    description = request.args.get('description')
    
  body = body % (name, gender, interests, car, description)
  return body, 200, {'Content-Type': 'text/plain'}
        
if __name__ == "__main__":
    app.run(debug=True)
