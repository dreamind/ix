#!/Users/dreamind/anaconda/bin/python
from lxml import etree
import cgitb;cgitb.enable()
import cgi
import locale
import time

# reading configuration file, languages.xml
# to find out supported languges and their information
tree = etree.parse('languages.xml')
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
  lang_tree = etree.parse(lang['trans-src'])
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
  return time.strftime('%A, %x ').decode(langs[current_lang]['locale-enc']).encode('utf-8')

# get formatted time
def get_time():
  return time.strftime('%X').decode(langs[current_lang]['locale-enc']).encode('utf-8')

# get a translation of a text
def get_trans(text):
  return langs[current_lang]['trans'][text].encode('utf-8')
  
_ = get_trans # a shorthand

# display the whole HTML page
def display_page():
  global current_lang
  print "Content-Type: text/html\n"    
  print '''
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head><meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<title>Multilingual sites demo</title>
</head>
'''
  print '<body>'  
  field_store = cgi.FieldStorage()
  if 'lang_button' in field_store:
    current_lang = field_store.getfirst('lang') 
    lang_setup()
    display_form()
  elif 'go_button' in field_store:
    current_lang = field_store.getfirst('lang') 
    name = field_store.getfirst('name') 
    lang_setup()
    display_response(name)
  else: # first invocation of the app
    current_lang = "English" # default
    lang_setup()
    display_form()    
  print '</body>'
  print '</html>'
  
# display the body for the page
def display_form():       
  print '<form method="get" action="">'
  print '<p>'
  print '<select name="lang">'
  for lang in langs:
    if lang == current_lang:
      print '<option value="%s" selected="selected">%s</option>' % (lang, lang)
    else:
      print '<option value="%s">%s</option>' % (lang, lang)
    
  print '</select>'
  print '<input type="submit" name="lang_button" value="Select languages"/>'       
  print '</p>'
    
  print '<p>'     
  print _('Please enter your name') 
  print '<input type="text" name="name" />'
  print '<input type="submit" name="go_button" value="Go!" />'
  print '</form>'
  print '</p>'

def display_response(name):
  print '<h1>' + _('Hello,') + ' ' + name + '</h1>'
  print '<h2>' 
  print _('Today is') + ' ' + get_date() + '.'
  print _('The time now is') + ' ' + get_time()
  print '</h2>' 

display_page()