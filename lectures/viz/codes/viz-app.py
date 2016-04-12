import os
from flask import Flask, request
app = Flask(__name__, static_folder='.', static_url_path='')

import matplotlib
matplotlib.use('Agg')

import matplotlib.pyplot as plt
# from pylab import *

filename = 'output.png'

def make_viz():
  N = 3 # 3, 5, 7, 9, try odd numbers
  w = 243
  A = [[0] * w for i in range(w)]
  I = A

  # int first row and first column
  for i in range(w):
      A[0][i] = 1
      A[i][0] = 1

  for i in range(1,w):
      for j in range(1,w):
          A[i][j] = (A[i-1][j]+A[i][j-1]+A[i-1][j-1]) % N

  for i in range(w):
      for j in range(w):
          if A[i][j] == 0: I[i][j] = 1
          else: I[i][j] = 0

  plt.axis('off')
  plt.imshow(I, cmap=plt.cm.gray, interpolation='nearest')
  plt.savefig(filename, dpi=50)

html = '''
<!doctype html>
<html>
<body>
%s
</body>
</html>
'''

@app.route('/viz-app', methods=['GET'])
def handler():
  make_viz()
  is_html = request.args.get('html')
  if is_html:
    body = html % ('<img src="%s" />' % filename)
    return body, 200, {'Content-Type': 'text/html'}
  binary = open(filename).read()
  return binary, 200, {'Content-Type': 'image/png'}

if __name__ == "__main__":
    app.run(debug=True, host='127.0.0.1')