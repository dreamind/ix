Workshop - Representing Data
=========================

This workshop will allow students to have hands-on experience of designing and exchanging data using both formats - XML and JSON - covered in this week, as well as providing exposure to associated technologies such as Javascript and JQuery. The experience will provide the tools that will be heavily used in the individual and group projects (e.g. development of XML DTD designs).


<a target="_blank" href="json_workshop.ppt" file="ppt">Slides used for this workshop - JSON</a>

A. JavaScript Object Notation (JSON)
------------------------------------
JSON Presentation: slides 1 to 7

**Question 1**

Previously in this workshop, you created the following XML file to represent a book (book.xml):

`<?xml version="1.0" encoding="utf-8"?>
<book id="book001">
    <author>Salinger, J. D.</author>
    <title>The Catcher in the Rye</title>
    <price>44.95</price>
    <language>English</language>
    <publish_date>1951-07-16</publish_date>
    <publisher>Little, Brown and Company</publisher>    
    <isbn>0-316-76953-3</isbn>
    <description>A story about a few important days in the life of Holden Caulfield</description>
</book>`

1. Now represent this file as JSON. [Note: create the new file in IVLE, give it the name book.json, and save as “Text”.]
2. Validate your JSON solution against [JSONLint](http://www.jsonlint.com). [Note: as with the XML validator, be careful of white-space or missing control characters]
3. In your JSON solution, add “Spanish” and “German” as two extra languages represented as an array. Save this file as book2.json. Validate it on JSONLint.
4. Now modify the “publish_date” parameter. Make this an array of two objects that have properties of “edition” (“first”,”second”) and “date” (“1951-07-16”,”1979-01-01”). Save this file as book3.json. Validate it on JSONLint.


**Question 2**

Now we're going to import JSON data into an HTML page and format it. Copy and paste this [HTML file](http://server/jquery_book_example.html) into the same directory as book3.json.

1. Replace all the references in the file to “data.json” with “book3.json” and uncomment line 47 (adding output for ID and publish dates). Serve the file and click the button marked “Get and parse JSON”. What is output on screen?
2. Retrieve some of the root items in book3.json and render them as bold and italic (hint: use the `<strong>` and `<em>` tags around the text)
3. Add the following code in the <head> section of the HTML page:


`<script>
 $(function() {
    var state = true;
    $( "#button" ).click(function() {
      if ( state ) {
        $( "#effect" ).animate({
          backgroundColor: "#aa0000",
          color: "#fff",
          width: 500
        }, 1000 );
      } else {
        $( "#effect" ).animate({
          backgroundColor: "#fff",
          color: "#000",
          width: 240
        }, 1000 );
      }
      state = !state;
    });
  });
  </script>`
    
`<script>
	$(function() {
        	$( "#menu" ).menu();
	});
</script>`

`<style>
  .ui-menu { width: 150px; }
</style>`

Now build up a JQuery menu of the root and sub-items in book3.json, using a nested combination of `<ul>` and `<li>` tags. Use the [lecture example](http://server/jquery_examples.html) as a template if you wish.


Exercises
---------

1. Express the following data-set in JSON [provided – complex with some hierarchies]
2. Using Javascript commands as queries [examples provided], return the following results [add some non-trivial results to figure out from the data]
3. Run the following JSON data in Javascript using the eval() method [JSON with executable Javascript embedded]. What is the result?


Other Resources
---------------

- **www.json.org** - 
- **Javascript, the Good Parts** - 
