var ix = {};

(function() {
  var path = window.location.href.match(/[^\/]+?\/(ix)\/(.*)/);
  if (path) {
    ix.appPath = new Array(path[2].match(/\//g).length + 1).join('../');
  } else {
    ix.appPath = '/';
  }
  ix.jsPath = ix.appPath + 'third-js/';

  ix.markdown = function (node, md) {
    $(node).replaceWith(marked(md));
  };

  ix.highlight = function (node) {
    hljs.highlightBlock(node);
  };

  ix.slurpMarkdown = function () {
    $("script[type='text/x-markdown']").each(function (i, node) {
      var url = node.getAttribute("src");
      if (url) {
        $.get(url, function (data) {
          ix.markdown(node, data);
        });
      } else {
        ix.markdown(node, node.innerHTML);
      }
    });
  };

  ix.slurpCode = function () {
    $("pre[type='text/code']").each(function (i, node) {
      var url = node.getAttribute("href");
      $.get(url, function (data) {
        var codeNode = document.createElement( "code" );
        $(node).append(codeNode);
        codeNode.innerHTML = data;
        ix.highlight(codeNode);
      });
    });
  };

  ix.doHighlight = function () {
    $('pre code').each(function (i, node) {
      ix.highlight(node);
    });
  };

}());
