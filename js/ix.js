var ix = {
  appPath: '/',
  jsPath: '/third-js/',
  bases: {
    lms: 'https://app.lms.unimelb.edu.au/bbcswebdav/courses/INFO20002_2015_SM1/slides/%s',
    gsheet: 'https://docs.google.com/spreadsheet/ccc?%s',
    gsite: 'https://sites.google.com/site/gssheet/%s'
  },
  icons: {
    print: '<i class="fa fa-print"></i>',
    html: '<i class="fa fa-file-text-o"></i>',
    pdf: '<i class="fa fa-file-pdf-o"></i>',
    ppt: '<i class="fa fa-file-powerpoint-o"></i>',
    code: '<i class="fa fa-file-code-o"></i>',
    data: '<i class="fa fa-file-excel-o"></i>',
    link: '<i class="fa fa-external-link"></i>'
  },
  onLoads: []
};

(function() {
  var path = window.location.href.match(/[^\/]+?\/(ix)\/(.*)/);
  if (path) {
    // ix.appPath = new Array(path[2].match(/\//g).length + 1).join('../');
    ix.appPath = '/ix/';
  }
  ix.jsPath = ix.appPath + 'third-js/';

  ix.docPath = window.location.href.match(/pages\/page\.html\?src=(\/.+?\/)[^\/]+\.(md|htm)/);
  if (ix.docPath) {
    ix.docPath = ix.docPath[1];
  }
  ix.bases['ix-lecture'] = ix.appPath + 'pages/page.html?src=' + ix.appPath + 'lectures/%s';
  ix.bases['ix-workshop'] = ix.appPath + 'pages/page.html?src=' + ix.appPath + 'workshops/%s';
  ix.bases['ix-project'] = ix.appPath + 'pages/page.html?src=' + ix.appPath + 'project/%s';

  ix.register = function (f) {
    ix.onLoads.push(f);
  };
  ix.markdown = function (node, md) {
    $(node).replaceWith(marked(md));
  };

  ix.highlight = function (node) {
    hljs.highlightBlock(node);
  };
  
  ix.configMathjax = function () {
    MathJax.Hub.Config({
      showProcessingMessages: false,
      messageStyle: "none",
      tex2jax: {
        inlineMath: [ ['$', '$'], ["\\(", "\\)"] ],
        displayMath: [ ['$$', '$$'], ["\\[", "\\]"] ],
        processEscapes: false
      },
      // skipStartupTypeset: true,
      TeX: { equationNumbers: { autoNumber: "AMS" } },
      mathjax: ix.jsPath + 'MathJax/MathJax.js?config=TeX-AMS-MML_HTMLorMML' 
    });    
  };  
  
  ix.initMathjax = function () {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src  = ix.jsPath + 'MathJax/MathJax.js?config=TeX-AMS-MML_SVG';
    document.getElementsByTagName("head")[0].appendChild(script);  
  };

  ix.initReveal = function () {
    Reveal.initialize({
      controls: true,
      progress: true,
      history: true,
      center: false,
      // math: {
      //   mathjax: ix.jsPath + 'MathJax/MathJax.js?config=TeX-AMS-MML_HTMLorMML'
      // },
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
        // { src: revealPluginPath + 'math/math.js', async: true }
      ]
    });
    Reveal.addEventListener('ready', function (event) {
      // event.currentSlide, event.indexh, event.indexv
      // MathJax.Hub.Queue(
      //   ["Typeset", MathJax.Hub, $('body')[0]],
      //   ["mathDone", ix],
      //   ["resetEquationNumbers", MathJax.InputJax.TeX]
      // );
    });    
  };  

  ix.doOnLoads = function () {
    _.each(ix.onLoads, function (f) {
      f();
    })
  };

  ix.doLinks = function () {
    var innerHTML;

    var target = $('body')[0].getAttribute('target');
    $('a').each(function (i, node) {
      if (target) {
        node.setAttribute('target', target);
      }
      var base = node.getAttribute('base');
      var href = node.getAttribute('href');
      if (base === 'disable') {
        innerHTML = node.innerHTML;
        $(node).replaceWith(innerHTML);
      } else if (base in ix.bases) {
        node.setAttribute('href', _.sprintf(ix.bases[base], href));
      } else if (href.substring(0,4) !== 'http' && ix.docPath) {
        node.setAttribute('href', ix.docPath + href);
      }
      var file = node.getAttribute('file');
      if (file) {
        node.innerHTML = ix.icons[file] + node.innerHTML;
      }
    });
    $('img').each(function (i, node) {
      var base = node.getAttribute('base');
      var src = node.getAttribute('src');
      if (base in ix.bases) {
        node.setAttribute('src', _.sprintf(ix.bases[base], src));
      } else if (src.substring(0,4) !== 'http' && ix.docPath) {
        node.setAttribute('src', ix.docPath + src);
      }
    });
  };

  ix.doMath = function (callback) {
    ix.mathCallback = callback;
    var mathPresent = 0;
    $("div[class='math']") // only supported within external markdown
      .contents()
      .filter(function (){ return this.nodeType == 8; })
      .each(function (i, node) {
        var mathBlob = node.nodeValue;
        var parent = node.parentNode;
        $(parent).empty();
        parent.innerHTML = mathBlob;
        mathPresent = 1;
      });
    if (mathPresent) {
      MathJax.Hub.Queue(
        ["Typeset", MathJax.Hub, $('body')[0]],
        ["mathDone", ix],
        ["resetEquationNumbers", MathJax.InputJax.TeX]
      );
    }
  };

  ix.mathDone = function () {
    if (ix.mathCallback) { ix.mathCallback(); }
  };

  ix.doTitle = function () {
    $(document)[0].title = $('body title').text() || $('h1').text();
  };

  ix.escapeHTML = function (snippet) {
    // escaping HTML codes
    return snippet.replace(
      /(<code class="html">)((.*?\n)*?)(<\/code>)/g,
      function replacer(match, p1, p2, p3, p4, offset, string) {
        return p1 + _.escape(p2) + p4;
      }
    );
  };

  ix.slurpMarkdown = function (callback) {
    var k = 0;
    $("script[type='text/x-markdown']").each(function (i, node) {
      var url = node.getAttribute("src");
      if (url) {
        k++;
        $.get(url, function (data) {
          ix.markdown(node, data);
          k--;
          if (!k) { callback(); }
        });
      } else {
        ix.markdown(node, node.innerHTML);
      }
    });
    if (!k) { callback(); }
  };

  ix.slurpCode = function (callback) {
    var k = 0;
    $("pre[type='text/code']").each(function (i, node) {
      var url = node.getAttribute("href");
      k++;
      $.get(url, function (data) {
        var codeNode = document.createElement( "code" );
        $(node).append(codeNode);
        codeNode.innerHTML = _.escape(data);
        k--;
        if (!k) { callback(); }
      });
    });
    if (!k) { callback(); }
  };

  ix.doHighlight = function () {
    $('pre code').each(function (i, node) {
      ix.highlight(node);
    });
  };

  ix.highchartsTheme = function () {
    Highcharts.theme = {
      chart: {
        backgroundColor:'rgba(255, 255, 255, 0)',
        plotBackgroundColor:'rgba(255, 255, 255, 0)',
        plotBorderWidth: 0
      }
    };

    // Apply the theme
    var highchartsOptions = Highcharts.setOptions(Highcharts.theme);

  };

}());
