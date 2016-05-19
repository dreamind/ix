from collections import defaultdict

languages = [
    "English-Latin1",
    "Italian-Latin1",
    "German_Deutsch-Latin1",
    "Spanish-Latin1",
    "Chinese_Mandarin-GB2312",
    "Ukrainian-UTF8" ]

from nltk.corpus import udhr

# Kendall tau distance
def distance(cfr1, cfr2, chars):
    total = 0
    for c1 in chars:
        for c2 in chars:
            if (c1 in cfr1) and (c2 in cfr1) and (c1 in cfr2) and (c2 in cfr2):
                if ((cfr1[c1] < cfr1[c2]) != (cfr2[c1] < cfr2[c2])):
                    total += 1
            else:
                total += 1
    return total

def text_filter(text):
    for ch in " \n\t\r.,:;[]()\\/\"0123456789~!`?@#$%^&*_-=-":
        text = text.replace(ch, "")
    return text

def gen_ranked_cfd(sorted_cfd):
    chars_freq_rank = defaultdict(int)
    for rank in range(len(sorted_cfd)):
        char = sorted_cfd[rank]
        chars_freq_rank[char] = rank + 1
    return chars_freq_rank

def gen_sorted_cfd(cfd):
    sorted_cfd = sorted(cfd, key=cfd.get, reverse=True)
    return sorted_cfd

def gen_cfd(text):
    chars_freq_dist = defaultdict(int)
    for char in text:
        chars_freq_dist[char] += 1
    return chars_freq_dist

def guess(text):
    text = text_filter(text)
    mystery_cfd = gen_cfd(text.lower().strip())
    mystery_cfs = gen_sorted_cfd(mystery_cfd)
    mystery_cfr = gen_ranked_cfd(mystery_cfs)
    min_dist = 2**16
    candidate_lang = ""
    stats = []
    for lang in languages:
        dist = distance(mystery_cfr, cfr[lang], chars)
        stats.append({ "lang": lang, "dist": dist })
        if dist < min_dist:
            min_dist = dist
            candidate_lang = lang
    return {
      "candidate": candidate_lang,
      "distance": min_dist,
      "stats": stats
    }

cfd = {} # character frequency distribution
cfs = {} # sorted character based on frequency distribution
cfr = {} # character frequency distribution rankings

chars = set() # union of all top n characters
n = 30 # number of top n chars

for lang in languages:
    udhr_text = text_filter(udhr.raw(lang).lower())
    cfd[lang] = gen_cfd(udhr_text)
    cfs[lang] = gen_sorted_cfd(cfd[lang])
    cfr[lang] = gen_ranked_cfd(cfs[lang])
    top_n_chars = cfs[lang][:n]
    chars = chars.union(set(top_n_chars))

import urllib2
from BeautifulSoup import BeautifulSoup, BeautifulStoneSoup

url = 'http://it.wikipedia.org/wiki/Monica_Bellucci'

def get_text(url):
    content = urllib2.urlopen(url)
    soup = BeautifulSoup(content, convertEntities=BeautifulStoneSoup.HTML_ENTITIES)
    body = soup.find('body')
    text = [t for p in body.findAll('p') for t in p.findAll(text=True)]
    return " ".join(text)

''' Flask application start here '''

import json
from flask import Flask, request
app = Flask(__name__, static_folder='.', static_url_path='')

@app.route("/guess", methods=['POST'])
def guess_handler():
  json_request = json.loads(request.data)
  url = json_request['url']
  text = get_text(url)
  body = json.dumps(guess(text))
  return body, 200, {'Content-Type': 'application/json'}

if __name__ == "__main__":
    app.run(debug=True, host='127.0.0.1', port=8765)
