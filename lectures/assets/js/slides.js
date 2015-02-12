var revealPath = ix.jsPath + 'reveal.js/';
var revealPluginPath = revealPath + 'plugin/';

// Start the main app logic.
requirejs([
    // WARNING: change in sequence will impact the callback
    revealPluginPath + 'markdown/marked.js',
    ix.jsPath + 'jquery/jquery.js',
    ix.jsPath + 'underscore/underscore.js',
    ix.jsPath + 'underscore.string/underscore.string.js',
    revealPath + 'lib/js/head.min.js',
    revealPath + 'js/reveal.js',
    ix.jsPath + 'es6-promise/promise.min.js',
    ix.jsPath + 'MathJax/MathJax.js?config=TeX-AMS-MML_HTMLorMML'
  ],
  function (marked, jq, u, s) {

    _.mixin(s.exports()); // mix underscore string
    window.marked = marked; // requirejs has its own 'this'

    $(document).ready(function () {
      Reveal.initialize({
        history: true,
        dependencies: [
          {
            src: revealPath + 'lib/js/classList.js',
            condition: function () { return !document.body.classList; }
          },
          {
            src: revealPluginPath + 'highlight/highlight.js',
            async: true,
            callback: function () {
              ix.slurpCode(function () {
                ix.doHighlight();
              });
            }
          }, {
            src: revealPluginPath + 'markdown/marked.js',
            condition: function () { return !!document.querySelector('[data-markdown]'); }
          },
          {
            src: revealPluginPath + 'markdown/markdown.js',
            condition: function () { return !!document.querySelector('[data-markdown]'); },
            async: true
          },
          { src: revealPluginPath + 'zoom-js/zoom.js', async: true },
          { src: revealPluginPath + 'notes/notes.js', async: true }
          // using manual inclusion of MathJax to avoid remote dependencies
          // { src: revealPluginPath + 'math/math.js', async: true }
        ]
      });
      Reveal.addEventListener('ready', function (event) {
        // event.currentSlide, event.indexh, event.indexv
      });
    });
  }
);



