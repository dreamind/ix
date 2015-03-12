// based on
// http://blog.pixelingene.com/2011/07/building-a-tree-diagram-in-d3-js/

(function () {

  function visit(parent, visitFn, childrenFn) {
    if (!parent) {
      return;
    }
    visitFn(parent);
    var children = childrenFn(parent);
    if (children) {
      var count = children.length;
      for (var i = 0; i < count; i++) {
        visit(children[i], visitFn, childrenFn);
      }
    }
  }

  ix.figures.encoding = function buildTree(containerName, treeData, customOptions) {
    // build the options object
    var options = $.extend({
      nodeRadius: 40, fontSize: 14
    }, customOptions);

    var nodeHeight = 80;
    var totalNodes = 0;
    var maxLabelLength = 0;
    visit(treeData, function (d) {
      totalNodes++;
      maxLabelLength = Math.max(d.name.length, maxLabelLength);
    }, function (d) {
      return d.children && d.children.length > 0 ? d.children : null;
    });

    // size of the diagram
    var size = {width: $(containerName).outerWidth(), height: totalNodes * nodeHeight};
    maxLabelLength = 10;
    var offset = maxLabelLength * options.fontSize * 2;
    var tree = d3.layout.tree()
      .sort(null)
      .size([size.height, size.width - offset])
      .children(function (d) {
        return (!d.children || d.children.length === 0) ? null : d.children;
      });

    var nodes = tree.nodes(treeData);
    var links = tree.links(nodes);
    var layoutRoot = d3.select(containerName)
      .append("svg:svg").attr("width", size.width).attr("height", size.height)
      .append("svg:g")
      .attr("class", "container")
      .attr("transform", "translate(" + offset/2  + ",0)");

    var link = d3.svg.diagonal()
      .projection(function (d) {
        return [d.y, d.x];
      });

    layoutRoot.selectAll("path.link")
      .data(links)
      .enter()
      .append("svg:path")
      .attr("class", "link")
      .attr('marker-end', 'url(#arrowhead)')
      .attr("d", link)
      .attr("id", function (d, i) {return containerName + 'edgepath' + i});

    var edgelabels = layoutRoot.selectAll(".edgelabel")
      .data(links)
      .enter()
      .append('svg:text')
      .style("pointer-events", "none")
      .attr({
        'class': 'edgelabel',
        'id': function (d, i) {return 'edgelabel' + i},
        'dx': size.width/3,
        'dy': -10,
        'font-size': 20,
        'fill': '#333333'
      });

    edgelabels.append('svg:textPath')
      .attr('xlink:href', function (d, i) {return '#' + containerName + 'edgepath' + i})
      .style("pointer-events", "none")
      .text(function (d, i) {return treeData.labels[i]; });

    var nodeGroup = layoutRoot.selectAll("g.node")
      .data(nodes)
      .enter()
      .append("svg:g")
      .attr("class", "node")
      .attr("transform", function (d) {
        return "translate(" + d.y + "," + d.x + ")";
      });

    nodeGroup.append("svg:circle")
      .attr("class", "node-dot")
      .attr("r", options.nodeRadius);

    nodeGroup.append("svg:text")
      .attr("text-anchor", function (d) {
        return 'middle';
      })
      .attr("dx", function (d) {
        return 0;
        //var gap = 2 * options.nodeRadius;
        //return d.children ? -gap : gap;
      })
      .attr("dy", options.fontSize/2)
      .text(function (d) {
        return d.name;
      });

    layoutRoot.append('defs').append('marker')
      .attr({
        'id': 'arrowhead',
        'viewBox': '-0 -10 20 20',
        'refX': options.nodeRadius + 20,
        'refY': 0,
        //'markerUnits':'strokeWidth',
        'orient': 'auto',
        'markerWidth': 20,
        'markerHeight': 20,
        'xoverflow': 'visible'
      })
      .append('svg:path')
      .attr('d', 'M 0,-10 L 20 ,0 L 0,10')
      .attr('fill', '#ccc')
      .attr('stroke', '#ccc');
  };
})();
