var ix = {
  appPath: '/',
  jsPath: '/third-js/',
  bases: {
  }
};

(function() {
  var path = window.location.href.match(/[^\/]+?\/(ix)\/(.*)/);
  if (path) {
    ix.appPath = new Array(path[2].match(/\//g).length + 1).join('../');
  }
  ix.jsPath = ix.appPath + 'third-js/';

  ix.markdown = function (node, md) {
    $(node).replaceWith(marked(md));
  };

  ix.highlight = function (node) {
    hljs.highlightBlock(node);
  };

  ix.escape = function (snippet) {
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
