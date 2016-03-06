Workshop - Representing Data with JSON (JavaScript Object Notation)
=================================

Noww, we are gouing to explore the properties of JavaScript Object Notation as a method of representing, storing and exchanging data. The workshop will start with a brief presentation re-iterating syntax rules from the lecture and emphasising the tools that we will be using to explore JSON. We will then go through two guided questions that create and manipulate JSON representations and validate them against JSONLint, and also represent the JSON information in HTML and JQuery. The extended exercise questions ask for more complex representation in JSON, introduce the use of Javascript as a database query engine, and explore the security implications of JSON being Javascript executable.

<a target="_blank" href="json_workshop.ppt" file="ppt"> Slides used for this workshop - JSON</a>

Previously, in the last week workshop, you created the following XML file to represent a book (`book.xml`):

    <?xml version="1.0" encoding="utf-8"?>
    <book id="book001">
      <author>Salinger, J. D.</author>
      <title>The Catcher in the Rye</title>
      <price>44.95</price>
      <language>English</language>
      <publish_date>1951-07-16</publish_date>
      <publisher>Little, Brown and Company</publisher>
      <isbn>0-316-76953-3</isbn>
      <description>A story about a few important days in the life of Holden Caulfield</description>
    </book>

\\{div class="exercise"

#### Exercise 1

Represent this file as JSON. Create the new file, give it the name `book.json`, and save as 'Text'. Begin with the following text and expand from there:

    {
      "id": "book001",
      "author": "Salinger, J. D."
    }

Validate your JSON solution against [JSONLint](http://www.jsonlint.com). [Note: as with the XML validator, be careful of white-space or missing control characters]

\\}

\\{div class="exercise"

#### Exercise 2

In your JSON solution, add `Spanish` and `German` as two extra languages represented as an array. Save this file as `book2.json`. Validate it on [JSONLint](http://www.jsonlint.com).

Now modify the `publish_date` parameter. Make this an array of two objects that have properties of `edition` (`first`, `second`) and `date` (`1951-07-16`,`1979-01-01`) respectively. Save this file as `book3.json`. Validate it on [JSONLint](http://www.jsonlint.com).

\\}

\\{div class="exercise"

#### Exercise 3

Now create a python code that represents the HTML table (seen before earlier in the workshop) by using `json` library. The library allows you to read JSON file and access its content as dictionary-like object in Python. You can simply make your code to write an HTML page or you can use Flask to produce an application that write HTML from the JSON file dynamically.

    import json

    json_obj = json.load(open('book.json'))

    # write your Python code from this point
    # ...

View the HTML file on the browser.
\\}

\\{div class="exercise"

#### Exercise 4 (optional)

Now produce a large HTML file from a JSON data source retrieved from a public interface. You display the data in an appropriate format, e.g. table. As an example, you can use [City of Melbourne Public BBQ Data Set](https://data.melbourne.vic.gov.au/Assets-Infrastructure/Public-Barbeques/5nb5-w7hq). Display the data as a list of places and their coordinates (latitude and longitude). The JSON is available [here](https://data.melbourne.vic.gov.au/api/views/5nb5-w7hq/rows.json?accessType=DOWNLOAD).

You can also use any other public JSON data sources:

- [City of Melbourne Open Data](https://data.melbourne.vic.gov.au/)
- [Absolute Drinks API](https://addb.absolutdrinks.com/docs/)
- [Weather data from Yahoo Developer API](https://developer.yahoo.com/everything.html)
- [rottentomatoes.com](http://developer.rottentomatoes.com/docs/read/JSON)
- Tumblr. For example [comedycentral tumblr page](http://comedycentral.tumblr.com/api/read/json)
- [Free Data Feeds](http://gomashup.com/cms/free_data_feeds)

Note that many of these sources require you to use an API Key (which you can apply quite instantly).

\\}

Other Resources
---------------

- **http://www.json.org** - This is the JSON specification in reference, but still readable, format. It describes the syntax rules in five pictures and with a brief glossary. It also provides useful links to (current, as of recent access) language-specific JSON parsers and community groups.

- **Google Chrome Developer Tools** - [Developer Tools](https://developer.chrome.com/devtools). User guide to the invaluable developer suite in Google Chrome that allows you to analyse and debug CSS, Javascript and other browser-based technologies that had been mysterious for so long.

- **Mozilla Firebug Plugin** - [FireBug](http://getfirebug.com/). Mozilla's version of this. Also very, very useful.