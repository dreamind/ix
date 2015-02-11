
requirejs.config({
  baseUrl: ix.jsPath,
  map: {
    "uri": { // fixes URI deps
      "IPv6": "false",
      "punycode": "false",
      "SecondLevelDomains": "false"
    }
  }
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

    function go () {
      ix.slurpMarkdown();
      ix.doHighlight();
      ix.slurpCode();
    }

    window.marked = marked; // overwrite
    $(document).ready(function () {
      var qs = window.location.href.match(/\?(.*)?src=(.*)/);
      if (qs) {
        $.get(qs[2], function (data) {
          $('body').innerHTML = data;
          go();
        });
      } else {
        go();
      }
    });
  }
);
