Workshop - Presenting Data on the Web
=========================

This workshop will allow students to gain practical experience in manipulating
HTML and CSS so that they can present information efficiently and effectively
 on the Web. In addition, student will learn how to use CGI interface to build an interactive and dynamic web page.

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

Using *embedded* CSS, stylise the table's cells with **1px solid grey-colored** border. You can do this by inserting the following snippet in the `<head>` element.

    <style>
    td {
      border: 1px solid grey;
    }
    </style>

Preview the HTML page again.

\\}

\\{div class="exercise"

#### Exercise A-2

Now, instead of using embedding CSS, place your existing CSS rule into a separate CSS file (which is called `table.css`). To use the *link* method, replace the `<style>` element with the following line:

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

Most modern browsers support CSS3, which allows you to import your typefaces/fonts of choice. [Google Fonts](http://www.google.com/fonts) provides you an easy way to include fonts from its collection. Go to the Google Fonts site, select a font that you
like, click on the `Quick-use` icon, and follow the instructions. In the **Add this code to your website:** section, you should see various ways to include the selected font in your web page.

Suppose you have selected `Lora` font, you would need to add the following line into
your CSS.

    @import url(http://fonts.googleapis.com/css?family=Lora);

To apply the font to a particular selector, add the following:

    font-family: "Lora", serif;

`serif` here is the alternative font in case browser fails to retrieve the first preference (`Lora`).

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
- Column 2 of the table
  * Font color: `rgb(60,30,0)`
  * Background color: color-palette-2
  * Text align: `center`
- Column 3 of the table
  * Font color: `#736A65`
  * Background color: color-palette-3
  * Text align: `right`

Preview the HTML page.

Finally, try using CSS3's `:nth-child()` pseudo class to achieve the same effect.

\\}

Part B - HTML, CSS and CGI
--------------------------

Let's start with the following HTML page (`table2.html`), which displays 3 x 3 table:

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

Without modifying the HTML code, add some CSS rules so that the table will look like the figure below:

<style>
#table-b-1 td {
  border: black 1px solid;
}
</style>

<table id="table-b-1" width="300" height="200" bgcolor="white">
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

Now, we're going to produce CSS rules dynamically from a Python script. We want to produce a 3 x 3 table with a random background color in each cell. See the behaviour of the application [here](http://students.informatics.unimelb.edu.au/~ivow/foi/mywork/public/workshops/presenting-data/b-2/table.html). Reload the page several times to see that random palettes are generated randomly.

In the same directory where `table2.htnl` is, create an empty Python script called `css.py` and add the following lines:

    print 'Content-Type: text/css'
    print
    # Write your code from here
    # ...

Remove the embedded CSS in `table2.html` and replace with the following line.

    <link type="text/css" href="css.py" rel="stylesheet" />

Now continue writing `css.py` so that it produces the CSS rules that are required to produce the intended effect.

Hint: User `random` module and `random.randint` function.

\\}

While the most common way to specify colour in CSS is to use RGB color space,
you can also use HSL (Hue Saturation Lightness) color model.
HSL is a more natural way since you can specify a color by selecting the hue of choice.
Hue indicates the *kind* of color. Hue covers 360 degrees spectrum in cylindrical color space:

- 0 - Red
- 60 - Yellow
- 120 - Green
- 180 - Cyan
- 240 - Blue
- 300 - Magenta

Saturation (0 - 100%), represents the intensity of colour. Lightness (0 - 100%) is the perceived luminance, the brightness of colour.
As an example, `green` can be specified as `hsl(120, 100%, 50%)`.

<img src="images/hsl-cylinder.png" />

Licence CC-BY-SA-3.0 [from wikimedia](http://commons.wikimedia.org/wiki/File:HSL_color_solid_cylinder_alpha_lowgamma.png)

<div id="fig-hsl" style="width:600px;height:0px;margin-left:0px"></div>
<script src="js/hsl.js"></script>
<script>
ix.register(function () {
  // ix.figures.hsl("#fig-hsl");
});
</script>

\\{div class="exercise"

#### Exercise B-3

We build upon your result of B-2 exercise. Now, we want to dynamically produce an `n` x `n` table that contains cells with the background colors of the same hue, with `n` supplied by the user through a CGI-based form input. See the behaviour of the application [here](http://students.informatics.unimelb.edu.au/~ivow/foi/mywork/public/workshops/presenting-data/b-3/form.html).

User will also need to select the hue for the table. Use the following HTML control to allow the hue selection:

    <select name="hue">
      <option value="0">Red</option>
      <option value="60">Yellow</option>
      <option value="120">Green</option>
      <option value="180">Cyan</option>
      <option value="240">Blue</option>
      <option value="300">Magenta</option>
    </select><br />

Fix the *saturation* at 100% and use random values (between 0 - 100%) for *lightness*.
\\}

Resources
---------

- http://en.wikipedia.org/wiki/HSL_and_HSV
- https://docs.python.org/2/library/colorsys.html<br />
  In Python, you can use `colorsys` module to convert color from HSL to RGB color space.