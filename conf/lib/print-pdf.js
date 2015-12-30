/**
 * Use phantomjs script for printing an HTML page to PDF.
 * Used for printing reveal.js slides
 *
 * Example:
 * phantomjs print-pdf.js "http://localhost:9001/index.html?print-pdf" output.pdf options.json
 *
 * Based on:
 * Manuel Bieh (https://github.com/manuelbieh)
 * https://github.com/ariya/phantomjs/blob/master/examples/rasterize.js
 * https://gist.github.com/FiloSottile/2667199
 */

var page = require('webpage').create();
var system = require('system');
var u = require('underscore');

var options = {
  viewportSize: {
    width: 960, // slide width and height
    height: 700
  },
  /*
   page.paperSize:
   { width: ..., height: ..., margin: '0px' } or
   { format: 'A4', orientation: 'portrait', margin: '1cm' }
   */
  paperSize: {
    format: 'A4', // "A4" or "Letter"
    orientation: 'landscape', // 'portrait'
    margin: 0
  },
  outputType: 'pdf', // 'png' or 'jpg'
  timeout: 20000
};

if (system.args.length < 3 || system.args.length > 5) {
  console.log('Incorrect number of arguments.');
  phantom.exit(1);
}

var inputUrl = system.args[1] || 'index.html?print-pdf';
var outputFile = system.args[2] || 'slides.pdf';
var optionFile = system.args[3];

if (optionFile) {
  var opts = require(optionFile);
  u.extend(options, opts);
}

if (options.zoomFactor) {
  page.zoomFactor = options.zoomFactor;
}

if (options.outputType === "pdf") {
  // TODO
  // Something is wrong with these config values. An input
  // paper width of 1920px actually results in a 756px wide
  // PDF.
  page.paperSize = {
    width: Math.round( options.viewportSize.width * 2 ) + '.px',
    height: Math.round( options.viewportSize.height * 2 ) + '.px',
    border: '0px'
  };
  page.paperSize = options.paperSize;
} else {
  page.viewportSize = options.viewportSize;
  page.clipRect = {
    top: 0,
    left: 0,
    width: options.viewportSize.width,
    height: options.viewportSize.height
  };
}

page.open(inputUrl, function (status) {
  if (status !== 'success') {
    console.log('Unable to load the URL!');
  } else {
    page.evaluate(function () {
      // for retina display
      // scale the whole body
      // document.body.style.webkitTransform = "scale(2)";
      // document.body.style.webkitTransformOrigin = "0% 0%";
      // fix the body width that overflows out of the viewport
      // document.body.style.width = "50%";
    });
    window.setTimeout(function () {
      page.render(outputFile);
      phantom.exit();
    }, options.timeout);
  }
});




