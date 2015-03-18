# natural language processing toolkit
import nltk

# visualization toolkit
import matplotlib
matplotlib.use("Agg") # for output to png file
from pylab import clf, savefig

from nltk.corpus import inaugural
clf()
cfd = nltk.ConditionalFreqDist((target, fileid[:4]) for fileid in inaugural.fileids() for w in inaugural.words(fileid) for target in ['america', 'war'] if w.lower().startswith(target))
cfd.plot()
savefig("inaugural.png", dpi=120)

