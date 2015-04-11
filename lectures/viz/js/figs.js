
(function () {

  ix.figures.preattentive = function (id) {

    var svg = d3.select(id)
      .append("svg:svg").attr("width", size.width).attr("height", size.height)
      .attr("class", "container");

    var n = 12;

    var set = _.map(_.range(0, 12), function (i) {

    });
    svg.append("g").selectAll("circle")
      .data(set)
      .enter().append("circle") // <-C
      .attr("class", "dot")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", 4.5)
      .style("background-color", "#e9967a");

  };
})();
