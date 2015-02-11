var jsPath = '../../third-js/';
var revealPath = jsPath + 'reveal.js/';
var revealPluginPath = revealPath + 'plugin/';

// Start the main app logic.
requirejs([
    revealPluginPath + 'markdown/marked.js',
    jsPath + 'jquery/jquery.js',
    jsPath + 'underscore/underscore.js',
    revealPath + 'lib/js/head.min.js',
    revealPath + 'js/reveal.js'
  ],
  function (marked, jquery) {

    // requirejs has its own 'this'
    console.log(marked, jquery, $);
    window.marked = marked;

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
              hljs.initHighlighting();
              ix.slurpCode();
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

          {src: revealPluginPath + 'zoom-js/zoom.js', async: true},
          {src: revealPluginPath + 'notes/notes.js', async: true},
          {src: revealPluginPath + '/math/math.js', async: true}
        ]
      });
      Reveal.addEventListener('ready', function (event) {
        // event.currentSlide, event.indexh, event.indexv
        //hljs.initHighlighting();
      });
    });
  }
);



