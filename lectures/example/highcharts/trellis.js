var irisData = null;
var attrs = ["petal length", "petal width", "sepal length", "sepal width"];

function plotScatter(container, series, legend) {
  $(container).highcharts({
    chart: {
      type: 'scatter',
      renderTo: container,
      plotBorderWidth: 1
    },
    title: {
      text: null
    },
    xAxis: {
      title: {
        enabled: false
      },
      tickInterval: 1,
      min: 0,
      startOnTick: true,
      endOnTick: true
    },
    yAxis: {
      title: {
        enabled: false
      },
      min: 0,
      tickInterval: 1,
      tickWidth: 1,
      tickLength: 10,
      gridLineWidth: 0,
      minorGridLineWidth: 0
    },
    credits: { enabled: false },
    legend: legend ? {
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'top',
      x: 30,
      y: 10,
      floating: true,
      backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
      borderWidth: 1
    } : { enabled: false },
    plotOptions: {
      scatter: {
        marker: {
          radius: 5,
          states: {
            hover: {
              enabled: true,
              lineColor: 'rgb(100,100,100)'
            }
          }
        },
        tooltip: {
          headerFormat: '<b>{series.name}</b><br>',
          pointFormat: '{point.x} cm, {point.y} cm'
        }
      }
    },
    series: series
  });
}

function makeSeries(data, xAttr, yAttr) {
  var hash = {}, classNum = 0;
  $.each(data, function (index, row) {
    var klass = row.class;
    var serie = hash[klass];
    if (!serie) {
      var color = colorbrewer.Paired[12][classNum % 12]; // get colors from brewer
      serie = hash[klass] = {
        name: klass,
        data: [],
        color: chroma(color).alpha(0.5).css()
      }
      classNum++;
    };
    var x = row[xAttr];
    var y = row[yAttr];
    serie.data.push([x, y]);
  });
  var series = [];
  $.each(hash, function (klass, serie) {
    series.push(serie);
  });
  return series;
}

function plotTrellis() {
  var xAttr, yAttr, series;
  for (var i = 0; i < attrs.length; i++) {
    yAttr = attrs[i];
    for (var j = 0; j < attrs.length; j++) {
      xAttr = attrs[j];
      series = makeSeries(irisData, xAttr, yAttr);
      plotScatter('#container-' + i + '-' + j, series, (!i && !j));
    }
  }
}

function getData() {
  $.ajax({
    type: "GET",
    url: "iris.json",
    success: function(data) {
      irisData = data;
      plotTrellis();
    }
  });
}

function makeTable() {
  var table = $('<table id="trellis" />'), xAttr, yAttr, tr, td;
  for (var i = 0; i < attrs.length; i++) {
    yAttr = attrs[i];
    if (!i) { // build header
      tr = $('<tr />');
      tr.append($('<td />'));
      for (var j = 0; j < attrs.length; j++) {
        xAttr = attrs[j];
        td = $('<td class="header">' + xAttr + '</td>');
        tr.append(td);
      }
      table.append(tr);
    }
    tr = $('<tr />');
    tr.append($('<td class="side">' + yAttr + '</td>'));
    for (var j = 0; j < attrs.length; j++) {
      xAttr = attrs[j];
      td = $('<td class="container" id="container-' + i + '-' + j + '"/>');
      tr.append(td);
    }
    table.append(tr);
  }
  $('body').append(table);
  getData();
}

$(document).ready(makeTable);