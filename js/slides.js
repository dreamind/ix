var revealPath = ix.jsPath + 'reveal.js/';
var revealPluginPath = revealPath + 'plugin/';



// Start the main app logic.
requirejs([
    // WARNING: change in sequence will impact the callback
    revealPluginPath + 'markdown/marked.js',
    ix.jsPath + 'jquery/jquery.js',
    ix.jsPath + 'underscore/underscore.js',
    ix.jsPath + 'underscore.string/underscore.string.js',
    ix.jsPath + 'highcharts-release/highcharts.src.js',
    revealPath + 'lib/js/head.min.js',
    revealPath + 'js/reveal.js',
    ix.jsPath + 'es6-promise/promise.min.js',
    //ix.jsPath + 'MathJax/MathJax.js?config=TeX-AMS-MML_HTMLorMML' 
  ],
  function (marked, jq, u, s) {
    
    if (window.location.href.indexOf('print-pdf') > 0) {
      $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', revealPath + 'css/print/paper.css') );
    };

    _.mixin(s.exports()); // mix underscore string
    window.marked = marked; // requirejs has its own 'this'

    $(document).ready(function () {       
      ix.initReveal();
      ix.highchartsTheme();
      ix.doOnLoads();
      ix.initMathjax(); // very last to make sure all DOM is built
      // TO DO:
      // May need to call reveal.js to relayout
    });
  }
);



