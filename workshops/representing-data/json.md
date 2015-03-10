Workshop - JavaScript Object Notation (JSON)
=================================

The JSON workshop allows students to explore the properties of JavaScript Object Notation as a method of representing, storing and exchanging data. The workshop will start with a brief presentation re-iterating syntax rules from the lecture and emphasising the tools that we will be using to explore JSON (Javascript, JQuery and the Mozilla and Chrome development suites). We will then go through two guided questions that create and manipulate JSON representations and validate them against JSONLint, and also represent the JSON information in HTML and JQuery. The extended exercise questions ask for more complex representation in JSON, introduce the use of Javascript as a database query engine, and explore the security implications of JSON being Javascript executable.

<a target="_blank" href="json_workshop.ppt" file="ppt">Slides used for this workshop - JSON</a>

JSON Presentation: slides 1 to 7

**Question 1**

Previously in this workshop, you created the following XML file to represent a book (`book.xml`):

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

1. Now represent this file as JSON. [Note: create the new file in IVLE, give it the name `book.json`, and save as “Text”.]
2. Validate your JSON solution against [JSONLint](http://www.jsonlint.com). [Note: as with the XML validator, be careful of white-space or missing control characters]
3. In your JSON solution, add `"Spanish"` and `"German"` as two extra languages represented as an array. Save this file as `book2.json`. Validate it on JSONLint.
4. Now modify the `publish_date` parameter. Make this an array of two objects that have properties of `"edition"` (`"first"`, `"second"`) and `"date"` (`"1951-07-16"`,`"1979-01-01”`). Save this file as `book3.json`. Validate it on JSONLint.

**Question 2**

Now we're going to import JSON data into an HTML page and format it. Copy and paste this [HTML file](http://students.informatics.unimelb.edu.au/~astell/foi/mywork/json_workshop_week3/scripts/jquery_book_example.html) into the same directory as book3.json.

1. Replace all the references in the file to `data.json` with `book3.json` and uncomment line 47 (adding output for ID and publish dates). Serve the file and click the button marked **Get and parse JSON**. What is output on screen?
2. Retrieve some of the root items in `book3.json` and render them as bold and italic (hint: use the `<strong>` and `<em>` tags around the text)
3. Add the following code in the `<head>` section of the HTML page:

```    
<script>
  $(function() {
    $( "#menu" ).menu();
  });
</script>

<style>
  .ui-menu { width: 150px; }
</style>
```

Now build up a JQuery menu of the root and sub-items in book3.json, using a nested combination of `<ul>` and `<li>` tags. Use the [lecture example](http://students.informatics.unimelb.edu.au/~astell/foi/mywork/json_workshop_week3/scripts/jquery_examples.html) as a template if you wish.


\\{div class="exercise"

#### Exercises

1. Express the following CSV book listing [data-set](http://students.informatics.unimelb.edu.au/~astell/foi/mywork/json_workshop_week3/scripts/ms_book_sample.csv) in JSON (converted to CSV from this [MS XML Sample file](https://msdn.microsoft.com/en-us/library/ms762271.aspx) )

2. The following Javascript command can be run to return the titles of all of the books in this data-set beginning with the letter “T” [example JS command]. Using similar Javascript commands as queries, answer the following questions:
  1. How many books were published before 2000, and what were their titles?
  2. Grouped by publisher name, how many books were published in German after 2002?
  3. Listing their names, how many publishers have books published in French with a price over $50?

  You may wish to consult the [w3schools.com tutorial](http://www.w3schools.com/js/default.asp) on Javascript.

3. Run the following JSON data in Javascript using the `eval()` method: [JSON with executable Javascript embedded]. What is the result?

\\}


Other Resources
---------------

- **www.json.org** - This is the JSON specification in reference, but still readable, format. It describes the syntax rules in five pictures and with a brief glossary. It also provides useful links to (current, as of recent access) language-specific JSON parsers and community groups.

- **Javascript, the good parts** Douglas Crockford (2008), [Javascript: the good parts](http://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742/ref=sr_1_1?ie=UTF8&qid=1425589713&sr=8-1&keywords=javascript+the+good+parts) - Even though this is a reference book, Crockford is a very engaging writer and it is quite thin so is readable from cover-to-cover. I recommend trying to do this or dipping in to read a couple of chapters at random - if you're even just slightly interested in Javascript and JSON it is well worth it.

- **Google Chrome Developer Tools** - [Developer Tools](https://developer.chrome.com/devtools). User guide to the invaluable developer suite in Google Chrome that allows you to analyse and debug CSS, Javascript and other browser-based technologies that had been mysterious for so long.

- **Mozilla Firebug Plugin** - [FireBug](http://getfirebug.com/). Mozilla's version of this. Also very, very useful.

- All scripts in these exercises are available from [this IVLE zip file](http://students.informatics.unimelb.edu.au/~astell/foi/mywork/json_workshop_week3/scripts/week3_scripts.zip).