# natural language processing toolkit
import nltk
from nltk.corpus import gutenberg

# visualization toolkit
import matplotlib
matplotlib.use("Agg") # for output to png file
from pylab import clf, savefig

clf()
nltk.draw.dispersion_plot(nltk.word_tokenize(gutenberg.raw('bible-kjv.txt')), ["lust", "kill", "anger", "love"])
savefig("bible.png", dpi=120)

