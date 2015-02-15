
requirejs.config({
  baseUrl: ix.jsPath
});

// Start the main app logic.
requirejs([
    // WARNING: change in sequence will impact the callback
    ix.jsPath + 'reveal.js/plugin/markdown/marked.js',
    ix.jsPath + 'jquery/jquery.js',
    ix.jsPath + 'underscore/underscore.js',
    ix.jsPath + 'underscore.string/underscore.string.js',
    ix.jsPath + 'MathJax/MathJax.js?config=TeX-AMS-MML_HTMLorMML',
    ix.jsPath + 'reveal.js/plugin/highlight/highlight.js',
    ix.jsPath + 'es6-promise/promise.min.js'
  ],
  function (marked, jq, u, s) {

    function go () {
      ix.slurpMarkdown(function () {
        ix.slurpCode(function () {
          ix.doHighlight();
          if (ix.launch) { ix.launch(); }
          ix.doLinks();
          // fix parent iframe
          var D = document;
          var h = Math.max(
            Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
            Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
            Math.max(D.body.clientHeight, D.documentElement.clientHeight)
          );
          if (parent) {
            parent.postMessage({type: "ifh" , value: h}, "*");
          }
        });
      });
    }

    _.mixin(s.exports());
    window.marked = marked; // overwrite
    $(document).ready(function () {
      var qs = window.location.href.match(/\?(.*)?src=(.*)/);
      if (qs) {
        var url = qs[2];
        $.get(url, function (data) {
          var body = $('body')[0];
          body.innerHTML = '';
          if (url.match(/.*\.md$/)) { // ends with md
            var script = document.createElement( "script");
            script.setAttribute('type', 'text/x-markdown');
            script.innerHTML = data;
            var div = document.createElement( "div" );
            $(div).append(script);
            $(body).append(div);
          } else {
            body.innerHTML = ix.escape(data);
          }
          go();
        });
      } else {
        go();
      }
    });
  }
);
