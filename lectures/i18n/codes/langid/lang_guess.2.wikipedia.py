# -*- coding: utf-8 -*-
from nltk.corpus import udhr
from collections import defaultdict

import urlslurp

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
        chars_freq_rank[char] = rank+1
    return chars_freq_rank

def gen_sorted_cfd(cfd):
    sorted_cfd = sorted(cfd, key=cfd.get, reverse=True)
    return sorted_cfd

def gen_cfd(text):
    chars_freq_dist = defaultdict(int)
    for char in text:
        chars_freq_dist[char] += 1
    return chars_freq_dist

languages = [
    "English-Latin1",
    "Italian-Latin1",
    "German_Deutsch-Latin1",
    "Spanish-Latin1", 
    "Chinese_Mandarin-UTF8",
    "Ukrainian-UTF8" ]

cfd = {} # character frequency distribution
cfs = {} # sorted character based on frequency distribution
cfr = {} # character frequency distribution rankings

chars = set() # union of all top n characters
n = 50 # number of top n chars

for lang in languages:
    udhr_text = text_filter(udhr.raw(lang).lower())
    cfd[lang] = gen_cfd(udhr_text)
    cfs[lang] = gen_sorted_cfd(cfd[lang])
    cfr[lang] = gen_ranked_cfd(cfs[lang])
    top_n_chars = cfs[lang][:n]
    chars = chars.union(set(top_n_chars))

def guess(text):
    text = text_filter(text)
    mystery_cfd = gen_cfd(text.lower().strip())
    mystery_cfs = gen_sorted_cfd(mystery_cfd)
    mystery_cfr = gen_ranked_cfd(mystery_cfs)
    min_dist = 2**16
    min_lang = ""
    for lang in languages:
        dist = distance(mystery_cfr, cfr[lang], chars)   
        if dist < min_dist:
            min_dist = dist
            min_lang = lang
    return min_lang

urls = [
    'http://it.wikipedia.org/wiki/Monica_Bellucci'
    ,'http://es.wikipedia.org/wiki/Pen%C3%A9lope_Cruz'
    ,'http://uk.wikipedia.org/wiki/%D0%9A%D1%83%D1%80%D0%B8%D0%BB%D0%B5%D0%BD%D0%BA%D0%BE_%D0%9E%D0%BB%D1%8C%D0%B3%D0%B0_%D0%9A%D0%BE%D1%81%D1%82%D1%8F%D0%BD%D1%82%D0%B8%D0%BD%D1%96%D0%B2%D0%BD%D0%B0'
    ,'http://zh.wikipedia.org/wiki/%E7%AB%A0%E5%AD%90%E6%80%A1'
    ,'http://en.wikipedia.org/wiki/Megan_Fox' ]

urlslurp.setup(useragent='Gorilla/1.0') # faking a browser so that wikipedia lets us suck its pages

for url in urls:
    text = urlslurp.slurp(url)
    print guess(text),"<-",url



