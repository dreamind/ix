# -*- coding: utf-8 -*-
''' put the line above, if you want to put some Unicode text '''

# Q: How to put some non-English text in your code?
# A: Use u prefix to indicate that you use Unicode string 
#    Some spanish text as Unicode string:

spanish_text = u'''Proclama
la presente Declaración Universal de Derechos Humanos como ideal común
por el que todos los pueblos y naciones deben esforzarse, a fin de que
tanto los individuos como las instituciones, inspirándose
constantemente en ella, promuevan, mediante la enseñanza y la
educación, el respeto a estos derechos y libertades, y aseguren, por
medidas progresivas de carácter nacional e internacional, su
reconocimiento y aplicación universales y efectivos, tanto entre los
pueblos de los Estados Miembros como entre los de los territorios
colocados bajo su jurisdicción. '''

chinese_text = u'''因 此 现 在, 大 会, 发 布 这 一 世 界 人 权 宣 言'''

# Q: Does NTLK give you Unicode string ?
# A: Yes

from nltk.corpus import udhr

udhr_in_spanish = udhr.raw("Spanish-Latin1").lower()
print type(udhr_in_spanish) # print the data type, should give you 'unicode'
print udhr_in_spanish[:20].encode('utf-8') # print the first 20 letters, must encode appropriately

# Q: How can we extract text from web page ?
# A: Use the following library
import urlslurp

# get a Spanish poem by Federico García Lorca
text = urlslurp.slurp('http://users.fulladsl.be/spb1667/cultural/lorca/llanto_por_ignacio_sanchez_mejias/la_cogida_y_la_muerte.html')
print type(text)
print text[:100].encode('utf-8') # print the first 100 letters, must encode appropriately


