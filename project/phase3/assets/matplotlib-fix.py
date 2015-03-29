# --- fix to IVLE's problem in using matplotlib
import os, sys
os.dup2(2, 3)
stderr = os.fdopen(2, 'a')
stderr.close()
# ---
import matplotlib
matplotlib.use('Agg')
from pylab import *
# --- fix to IVLE's problem in using matplotlib
os.dup2(3, 2)
sys.__stderr__ = sys.stderr = os.fdopen(2, 'a')
# ---

clf() # clear the figure
plot([1,2,1,2,1,2]) # a plot of a list of numbers
savefig( "simple.png", dpi=50 ) # save to a PNG file

# generate HTML to display the image
print 'Content-Type: text/html\n'
print '''<html><body>
<img src="simple.png" />
<body></html>'''
