from flask import Flask
app = Flask(__name__, static_folder='.', static_url_path='')
'''
Run only in Windows machine

'''
import locale
import os
import sys
import time
import cgitb; cgitb.enable()

def gen_html():
	str = '''<html>
	<head><meta http-equiv="content-type" content="text/html; charset=UTF-8" /></head>
	<body>
	'''
	# the list of locale tuples
	# each tupple contains a title, locale name, and the encoding it uses
	sample_locales = [
		('France', 'French_France.1252', 'cp1252'),
		('USA', 'English_US.1252', 'cp1252'),
		('Australia', 'English_Australia.1252', 'cp1252'),
		('German', 'German_Germany.1252', 'cp1252' ),
		('Chinese Taiwan', 'Chinese_Taiwan.950', 'cp950' ),
		('Chinese PRC', "Chinese_People's Republic of China.936", 'cp936' ),
		('Japanese', 'Japanese_Japan.932', 'cp932' )
	]

	for title, loc, enc in sample_locales:
		locale_str = locale.setlocale(locale.LC_ALL, loc)

		currency_string = locale.currency(1234.56) # byte string
		date_string = time.strftime('%X %x %A')

		# print as utf-8 encoded to utf-8 console
		str += "<p>Locale set in %s: %s, %s</p>" % \
			(title, \
			currency_string.decode(enc).encode('utf-8'), \
			date_string.decode(enc).encode('utf-8'))

	str += '''</body></html>'''

@app.route("/demo-locale")
def root():
    return gen_html()

if __name__ == "__main__":
    app.run(debug=True)