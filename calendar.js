
// +-+-+-+-+ +-+-+-+-+-+-+-+-+-+ +-+-+-+-+              
// |V|A|S|T| |C|H|A|L|L|E|N|G|E| |2|0|1|7|              
// +-+-+-+-+ +-+-+-+-+-+-+-+-+-+ +-+-+-+-+              
// PETER VAN TWUYVER, 10872809
// MINOR PROGRAMMEREN UVA 2017
// +-+-+-+-+ +-+-+-+-+-+-+-+-+-+ +-+-+-+-+  


var width = 960,
    height = 136,
    cellSize = 17;

var color = d3.scaleLinear()
                .domain([5, 250]) // MUST BE RELATIVE TO MIN AND MAX
                .range(["#fee0d2", "#de2d26"]);

var svg = d3.select("body")
  .selectAll("svg")
  .data(d3.range(2015, 2017))
  .enter().append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

svg.append("text")
    .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("text-anchor", "middle")
    .text(function(d) { return d; });

  svg.append("text")
    .attr("font-family", "sans-serif")
    .attr("font-size", 15)
    .attr('x', 10)
    .attr('y', -5)
    .attr("text-anchor", "under")
    .text("Number of unique vehicles MOVING in the park");


var rect = svg.append("g")
    .attr("fill", "none")
    .attr("stroke", "#ccc")
  .selectAll("rect")
  .data(function(d) { return d3.timeDays(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
  .enter().append("rect")
    .attr("width", cellSize)
    .attr("height", cellSize)
    .attr("x", function(d) { return d3.timeWeek.count(d3.timeYear(d), d) * cellSize; })
    .attr("y", function(d) { return d.getDay() * cellSize; })
    .datum(d3.timeFormat("%d/%m/%Y"));

svg.append("g")
    .attr("fill", "none")
    .attr("stroke", "#000")
  .selectAll("path")
  .data(function(d) { return d3.timeMonths(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
  .enter().append("path")
    .attr("d", pathMonth);


d3.csv("busyness_by_type.csv", function(error, csv) {
  if (error) throw error;

  var data = d3.nest()
      .key(function(d) { return d.Day; })
      .rollup(function(d) { return (d[0].Total) }) // Total busyness in park
      .object(csv);
console.log(csv)
  rect.filter(function(d) { return d in data; })
      .attr("fill", function(d) { return color(data[d]); })
    .append("title")
      .text(function(d) { return d + ": " + data[d]; });
});

function pathMonth(t0) {
  var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
      d0 = t0.getDay(), w0 = d3.timeWeek.count(d3.timeYear(t0), t0),
      d1 = t1.getDay(), w1 = d3.timeWeek.count(d3.timeYear(t1), t1);
  return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
      + "H" + w0 * cellSize + "V" + 7 * cellSize
      + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
      + "H" + (w1 + 1) * cellSize + "V" + 0
      + "H" + (w0 + 1) * cellSize + "Z";
}


