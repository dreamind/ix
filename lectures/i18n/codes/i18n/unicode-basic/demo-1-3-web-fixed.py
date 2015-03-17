# Serve this file, print the xml content as HTML list

from lxml import etree
import sys


tree = etree.parse( "demo-1.xml" )
root = tree.getroot()

print "Content-Type: text/html\n"
print '''<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <title>Unicode demo</title>
</head>
<body>
''' # specify the web page is in UTF-8, so that the browser can interpret correctly

print '<ul>'
for sentence in root:    
    unicode_text = sentence.text # lxml's etree gives you Unicode string
    byte_text = unicode_text.encode( 'utf-8' ) # convert using utf-8 encoding
    print '<li>', byte_text , '</li>' # print byte string 
print '</ul>'

print '''<body>
<html>'''