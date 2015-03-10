This is the first workshop of Foundations of Informatics. The goal of this workshop is to revisit your experience with IVLE and to get you started with XML concepts, and lxml package, a Python library used to work with XML file.

 **A piece of Python code preceded with `>>>` needs to be executed in IVLE or Python Console.**

\\{div class="exercise"

#### Exercise

Type in (or copy and paste) the following XML data using the IVLE text editor.

```
<?xml version="1.0" encoding="utf-8"?>
<queen title="Queen Elizabeth II" marriedTo="Philip, Duke of Edinburgh">
    <prince title="Charles, Prince of Wales" marriedTo="Lady Diana Spencer">
    <prince title="Prince William of Wales" />
    <prince title="Prince Henry of Wales" />
    </Prince>
    <princess title="Anne, Princess Royal" />
    <prince title="Andrew, Duke of York" />
    <prince title="Edward, Earl of Wessex" >
</queen>
```

Save the file in your IVLE space, and name it royal.xml. Serve the file in the browser.
Notice that the browser would display some errors. In fact, there are actually two syntax errors in the documents. The XML file is not well-formed. Find those errors and fix them. Save the file and serve it again .

\\}

The XML Tree
------------

Examine the XML you have just created. You can think this XML data as the following tree structure. Each node represents an XML element, with the topmost node being the root element. Each element may have attributes and it may have 0 or more children, each of which is also an XML element.

<img src="images/tree.png" >

\\{div class="exercise"

#### Exercise

Examine royal.xml and answer the following questions:

- How many XML elements are there in the whole XML tree?
- What attributes belong to the first child of the root element? What are their values?

\\}

Having understood these basic XML concepts, you will spend the rest of this workshop learning how to write Python programs that process XML data.

A python package called `lxml` provides us with various methods of dealing with XML data known as APIs (Application Programming Interfaces). The first way is the `ElementTree` API, which enables us to easily access XML data in a tree-like structure.

Using `lxml` to read XML data
---------------------------

As with any other Python packages, you need to issue an import command to load a package:

```
>>> from lxml import etree
```

In order to load an XML file and to represent it as a tree in computer memory, you need to parse the XML file. The `etree.parse()` function parses the XML file that is passed in as a parameter. The command below assumes that `royal.xml` resides in your home folder.

```
>>> xmltree = etree.parse("royal.xml")
```

The `parse()` function returns an XML `ElementTree` object <a href="http://lxml.de/tutorial.html#the-elementtree-class" file="link"></a>, which represents the whole XML tree. Each node in the tree is translated into an `Element` object <a href="http://lxml.de/tutorial.html#the-element-class" file="link"></a>.

Use `getroot()` function of an ElementTree object to get the root element of the XML tree. You can print out the XML tag of an element using `tag` property.

```
>>> root = xmltree.getroot()
>>> print root.tag
queen
```

**Traversing XML tree**

The following sections describe various methods for traversing the XML tree

To obtain a list all of the children of an element, you can iterate over the XML `Element` itself:

    >>> for e in root:
    ...    print e.tag
    prince
    princess
    prince
    prince

You can use indexing to access the children of an element:

    >>> oldest_prince = root[0]
    >>> print oldest_prince.get("title")
    Charles, Prince of Wales

The `find()` method returns only the first matching child.

    >>> the_first_child_with_prince_tag = root.find("prince")
    >>> print the_first_child_with_prince_tag.get('title')
    Charles, Prince of Wales

The `iterchildren()` function allows you to iterate over children with a particular tag:

    >>> for child in root.iterchildren(tag="prince"):
    ...  print child.get('title')
    Charles, Prince of Wales
    Andrew, Duke of York
    Edward, Earl of Wessex

There is also a `iterdescendants()` function to iterate all descendants of a particular node.


\\{div class="exercise"

#### Exercise

Using the `royal.xml`:

- Write a Python code to get the title property of queen's grandsons.
- Write a Python code to get the full title of the only princess in the family tree.

\\}

**Accessing XML attributes**

You can access the XML attributes of an element using the `get()` method or `attrib` properties of an element.

    >>> print root.attrib
    {'marriedTo': 'Philip, Duke of Edinburgh', 'title': 'Queen Elizabeth II'}
    >>> print root.get("title")
    Queen Elizabeth II

**Accessing XML text**

Let's now use another sample of XML data. Create a new XML file in IVLE that contains the following:

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

Save the file as `book.xml`. This XML looks different to the `royal.xml` in that it has some text content within each element. To access the text content of an element (text between start and end tag), use `text` properties of that element. Type in the following code in the IVLE Console, and check the result.

    >>> from lxml import etree
    >>> xmltree = etree.parse('book.xml')
    >>> root = xmltree.getroot()
    >>> for child in root:
    ...   print child.tag + ": " + child.text

\\{div class="exercise"

#### Exercise

Write a Python script that presents the data inside `book.xml` in a web page. Use an HTML table to format the data. See the following example below.

<table border="0" cellpadding="5" cellspacing="1">
<tr bgcolor="#CCCC99"><td><b>Author</b></td><td><b>Salinger, J. D.</b></td></tr>
<tr bgcolor="#CCCC99"><td><b>Title</b></td><td><b>The Catcher in the Rye</b></td></tr>
<tr bgcolor="#CCCC99"><td>Price</td><td>44.95</td></tr>
<tr bgcolor="#CCCC99"><td>Language</td><td>English</td></tr>
<tr bgcolor="#CCCC99"><td>Publish date</td><td>1951-07-16</td></tr>
<tr bgcolor="#CCCC99"><td>Publisher</td><td>Little, Brown and Company</td></tr>
<tr bgcolor="#CCCC99"><td>Isbn</td><td>0-316-76953-3</td></tr>
<tr bgcolor="#CCCC99"><td>Description</td><td>A story about a few important days in the life of Holden Caulfield</td></tr>
</table>

*Tips and Hints:*
To print a web page using Python script, you need to specify the `Content-Type` before printing out the HTML. The script below displays current temperature in New York.

    from lxml import etree

    # Get the XML data of the current weather at Central Park, New York
    xmltree = etree.parse("http://w1.weather.gov/xml/current_obs/KNYC.xml")
    root = xmltree.getroot()
    location = root.find('location').text
    temp = root.find('temperature_string').text

    # Display the location and temperature in HTML
    print 'Content-Type: text/html\n'
    print '<html><body>'
    print '<p>Current temperature at %s is %s</p>' % (location, temp)
    print '</body></html>'

\\}

Building XML data
----------------

Appending a new element
Let's go back to the book.xml example.

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

As usual, to access or to manipulate this XML data, import lxml library, parse the XML tree, and get the root of the tree:

    >>> from lxml import etree
    >>> xmltree = etree.parse('book.xml')
    >>> root = xmltree.getroot()
    
To create a new XML element, use `etree.Element()` function:

    >>> new_element = etree.Element('genre')
    >>> new_element.text = 'Novel'
    >>> root.append( new_element )
    >>> etree.tostring(root[-1]  # the last element, the newly appended element
    <genre>Novel</genre>
    
You can also create new element using `SubElement()` function:

    >>> new_element = etree.SubElement(root, "price")
    >>> new_element.text = '23.95'
    >>> for e in root: # check whether the new element is added
    ...   print e.tag
    ['author', 'title', 'price', 'language', 'publish_date', 'publisher', 'pages', 'isbn', 'description', 'price']

Use `insert()` to insert a new element at a specific location:

    >>> root.insert(4, etree.Element("country"))
    >>> root[4].text = "United States"
    >>> etree.tostring(root[4]) 
    <country>United States</country>

Assuming you have added the `price` element in the book.xml. You can set the attribute of the price element using `set()` command.

    >>> root[-1].set("currency", "USD") # get the last element of the root
    >>> print etree.tostring(root[-1])
    <price currency="USD">23.95</price>

Alternatively, you can use attrib property:

    >>> root[-1].attrib["currency"] = "USD"
    
**Serialising XML data (printing as web content or writing into a file)**

You can get the whole XML string, by supplying the root of the tree to the `etree.tostring()` function:
  
    output = etree.tostring(root, pretty_print=True, encoding="UTF-8")

To write to a file, simply use the XML string in the file write operation:
    
    open('output.xml', 'w').write(output)

You can also display the XML data in the browser by adding appropriate `Content-Type`:

    ...
    # Display the location and temperature in HTML
    print 'Content-Type: text/xml\n'
    print output
    
\\{div class="exercise"

#### Exercise

- Assuming you have completed the tasks above, replace the text and the attribute of the price element to set the book price to 25 AUD.
- Create a new element called pages, set its content to 277, and append it to the root. Confirm that the new element is including, by issuing the following command: print etree.tostring( root[-1] ). It should return <pages>277</pages>

\\}