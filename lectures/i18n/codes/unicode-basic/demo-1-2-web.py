from flask import Flask
app = Flask(__name__, static_folder='.', static_url_path='')

from lxml import etree
import sys

def gen_html():

    tree = etree.parse( "demo-1.xml" )
    root = tree.getroot()

    str = '''<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8">
        <title>Unicode demo</title>
    </head>
    <body>
    ''' # specify the web page is in UTF-8, so that the browser can interpret correctly

    str += '<ul>'
    for sentence in root:
        str += '<li>' + sentence.text + '</li>' # attempt to print Unicode string directly
    str += '</ul>'

    str += '''<body>
    <html>'''
    return str

@app.route("/demo-unicode")
def root():
    return gen_html()

if __name__ == "__main__":
    app.run(debug=True)