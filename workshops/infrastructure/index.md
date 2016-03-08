Workshop - The Mechanics of the Web
=========================

This workshop introduces students to infrastructure concepts that underpin the use of the Internet for informatics and data processing. Specifically we will be looking at the Hypertext Transfer Protocol (HTTP), Web Application Framework (using Flask) and briefly Hypertext Markup Language (HTML). These three areas are fundamental to understanding the mechanics of information transfer across networks, and are therefore an essential platform to building knowledge in informatics.

## Hyper-Text Transfer Protocol (HTTP)

Open up Putty (Windows button then put `putty` into the search box).
Configure the screen as shown in figure 1.

<img src="images/image001.png">

*Figure 1*: The configuration screen for Putty. Put in the hostname `www.unimelb.edu.au`, port `80`, connection type `Raw`, Close window on exit `Never`.

Open Notepad and write the following HTTP request information as shown in figure 2.

<img src="images/image002.png">

*Figure 2*: HTTP text to copy into the Putty window

As the webpage returned will likely be large, you may need to set the scrollable size by editing the Lines of Scrollback to `20000` under the Window section, as shown in figure 3.

<img src="images/image003.png">

*Figure 3*: Configuring the scroll size of the Putty window

\\{div class="exercise"

#### Exercise 1

Open a terminal using Putty as described above and connect to `www.unimelb.edu.au` by copying and pasting the commands from Notepad into the terminal window and pressing return twice. Look at the output that is returned.

1. Where does the response information start?
2. What server engine is hosting this site?
3. What HTTP code has been returned?
4. Try again with the input `GET /test.html HTTP/1.1` on the first line. What code is returned this time?

\\}

## Flask Web App and HTML

Flask allows you to develop a web application, which is basically a service that can reponse to user interactively via web browser. In this case, you will launch Flask as a web server in your computer that runs through port 80.

Follow the recipe below, to create a simple web application using Flask. First,
create a file called [`hello.py`](codes/hello.py) that contains the following code:

    from flask import Flask
    app = Flask(__name__, static_folder='.', static_url_path='')

    @app.route("/")
    def root():
        return 'Hello World!'

    if __name__ == "__main__":
        app.run(debug=True, host='0.0.0.0', port=80)

Run the application using the following command:

    C:\> python hello.py

If there is an issue in locating the Python executable (`python.exe`), you may want to use the complete path for the installed Python:

    C:\> C:\Anaconda2\python hello.py

Once you invoke the command, you should see something like:

    * Running on http://0.0.0.0:80/ (Press CTRL+C to quit)
    * Restarting with stat
    * Debugger is active!

THe URL of your local web server contains the IP address of your computer, which is 0.0.0.0 or 127.0.0.1. Alternatively you can use `localhost`. Launch a browser and put http://0.0.0.0/ in the address bar, you should see your
first Hello World Flask application.

\\{div class="exercise"

#### Exercise 2

Save as hello.py and modify the application to print the current time (use [strftime](https://docs.python.org/2/library/time.html#time.strftime) from time module).

\\}

Note that the following exercise touches briefly on HTML just to understand what is being communicated across the network using HTTP. The in-depth exploration of HTML will be covered in another workshop.

\\{div class="exercise"

#### Exercise 3

Write a Python script that rewrites the data inside `book.xml` (download [here](assets/book.xml)) as a web page (HTML). Use an HTML table to format the data. See the following example below.

<table border="0" cellpadding="5" cellspacing="1">
<tr bgcolor="#CCCC99"><td><b>Author</b></td><td>Salinger, J. D.</td></tr>
<tr bgcolor="#CCCC99"><td><b>Title</b></td><td>The Catcher in the Rye</td></tr>
<tr bgcolor="#CCCC99"><td><b>Language</b></td><td>English</td></tr>
<tr bgcolor="#CCCC99"><td><b>Publish_date</b></td><td>1951-07-16</td></tr>
<tr bgcolor="#CCCC99"><td><b>Publisher</b></td><td>Little, Brown and Company</td></tr>
<tr bgcolor="#CCCC99"><td><b>Isbn</b></td><td>0-316-76953-3</td></tr>
<tr bgcolor="#CCCC99"><td><b>Description</b></td><td>A story about a few important days in the life of Holden Caulfield</td></tr>
</table>

Parts of the HTML that produces the table are as follows:

    <table border="0" cellpadding="5" cellspacing="1">
    <tr bgcolor="#CCCC99"><td><b>Author</b></td><td>Salinger, J. D.</td></tr>
    <tr bgcolor="#CCCC99"><td><b>Title</b></td><td>The Catcher in the Rye</td></tr>
    ...

*Tips and Hints:*
To produce an HTML page using Python and Flask, see the example below. The script displays current temperature in New York.

    from flask import Flask
    from lxml import etree
    from urllib import urlopen

    app = Flask(__name__, static_folder='.', static_url_path='')

    # Get the XML data of the current weather at Central Park, New York
    xmltree = etree.parse(urlopen("http://w1.weather.gov/xml/current_obs/KNYC.xml"))
    root = xmltree.getroot()
    location = root.find('location').text
    temp = root.find('temperature_string').text

    # Display the location and temperature in HTML
    html = '''
    <!doctype html>
    <html>
    <body>
    <p>Current temperature at %s is %s</p>
    </body>
    </html>
    '''

    @app.route("/")
    def root():
        return html % (location, temp)

    if __name__ == "__main__":
        app.run(debug=True, host='0.0.0.0', port=80)

\\}


\\{div class="exercise"

#### Exercise 4

Save and unzip the following [file](codes.zip) to your own directory. From the command line, call:

        C:\> python form.py

Load `form.html` in the browser via the following URL, `http://localhost/form.html` and answer the following questions

1. View the source of `form.html`. What tags can you see?
2. Do you know what these represent? Use this [resource](http://www.w3schools.com/html/html_forms.asp) to help you examine the HTML.
3. Fill the form and click submit, observe the output and examine how `form.py` processes the form submission.

Open `form.html` in a text editor and change the following line:

    <form method="get" action="handler">

to:

    <form method="post" action="handler">

Reload `form.html` and resubmit the form. Observe how the user input gets transmitted to the python code. Discuss the advantages and disadvantages of using `POST` and `GET` methods.

\\}


\\{div class="exercise"

#### Exercise 5 (optional)

Save and examine the following [file](codes/tint.py) to your own working directory. Run `tint.py` from the command line:

    C:\>python tint.py

You should see a new JPG file called `output.jpg` is created in the same directory as your script. The program basically load an image from URL, convert it to greyscale, apply a tint filter, and write it to an image file. All your logic has been written for you.

Examine `read_image_url` function and see how you can issue an HTTP request using [`urllib2`](https://docs.python.org/2/library/urllib2.html) library. See how the program add `User-Agent` header as part of the request headers. User agent indicates the type of bowser and sometimes web server refused request from anything other than proper browser. Here we are trying to pretend to be a Chrome browser by manually setting the  header.

    ...

    def read_image_url(url):
      user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36' # spoof the agent, pretend to be browser
      headers = {
        'User-Agent': user_agent
      }
      req = Request(url, None, headers)
      return urlopen(req)

    ...

Remove the headers, and re-run the program. What error message do you see? Put back the `User-Agent` header and add `Referer` header (see its documentation [here](https://en.wikipedia.org/wiki/HTTP_referer)) to the request. Explain what the function of `Referer` header is.

Now, your task is to create web application that uses `tint.py` (You can develop your app in `tint-app.py`) that allows a user to input an image URL through an HTML form. Upon submitting the form your app will read the image, produce the tinted image and display the image as the response of form submission.

\\}

Other Resources
---------------

- **Telnet** (http://www.telnet.org) – this is one of the original network protocols. Now superceded by other technologies it can still provide a useful insight into the structure of the detail of conversations across the internet. Most operating systems have a version of the Telnet application that is disabled by default, but can be re-enabled by installing the relevant package (Linux and later Mac versions) or setting the service through Control Panel options (Windows). Beware if you do enable it as it is unencrypted and has a variety of security issues (hence why it’s disabled by default).

- **cURL** (http://curl.haxx.se/) – a lightweight software project that allows data transfer through URIs. Using the libcurl library it supports the most common internet protocols (HTTP, FTP, telnet, etc) and allows you to send or receive files from the command line. Limited in usefulness it still shows the detail of HTTP headers as discussed in this workshop.

- **WireShark** (https://www.wireshark.org) – this is a full-on (and award-winning) packet analyser. It gives detailed information on network connectivity to your computer and it’s relation to the wider Internet. Very useful in troubleshooting network issues and seeing exactly what your computer’s surrounding environment looks like.

- All scripts in these exercises are available from [this IVLE zip file](http://students.informatics.unimelb.edu.au/~astell/foi/mywork/infrastructure_workshop_week2/scripts/week2_scripts.zip).


Readings
--------

- **The Cuckoo's Egg**, Cliff Stoll (2005) - a fascinating read about one of the earliest hackers of the Internet, being tracked and hunted by a pioneer of Internet technology in California. A highly readable computer crime story, it also gives great insight into how the protocols of the Internet (such as HTTP) were developed and used back in the 80's.