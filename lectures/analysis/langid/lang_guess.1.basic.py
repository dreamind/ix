# -*- coding: utf-8 -*-
from nltk.corpus import udhr
from collections import defaultdict

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
n = 30 # number of top n chars

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

english_text = u"""The Kendall tau distance is a metric that counts the number of
pairwise disagreements between two lists. The larger the distance,
the more dissimilar the two lists are. Kendall tau distance is also
called bubble-sort distance since it is equivalent to the number of
swaps that the bubble sort algorithm would make to place one list in
the same order as the other list. The Kendall tau distance was
created by Maurice Kendall."""

spanish_text = u"""Proclama
la presente Declaración Universal de Derechos Humanos como ideal común
por el que todos los pueblos y naciones deben esforzarse, a fin de que
tanto los individuos como las instituciones, inspirándose
constantemente en ella, promuevan, mediante la enseñanza y la
educación, el respeto a estos derechos y libertades, y aseguren, por
medidas progresivas de carácter nacional e internacional, su
reconocimiento y aplicación universales y efectivos, tanto entre los
pueblos de los Estados Miembros como entre los de los territorios
colocados bajo su jurisdicción. """

chinese_text = u"""因 此 现 在, 大 会, 发 布 这 一 世 界 人 权 宣 言
, 作 为 所 有 人 民 和 所 有 国 家 努 力 实 现 的 共 同 标 准, 以 期 每 一 个 人 和 社 会 机 构 经 常 铭
念 本 宣 言, 努 力 通 过 教 诲 和 教 育 促 进 对 权 利 和 自 由 的 尊 重, 并 通 过 国 家 的 和 国 际 的 渐
进 措 施, 使 这 些 权 利 和 自 由 在 各 会 员 国 本 身 人 民 及 在 其 管 辖 下 领 土 的 人 民 中 得 到 普
遍 和 有 效 的 承 认 和 遵 行"""

dante_text = u"""Nel mezzo del cammin di nostra vita
mi ritrovai per una selva oscura
che la diritta via era smarrita.
Ahi quanto a dir qual era e cosa dura
esta selva selvaggia e aspra e forte
che nel pensier rinova la paura!
Tant'e amara che poco e piu morte;
ma per trattar del ben ch'i' vi trovai,
diro de l'altre cose ch'i' v'ho scorte.
Io non so ben ridir com'i' v'intrai,
tant'era pien di sonno a quel punto
che la verace via abbandonai."""


print guess(english_text)
print guess(spanish_text)
print guess(chinese_text)
print guess(dante_text)



