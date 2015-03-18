# Serve this file, print the xml content as HTML list

from lxml import etree
import sys


tree = etree.parse( "demo-1.xml" )
root = tree.getroot()

print "Content-Type: text/html\n"
print '''<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>Unicode demo</title>
</head>
<body>
''' # specify the web page is in UTF-8, so that the browser can interpret correctly

print '<ul>'
for sentence in root:
    print '<li>', sentence.text, '</li>' # attempt to print Unicode string directly
print '</ul>'

#  Traceback (most recent call last): File "/home/.../unicode2/demo.1.1.web.py", line 21, in  print '
# ', sentence.text, '
# UnicodeEncodeError: 'ascii' codec can't encode characters in position 0-2: ordinal not in range(128) 

# This script will generate UnicodeEncodeError
# because Python tries to convert Unicode string into byte string using default encoding (ascii)
# Unfortunately, ascii encoding can only contain values between 0-127.

print '''<body>
<html>'''