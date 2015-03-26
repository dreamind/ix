Workshop - Presenting Data on the Web
=========================

This workshop will allow students to gain practical experience in manipulating HTML and CSS so that they can present information on the web. In addition, student will learn how to use CGI interface to build an interactive and dynamic web page.


Part A - HTML and CSS
---------------------

\\{div class="exercise"

#### Exercise A-1

Type in (or copy and paste) the following HTML5 code in the IVLE text editor.

    <!DOCTYPE html>
    <html>
      <head>
        <title>table demo</title>
      </head>
    <body>
    <table>
      <tr>
        <td>Lorem ipsum dolor sit amet</td>
        <td>Consequet</td>
        <td>9501.00</td>
      </tr>
      <tr>
        <td>Bis nostrud</td>
        <td>Nam ultricies</td>
        <td>1.50</td>
      </tr>
    </table>
    </body>
    </html>​​​

Save the file in your IVLE space, and name it `table.html`. Serve the file in the browser.
Observe the output of the HTML page.

Using *embedded* CSS set the boundary of the cells to **1px solid grey-colored** line. You can do this by inserting the following snippet in the `<head>` element.

    <style>
    td {
      border: 1px solid grey;
    }
    </style>

Preview the HTML page again.

\\}


\\{div class="exercise"

#### Exercise A-2

Now, instead of embedding CSS, place your existing css rule into a separate CSS file (which is called `table.css`). To use this *link* method, replace the `<style>` element with the following line:

    <link type="text/css" href="table.css" rel="stylesheet">

In the new `table.css`, add some new CSS rules:

- For `table` element, set `border-spacing` to `0px`
- For all cells (`td`):
  * Set `margin` to `0px`
  * Set the top, right, bottom, left values of `padding` to `5px`, `10px`, `5px`, `10px` respectively
  * Align the text content to `left`
  * Set the font size to `1.5em`

Preview the HTML page.

\\}

Most modern browsers support CSS3 which allows you to import your typeface of choice. [Google Fonts](http://www.google.com/fonts) provides you an easy way to include fonts from its collection. Go to the site, select a font that you like, and click on the `Quick-use` icon. Follow the instructions and in the **Add this code to your website:** section, you can see various ways to include the selected font to your web page.

Suppose you select `Lora` font, you can add the following line into your CSS.

    @import url(http://fonts.googleapis.com/css?family=Lora);

To apply the font to a particular selector, add the following:

    font-family: "Lora", serif;

`serif` here is the alternative font in case browser fails to retrieve the first preference.

\\{div class="exercise"

#### Exercise A-3

Select your font of choice in Google Font and add the `@import` line at the start of your `table.css`. By using CSS rules, change the font of the table cell content to your selected one.

Preview the HTML page.

\\}

\\{div class="exercise"

#### Exercise A-4

Now, we're going to play with color. Go to [Adobe Color](http://color.adobe.com), explore the available palettes, select one with lighter colours, and pick three colours from the selected palette.

Using CSS2's `:first-child` pseudo class and `+` sibling operator, achieve the following results without changing the HTML:

- Column 1 of the table
  * Font color: `black`
  * Background color: color-palette-1
  * Text align: `left`
- Column 1 of the table
  * Font color: `rgb(60,30,0)`
  * Background color: color-palette-2
  * Text align: `center`
- Column 1 of the table
  * Font color: `#736A65`
  * Background color: color-palette-3
  * Text align: `right`

Preview the HTML page.

Finally, try using CSS3's `:nth-child()` pseudo class to achieve the same effect.

\\}


Part A - HTML, CSS and CGI
--------------------------

Let's start with the following HTML page (`table2.html`) which displays 3x3 table:

    <!DOCTYPE html>
    <html>
    <head>
      <style>
        html, body, table {
          width: 100%;
          height: 100%;
          margin: 0;
        }

        table {
          border-spacing: 0;
        }

        td {
          border: grey 1px solid;
        }
      </style>
    </head>
    <body>
    <table>
      <tbody>
      <tr>
        <td></td><td></td><td></td>
      </tr>
      <tr>
        <td></td><td></td><td></td>
      </tr>
      <tr>
        <td></td><td></td><td></td>
      </tr>
      </tbody>
    </table>
    </body>
    </html>​


\\{div class="exercise"

#### Exercise B-1

Without modifying the HTML code, add some CSS rules so the table will look like as follows:

<table width="300" height="200" border="1" bgcolor="white">
  <tr>
    <td></td><td></td><td></td>
  </tr>
  <tr bgcolor="red">
    <td></td><td bgcolor="orange"></td><td></td>
  </tr>
  <tr>
    <td></td><td></td><td></td>
  </tr>
</table>

\\}

\\{div class="exercise"

#### Exercise B-2

Now we're going to produce CSS rules dynamically from a Python script. We want to produce a 3 x 3 table with random background color in each cell. See the behaviour of the application here

In the same directory where `table2.htnl` is, create an empty Python script called `css.py` and add the following lines:

    print 'Content-Type: text/css'
    print
    # Write your code from here

Remove the embedded CSS in `table2.htnl` and replace with the following line.

    <link type="text/css" href="css.py" rel="stylesheet" />

Now continue writing `css.py` so it produces CSS rules that allow the presentation of the intended effect.

Hint: User `random` module and `random.randint` function.

\\}

\\{div class="exercise"

#### Exercise B-3

We build upon your result of B-2. First, we want to dynamically produce a n x n table with random cell background color (of the same hue), with n supplied ny the user through a CGI-based form input. See the behaviour of the application here.

User will also need to select the hue for the table. Use the following HTML control to allow the hue selection:

    <select name="hue">
      <option value="0">Red</option>
      <option value="1">Yellow</option>
      <option value="2">Green</option>
      <option value="3">Cyan</option>
      <option value="4">Blue</option>
      <option value="5">Magenta</option>
    </select><br />

Hint: Use `colorsys` module to convert color from HSV to RGB color space

\\}

Resources
---------

- http://en.wikipedia.org/wiki/HSL_and_HSV
- https://docs.python.org/2/library/colorsys.html