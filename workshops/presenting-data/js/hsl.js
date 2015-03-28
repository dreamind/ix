(function () {

  ix.figures.hsl = function buildTree(id) {

    var h = (Math.sqrt(3)/2),
        radius = 300,
        xp = 400,
        yp = 400,
        nodes = [
          { "x": radius+xp,   "y": yp},
          { "x": radius/2+xp,  "y": radius*h+yp},
          { "x": -radius/2+xp,  "y": radius*h+yp},
          { "x": -radius+xp,  "y": yp},
          { "x": -radius/2+xp,  "y": -radius*h+yp},
          { "x": radius/2+xp, "y": -radius*h+yp}
        ];

    var root = d3.select(id)
      .append("svg:svg").attr("width", radius * 2).attr("height", radius * 2)

    var nodeGroup = root.selectAll("g.node")
      .data(nodes)
      .enter()
      .append("svg:g")
      .attr("class", "node")
      .attr("transform", function (d) {
        return "translate(" + d.y + "," + d.x + ")";
      });

    nodeGroup.append("svg:circle")
      .attr("class", "node-dot")
      .attr("r", 20);

  }

})();