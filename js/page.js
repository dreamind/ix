
/*requirejs.config({
  baseUrl: ix.jsPath
});*/

requirejs.config({
  paths:{
    jquery: ix.jsPath + 'jquery/jquery',
    highcharts: ix.jsPath + 'highcharts-release/highcharts'
  },
  shim: {
    highcharts: {
      exports: 'Highcharts',
      "deps": [ "jquery"]
    }
  }
});

// Start the main app logic.
requirejs([
    // WARNING: change in sequence will impact the callback
    ix.jsPath + 'reveal.js/plugin/markdown/marked.js',
    'jquery',
    ix.jsPath + 'underscore/underscore.js',
    ix.jsPath + 'underscore.string/underscore.string.js',
    ix.jsPath + 'reveal.js/plugin/highlight/highlight.js',
    ix.jsPath + 'es6-promise/promise.min.js',
    'highcharts',
    ix.jsPath + 'd3/d3.min.js'
  ],
  function (marked, jq, u, s) {

    function go () {
      ix.slurpMarkdown(function () {
        ix.slurpCode(function () {
          ix.doHighlight();
          if (ix.launch) { ix.launch(); }
          ix.doLinks();
          ix.doTitle();
          ix.doMath();
          ix.initMathjax();
          ix.doHtmls();
          if (parent) {
            // fix parent iframe
            var D = document;
            var h = Math.max(
              Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
              Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
              Math.max(D.body.clientHeight, D.documentElement.clientHeight)
            );
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
          if (url.match(/.*\.md$/)) { // ends with md
            var script = document.createElement( "script");
            script.setAttribute('type', 'text/x-markdown');
            script.innerHTML = data;
            var div = document.createElement( "div" );
            $(div).append(script);
            $(body).append(div);
            go();
          } else {
            body.innerHTML = ix.escapeHTML(data);
            go();
          }
        });
      } else {
        go();
      }
    });
  }
);
