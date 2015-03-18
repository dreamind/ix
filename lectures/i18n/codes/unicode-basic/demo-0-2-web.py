# Serve this file
# Demonstrate Unicode error

import sys

file = open( "demo-0.txt" )
line1 = file.readline().strip()

print "Content-Type: text/html\n"
print '''<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>Unicode demo</title>
</head>
<body>
''' # specify the web page is in UTF-8, so that the browser can interpret correctly

print '<p>'
print line1  # print normal python byte string
print '</p>'

print '''<body>
<html>'''
