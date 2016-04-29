from PIL import Image, ImageOps
from urllib2 import urlopen, Request

def gen_palette(r, g, b):
  return reduce(lambda palette, i: palette + [r*i/255, g*i/255, b*i/255], range(255), [])

def read_image_url(url):
  user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36' # spoof the agent, pretend to be browser
  headers = {
    'User-Agent': user_agent,
    'Referer': 'https://berniesanders.com/'
  }
  req = Request(url, None, headers)
  return urlopen(req)

# try this url without headers
url = 'https://berniesanders.com/wp-content/uploads/2015/05/bernie-sanders-portrait-02-1056x1280.jpg'
# try this one, too
# url = 'http://about.unimelb.edu.au/__data/assets/image/0011/731873/Banner.jpg'

def tint_image(url):
  im = Image.open(read_image_url(url))
  im = im.convert("L")
  palette = gen_palette(240, 240, 0)
  im.putpalette(palette) # putpalette expects [r,g,b,r,g,b,...]
  im = im.convert("RGB")
  im.save("output.jpg")

if __name__ == "__main__": # run through console, not imported as module
  tint_image(url)