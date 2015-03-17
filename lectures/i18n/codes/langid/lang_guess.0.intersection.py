# -*- coding: utf-8 -*-
from nltk.corpus import udhr
from collections import defaultdict

def similarity(cfs1, cfs2, n):
    set1 = set(cfs1[:n])
    set2 = set(cfs2[:n])
    result = set1.intersection(set2)
    return len(result)

def text_filter(text):
    for ch in " \n\t\r.,:;[]()\\/\"0123456789~!`?@#$%^&*_-=-":
        text = text.replace(ch, "")
    return text

def gen_sorted_cfd(cfd):
    sorted_cfd = sorted(cfd, key=cfd.get, reverse=True)
    return sorted_cfd

def gen_cfd(text):
    chars_freq_dist = defaultdict(int)
    for char in text:
        chars_freq_dist[char] += 1
    return chars_freq_dist

languages = [
    "Italian-Latin1",
    "English-Latin1",
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
    top_n_chars = cfs[lang][:n]
    print top_n_chars
    chars = chars.union(set(top_n_chars))

def guess(text):
    text = text_filter(text)
    mystery_cfd = gen_cfd(text.lower().strip())
    mystery_cfs = gen_sorted_cfd(mystery_cfd)
    max_similar = 0
    max_lang = ""
    print mystery_cfs[:n]
    for lang in languages:
        sim = similarity(mystery_cfs, cfs[lang],n)   
        print lang, sim
        if sim > max_similar:
            max_similar = sim
            max_lang = lang
    print "The language detected is:", max_lang

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
, 作 为 所 有 人 民 和 所 有 国 家 努 力 实 现 的 共 同 标 准, 以 期 每 
一 个 人 和 社 会 机 构 经 常 铭 念 本 宣 言, 努 力 通 过 教 诲 和 教 育 
促 进 对 权 利 和 自 由 的 尊 重, 并 通 过 国 家 的 和 国 际 的 渐
进 措 施, 使 这 些 权 利 和 自 由 在 各 会 员 国 本 身 人 民 及 在 其 
管 辖 下 领 土 的 人 民 中 得 到 普
遍 和 有 效 的 承 认 和 遵 行"""

guess(spanish_text)



