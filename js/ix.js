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
    pdf: '<i class="fa fa-file-pdf-o"></i>',
    ppt: '<i class="fa fa-file-powerpoint-o"></i>',
    code: '<i class="fa fa-file-code-o"></i>',
    data: '<i class="fa fa-file-excel-o"></i>',
    link: '<i class="fa fa-external-link"></i>'
  }
};

(function() {
  var path = window.location.href.match(/[^\/]+?\/(ix)\/(.*)/);
  if (path) {
    // ix.appPath = new Array(path[2].match(/\//g).length + 1).join('../');
    ix.appPath = '/ix/';
  }
  ix.jsPath = ix.appPath + 'third-js/';
  ix.bases['ix-lecture'] = ix.appPath + 'pages/page.html?src=' + ix.appPath + 'lectures/%s';
  ix.bases['ix-workshop'] = ix.appPath + 'pages/page.html?src=' + ix.appPath + 'workshops/%s';

  ix.markdown = function (node, md) {
    $(node).replaceWith(marked(md));
  };

  ix.highlight = function (node) {
    hljs.highlightBlock(node);
  };

  ix.doLinks = function () {
    var target = $('body')[0].getAttribute('target');
    $('a').each(function (i, node) {
      if (target) {
        node.setAttribute('target', target);
      }
      var base = node.getAttribute('base');
      if (base) {
        if (base === 'disable') {
          var innerHTML = node.innerHTML;
          $(node).replaceWith(innerHTML);
        } else {
          var href = node.getAttribute('href');
          node.setAttribute('href', _.sprintf(ix.bases[base], href));
        }
      }
      var file = node.getAttribute('file');
      if (file) {
        node.innerHTML = ix.icons[file] + node.innerHTML;
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

}());
