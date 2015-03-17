import urllib2
from BeautifulSoup import BeautifulSoup, BeautifulStoneSoup

def setup(**kwargs):
    if "proxy" in kwargs:
        proxy_handler = urllib2.ProxyHandler({"http":kwargs["proxy"]})
        opener = urllib2.build_opener(proxy_handler)
    else:    
        opener = urllib2.build_opener()
    if "useragent" in kwargs:
        opener.addheaders = [('User-Agent', kwargs["useragent"])]
    urllib2.install_opener( opener )
 
def slurp(url,**kwargs):
    response = urllib2.urlopen(url)
    # Thank God, BeautifulSoup gives us Unicode string
    soup = BeautifulSoup(response, convertEntities=BeautifulStoneSoup.HTML_ENTITIES) 
    if "id" in kwargs:        
        block = soup.find(id=kwargs["id"])        
        text = u''
        for p in block.findAll('p'):
            for t in p.findAll(text=True):
                text += t
        return text
    else:
        block = soup.find('body')        
        text = u''
        for p in block.findAll('p'):
            for t in p.findAll(text=True):
                text += t
        return text

setup(useragent='Gorilla/1.0') # default useragent

if __name__ == "__main__" or __name__ == "__builtin__" :
    setup(useragent='Gorilla/1.0')
    url = 'http://it.wikipedia.org/wiki/Monica_Bellucci'
    url = 'http://zh.wikipedia.org/wiki/%E7%AB%A0%E5%AD%90%E6%80%A1'
    text = slurp(url)
    print type(text)
    print text[:100]
