Part B: Interactive Web Applications using JavaScript

JavaScript is one of the technologies most commonly used to develop Rich Internet Applications. It allows client-side (browser-based) scripting capability, which provides more engaging and interactive web pages. On the other hand, server side scripting frameworks--such as ASP, PHP, and Python--generate HTML codes in the server side and the generated codes form the web page that you see in the browser. No further changes to page can be done using this method from the server side (see the figure below).

With a client side scripting, parts of your HTML content/codes can be changed on-the-fly while the page is being viewed in the browser. The changes can be triggered by user input or by the incoming data from the server.

To demonstrate the distinction between the client-side and the server-side scripting, try out the two versions of HelloWorld applications on IVLE. Upload the ZIP file to IVLE, serve helloword.py and helloworld.html in your browser. Inspect the source code of those two pages and find out the differences.

Read through the [w3schools JavaScript Basic Tutorial](http://www.w3schools.com/js/) to familiar yourself with the basic programming constructs of the language (iteration, conditionals, etc.)

### Using jQuery for rapid JavaScript development.

In this workshop you will learn how to use a JavaScript library called [jQuery](http://jquery.com). jQuery hides a lot of the complexities in dealing with the ordinary way of manipulating HTML codes; it provides a simple way to put logic and computational power to your page without writing too much codes.

### Document Object Model (DOM) Manipulation.

A web page is constructed from a collection of HTML elements organised in a tree structure (similar to an XML file). The way these elements are organised can be viewed using [Document Object Model (DOM)](http://www.w3schools.com/dom/). Using DOM, we can access all elements within the page and manipulate the elements of interest.

Download dom_event.zip and extract it to your local drive.

Inspect domv0.html and dom.css. Familiar yourself with how the HTML page is structured and how CSS is used to format the page (revisit the Informatics 2 HTML & CSS lectures, if required). You shall notice that JavaScript code is enclosed within `<script>` tag.

        <script type="text/javascript">
        ... JavaScript code
        </script>

`window.onload = putContentV0` means that once the page is loaded, `putContentV0` function will be called.

The function simply uses 1document.getElementById` to get hold of the `mainheader` element and insert HTML code inside the element. This is how DOM access and manipulation can be done by default.

Now, we can use jQuery library to make our life easier. To do that you first need to include jQuery library. See how this can be done in `domv1.html`:

    <script src="jquery-1.4.2.min.js" type="text/javascript"></script>

The two lines in `domv0.html`:

    mainheader_element = document.getElementById("mainheader");
    mainheader_element.innerHTML = "<h1>Hello World from JavaScript</h1>";

can now be replaced with a more succinct:

    $('#mainheader').html( "<h1>Hello World from jQuery</h1>" );

And:

    window.onload = putContentV0;

is now replaced with:

    $(document).ready(putContentV1);

With jQuery you can also manipulate the look and feel of the element using CSS styles:

    // now add a bit of color
    attributes = { "font-family" : "Verdana", "color": "#d3d9c5" };
    $('#mainheader').css( attributes );

Notice that with jQuery you can use various CSS selectors to select a set of element(s). It means that you can update multiple elements at the same time. See how this is done in `domv2.html` to format multiple paragraphs (`<p>`).

### Event Driven Programming

Programming using JavaScript usually involves a programming paradigm called Event Driven Programming. Instead of linear execution of codes, event driven programming relies on [events](http://api.jquery.com/category/events/) and their handlers. Each element in an HTML page is associated to a specific set of events. For example, a hyperlink can have [hover](http://api.jquery.com/hover/) event and [click](http://api.jquery.com/click) event. You can assign a function, a handler, that should be called when the an event occurs.

With jQuery specifying a handler for an event is easy:

    $('selector').click( function_that_handle_the event );

Open eventv0.html and see that a button and a link are added in the footer:

    <input id="show_button" type="button" value="Show Main Content" /> |
    <a id="hide_link" href="#">Hide Main Content</a>

We can set that a function should be called when the button or the hyperlink is click:

    function showMainContent(){ $('#maincontent').show('slow'); }
    function hideMainContent(){ $('#maincontent').hide('slow'); }
    ...
    $('#show_button').click( showMainContent );
    $('#hide_link').click( hideMainContent );

Notice that clicking the button will display the maincontent block and clicking the link will hide the same element.
Often, we can avoid having an explicit function definition, and instead, defining the function directly in the set up of the event handler. Look at eventv1.html:

    $('#show_button').click(
        function(){
            $('#maincontent').show('slow');
        }
    );

Exercises:
Play around with different events (like hover) and different [effects](http://api.jquery.com/category/effects/) (like [`fadeIn`](http://api.jquery.com/fadeIn/)).
Download jquery_demo.zip and try to recreate the page without looking at the underlying code.

### Ajax (Asynchronous JavaScript and XML)

One of the most compelling use of JavaScript is to get data from a server (or other data sources) and to update certain parts of web page using the data updates. This is called Ajax technique, which allows us to build interactive web page without repeatedly reloading the web page. It means users can can have a smoother experience in interacting with the content on the page.

This technique is initiated with the JavaScript codes making an Ajax call to a server (similar to the way you POST/GET data using HTML form, but without reloading the page). The server will response with the requested data in XML format (nowadays, JSON format is also used widely). Upon receiving the data, which is an event in itself, the JavaScript will call an event handler. The event handler can then carry out the further steps with the data such as displaying the data on the page.

Download ajax.zip and upload the ZIP file to IVLE. This package demonstrates a simple calculator using Ajax call in jQuery.
Clicking the button will send the expression (data) as part of the Ajax call to a Python script (ajax.py). The result of the expression is returned back by the Python script either as XML or JSON. The success event handler will then display the result in the textarea on page.

The minimum skeleton for an Ajax call is as the following:

    function formSubmit(){
        $.ajax( {
            type        : "POST",
            url         : "ajax.py",                      // server script
            dataType    : $('input:radio:checked').val(), // json or xml
            data        : $('#testform').serialize(),     // put all the form data
            success     : function(data) {                // event handler
                // handling the data here
            }
        } );
        return false; // prevent form submission
    }

Inspect the `ajax.py` to see how the Ajax response is constructed.

Mash-up examples using JavaScript (and jQuery)
Google Maps example (Note that you need to apply for your own API key, if you want to serve this page in IVLE)
