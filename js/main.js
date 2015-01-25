var ix = {};

(function() {
  ix.appPath = '../'; // hardcoded for now

  ix.launch = function () {
    requirejs([
      //'../third-js/strapdown/0.2/strapdown.js' // TO FIX
    ]);
    //alert(document.body);
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  }

}());

requirejs.config({
  baseUrl: ix.appPath + 'third-js',
  paths: {
    app: '../app' // relative to the baseUrl
  }
});

// Start the main app logic.
requirejs([
    'jquery/jquery',
    ix.appPath + 'third-js/' + 'MathJax/MathJax.js?config=TeX-AMS-MML_HTMLorMML',
    'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.4/highlight.min.js'
  ],
  function () {
    //
    $(document).ready(function () {
      ix.launch();
    });
  }
);
