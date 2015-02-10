

requirejs.config({
  baseUrl: ix.jsPath
});

// Start the main app logic.
requirejs([
    ix.jsPath + 'reveal.js/plugin/markdown/marked.js',
    ix.jsPath + 'jquery/jquery.js',
    ix.jsPath + 'underscore/underscore.js',
    ix.jsPath + 'MathJax/MathJax.js?config=TeX-AMS-MML_HTMLorMML',
    ix.jsPath + 'reveal.js/plugin/highlight/highlight.js'
  ],
  function (marked) {

    window.marked = marked; // overwrite
    $(document).ready(function () {
      ix.launch();
    });
  }
);
