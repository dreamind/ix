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
    html: '<i class="fa fa-file-html-o"></i>',
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

  ix.register = function (f) {
    ix.onLoads.push(f);
  };
  ix.markdown = function (node, md) {
    $(node).replaceWith(marked(md));
  };

  ix.highlight = function (node) {
    hljs.highlightBlock(node);
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
    /**
     * Dark blue theme for Highcharts JS
     * @author Torstein Honsi
     */

    Highcharts.theme = {
      colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
        "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
      chart: {
        backgroundColor: 'rgb(34, 34, 34)',
        style: {
          fontFamily: "'Source Sans Pro', sans-serif"
        },
        plotBorderColor: 'rgb(34, 34, 34)'
      },
      title: {
        style: {
          color: '#E0E0E3',
          textTransform: 'uppercase',
          fontSize: '20px'
        }
      },
      subtitle: {
        style: {
          color: '#E0E0E3',
          textTransform: 'uppercase'
        }
      },
      xAxis: {
        gridLineColor: '#707073',
        labels: {
          style: {
            color: '#E0E0E3'
          }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        title: {
          style: {
            color: '#A0A0A3'

          }
        }
      },
      yAxis: {
        gridLineColor: '#707073',
        labels: {
          style: {
            color: '#E0E0E3'
          }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        tickWidth: 1,
        title: {
          style: {
            color: '#A0A0A3'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        style: {
          color: '#F0F0F0'
        }
      },
      plotOptions: {
        series: {
          dataLabels: {
            color: '#B0B0B3'
          },
          marker: {
            lineColor: '#333'
          }
        },
        boxplot: {
          fillColor: '#505053'
        },
        candlestick: {
          lineColor: 'white'
        },
        errorbar: {
          color: 'white'
        }
      },
      legend: {
        itemStyle: {
          color: '#E0E0E3'
        },
        itemHoverStyle: {
          color: '#FFF'
        },
        itemHiddenStyle: {
          color: '#606063'
        }
      },
      credits: {
        style: {
          color: '#666'
        }
      },
      labels: {
        style: {
          color: '#707073'
        }
      },

      drilldown: {
        activeAxisLabelStyle: {
          color: '#F0F0F3'
        },
        activeDataLabelStyle: {
          color: '#F0F0F3'
        }
      },

      navigation: {
        buttonOptions: {
          symbolStroke: '#DDDDDD',
          theme: {
            fill: '#505053'
          }
        }
      },

      // scroll charts
      rangeSelector: {
        buttonTheme: {
          fill: '#505053',
          stroke: '#000000',
          style: {
            color: '#CCC'
          },
          states: {
            hover: {
              fill: '#707073',
              stroke: '#000000',
              style: {
                color: 'white'
              }
            },
            select: {
              fill: '#000003',
              stroke: '#000000',
              style: {
                color: 'white'
              }
            }
          }
        },
        inputBoxBorderColor: '#505053',
        inputStyle: {
          backgroundColor: '#333',
          color: 'silver'
        },
        labelStyle: {
          color: 'silver'
        }
      },

      navigator: {
        handles: {
          backgroundColor: '#666',
          borderColor: '#AAA'
        },
        outlineColor: '#CCC',
        maskFill: 'rgba(255,255,255,0.1)',
        series: {
          color: '#7798BF',
          lineColor: '#A6C7ED'
        },
        xAxis: {
          gridLineColor: '#505053'
        }
      },

      scrollbar: {
        barBackgroundColor: '#808083',
        barBorderColor: '#808083',
        buttonArrowColor: '#CCC',
        buttonBackgroundColor: '#606063',
        buttonBorderColor: '#606063',
        rifleColor: '#FFF',
        trackBackgroundColor: '#404043',
        trackBorderColor: '#404043'
      },

      // special colors for some of the
      legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
      background2: '#505053',
      dataLabelsColor: '#B0B0B3',
      textColor: '#C0C0C0',
      contrastTextColor: '#F0F0F3',
      maskColor: 'rgba(255,255,255,0.3)'
    };

    // Apply the theme
    Highcharts.setOptions(Highcharts.theme);
  };

}());
