Workshop - The Mechanics of the Web
=========================

This workshop introduces students to infrastructure concepts that underpin the use of the Internet for informatics and data processing. Specifically we will be looking at the Hypertext Transfer Protocol (HTTP), Web Application Framework (using Flask) and briefly Hypertext Markup Language (HTML). These three areas are fundamental to understanding the mechanics of information transfer across networks, and are therefore an essential platform to building knowledge in informatics.

## Hyper-Text Transfer Protocol (HTTP)

Open up Putty (Windows button then put `putty` into the search box).
Configure the screen as shown in figure 1.

<img src="images/image001.png">

*Figure 1*: The configuration screen for Putty. Put in the hostname “www.unimelb.edu.au”, port “80”, connection type “Raw”, Close window on exit “Never”.

Open Notepad and write the following HTTP request information as shown in figure 2.

<img src="images/image002.png">

*Figure 2*: HTTP text to copy into the Putty window

As the webpage returned will likely be large, you may need to set the scrollable size by editing the Lines of Scrollback to “20000” under the Window section, as shown in figure 3.

<img src="images/image003.png">

*Figure 3*: Configuring the scroll size of the Putty window

\\{div class="exercise"

#### Exercise 1

Open a terminal using Putty as described above and connect to www.unimelb.edu.au by copying and pasting the commands from Notepad into the terminal window and pressing return twice. Look at the output that is returned.

1. Where does the response information start?
2. What server engine is hosting this site?
3. What HTTP code has been returned?
4. Try again with the input “GET /test.html HTTP/1.1” on the first line. What code is returned this time?

\\}

\\{div class="exercise"

#### Exercise 2

Compare the output from the Putty terminal and the output of the web-page in a browser. How do they differ? We’re about to demonstrate how information is passed between one page and another – if you can’t see it, do you think the information is hidden/protected?

\\}

## Flask Web App and HTML

With Flask, you can create a web application, which is basically a service that can reponse to user interactively via web browser. In this case, you will launch Flask as a web server that runs through port 5000.

Follow the recipe below, to create a simple web application using Flask. First,
create a file called [`hello.py`](codes/hello.py) that contains the following code:

    from flask import Flask
    app = Flask(__name__, static_folder='.', static_url_path='')

    @app.route("/")
    def root():
        return 'Hello World!'

    if __name__ == "__main__":
        app.run(debug=True)

Run the application using the following command:

    C:\> python hello.py

If there is an issue in locating the Python executable (`python.exe`), you may want to use the complete path for the installed Python:

    C:\> C:\Users\username\AppData\Local\Continuum\Anaconda2\python hello.py

Once you invoke the command, you should see something like:

    * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
    * Restarting with stat
    * Debugger is active!

Launch a browser and put http://127.0.0.1:5000/ in the address bar, you should see your
first Hello World Flask application.

\\{div class="exercise"

#### Exercise 3

Save as hello.py and modify the application to print the current time (use [strftime](https://docs.python.org/2/library/time.html#time.strftime) from time module).

\\}

Note that the following exercise touches briefly on HTML just to understand what is being communicated across the network using HTTP. The in-depth exploration of HTML will be covered in another workshop.

\\{div class="exercise"

#### Exercise 4

Write a Python script that rewrites the data inside `book.xml` (download [here](assets/book.xml)) as a web page (HTML). Use an HTML table to format the data. See the following example below.

<table border="0" cellpadding="5" cellspacing="1">
<tr bgcolor="#CCCC99"><td><b>Author</b></td><td><b>Salinger, J. D.</b></td></tr>
<tr bgcolor="#CCCC99"><td><b>Title</b></td><td><b>The Catcher in the Rye</b></td></tr>
<tr bgcolor="#CCCC99"><td>Language</td><td>English</td></tr>
<tr bgcolor="#CCCC99"><td>Publish date</td><td>1951-07-16</td></tr>
<tr bgcolor="#CCCC99"><td>Publisher</td><td>Little, Brown and Company</td></tr>
<tr bgcolor="#CCCC99"><td>Isbn</td><td>0-316-76953-3</td></tr>
<tr bgcolor="#CCCC99"><td>Description</td><td>A story about a few important days in the life of Holden Caulfield</td></tr>
</table>

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
        app.run(debug=True)

\\}


\\{div class="exercise"

#### Exercise

Save and unzip the following [file](codes.zip) to your own directory. From the command line, call:

        C:\> python form.py

Load `form.html` in the browser via the following URL, `http://localhost:5000/form.html` and answer the following questions

1. View the source of `form.html`. What tags can you see?
2. Do you know what these represent?
3. Fill the form and click submit, observe the output and examine how `form.py` processes the form submission.

Open `form.html` in a text editor and change the following line:

    <form method="get" action="handler">

to:

    <form method="post" action="handler">

Reload `form.html` and resubmit the form. Observe how the user input gets transmitted to the python code.

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