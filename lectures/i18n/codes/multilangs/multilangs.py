from flask import Flask, request
import os

app = Flask(__name__, static_folder='.', static_url_path='')
path = os.path.abspath(os.path.dirname(__file__)) + '/'
from lxml import etree
import locale
import time

# reading configuration file, languages.xml
# to find out supported languges and their information
tree = etree.parse(path + 'languages-nix.xml')
root = tree.getroot()
langs = {}
current_lang = 'English' # use this a global, not a good practice
for e_lang in root:
  lang = {}
  lang['trans-src'] = e_lang.get('trans-src')
  lang['locale'] = e_lang.get('locale')
  lang['locale-enc'] = e_lang.get('locale-enc')
  lang['trans'] = {} # translation table
  langs[e_lang.text] = lang

# load a specific translation and populate translation dictionary
def lang_setup():
  global current_lang
  lang = langs[current_lang]
  lang_tree = etree.parse(path + lang['trans-src'])
  lang_def = lang_tree.getroot()
  trans = {}
  body = lang_def.find('file').find("body")
  for trans_unit in body.iterchildren(tag='trans-unit'):
    source = trans_unit.find('source').text
    target = trans_unit.find('target').text
    trans[source] = target
  lang['trans'] = trans
  locale.setlocale(locale.LC_ALL, lang['locale'])

# get formatted date
def get_date():
  return time.strftime('%A, %x ').decode(langs[current_lang]['locale-enc'])

# get formatted time
def get_time():
  return time.strftime('%X').decode(langs[current_lang]['locale-enc'])

# get a translation of a text
def get_trans(text):
  return langs[current_lang]['trans'][text]

_ = get_trans # a shorthand

# display the whole HTML page
def display_page():
  global current_lang
  str = '''
<!DOCTYPE html">
<html>
<head><meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<title>Multilingual sites demo</title>
</head>
'''
  str += '<body>'
  lang_btn = request.args.get('lang_button')
  go_btn = request.args.get('go_button')
  if lang_btn:
    current_lang = request.args.get('lang')
    lang_setup()
    str += display_form()
  elif go_btn:
    current_lang = request.args.get('lang')
    name = request.args.get('name')
    lang_setup()
    str += display_response(name)
  else: # first invocation of the app
    current_lang = "English" # default
    lang_setup()
    str += display_form()
  str += '</body>'
  str += '</html>'
  return str

# display the body for the page
def display_form():
  str = '<form method="get" action="">'
  str += '<p>'
  str += '<select name="lang">'
  for lang in langs:
    if lang == current_lang:
      str += '<option value="%s" selected="selected">%s</option>' % (lang, lang)
    else:
      str += '<option value="%s">%s</option>' % (lang, lang)

  str += '</select>'
  str += '<input type="submit" name="lang_button" value="Select languages"/>'
  str += '</p>'

  str += '<p>'
  str += _('Please enter your name')
  str += '<input type="text" name="name" />'
  str += '<input type="submit" name="go_button" value="Go!" />'
  str += '</form>'
  str += '</p>'
  return str

def display_response(name):
  str = '<h1>' + _('Hello,') + ' ' + name + '</h1>'
  str += '<h2>'
  str += _('Today is') + ' ' + get_date() + '.'
  str += _('The time now is') + ' ' + get_time()
  str += '</h2>'
  return str

@app.route("/demo-multilang")
def root():
    return display_page()

if __name__ == "__main__":
    app.run(debug=True)