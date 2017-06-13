// +-+-+-+-+ +-+-+-+-+-+-+-+-+-+ +-+-+-+-+              
// |V|A|S|T| |C|H|A|L|L|E|N|G|E| |2|0|1|7|              
// +-+-+-+-+ +-+-+-+-+-+-+-+-+-+ +-+-+-+-+              
// PETER VAN TWUYVER, 10872809
// MINOR PROGRAMMEREN UVA 2017
// +-+-+-+-+ +-+-+-+-+-+-+-+-+-+ +-+-+-+-+  
function onRectClicked(item) {
    console.log(item);
    //drawLinechart(for specific date/location);
}
window.onload = function() {
    getOption();
};
// get User selection and select appropriate function to draw svg's
function getOption() {
    var obj = document.getElementById("mySelect");
    if (obj.value == "Campsites") {
        //drawLinechart("data/sensor_data__per_minute_camping0.tsv");

        //showData("data/fake_all_camps.csv");
        showData("data/all_camps.csv"); //INCORRECT FILE! MIST DAGEN BIJ TOTAL
        // type-calendars
        
        var all_types = ['camping0', 'camping1', 'camping2', 'camping3', 'camping4', 'camping5', 'camping6', 'camping7', 'camping8'];
        // send data from each row to Draw function
        all_types.forEach(function(item) {
            drawLocations(item);
        });
    }
    if (obj.value == "Entrances") {
     
        showData("data/all_entrances.csv"); //INCORRECT FILE! MIST DAGEN BIJ TOTAL
        // type-calendars
        
        var all_types = ['entrance0', 'entrance1', 'entrance2', 'entrance3', 'entrance4'];
        // send data from each row to Draw function
        all_types.forEach(function(item) {
            drawLocations(item);
        });
    }
    if (obj.value == "Total") {
        drawLinechart("data/yeartraffic_park.tsv");
        // main calendar
        showData("data/busyness_by_type.csv");
        // type-calendars
        var all_types = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Ranger'];
        // send data from each row to Draw function
        all_types.forEach(function(item) {
            drawType(item);
        });
    }
}

// bind data based on csv file chosen
function showData(csv_file_name) {
    d3.csv(csv_file_name, function(error, csv) {
        if (error) throw error;

        console.log("Read: " + csv_file_name);

        var data = d3.nest()
            .key(function(d) {
                return d.Day;
            })
            .rollup(function(v) {
                // console.log(d3.sum(v, function(d) { return d.Total; }))
                return d3.sum(v, function(d) {
                    return d.Total;
                });
                //return (d[0].Total)

            })
            .object(csv);
        drawTotalCalendar(data);

    });
}

// draw the main calendar
function drawTotalCalendar(my_data) {

    var width = 650,
        height = 100,
        cellSize = 10;
    // set colorgradient for min/max values
    var max = d3.max(d3.values(my_data));
    var min = d3.min(d3.values(my_data));
    console.log("min/max in Total: ", min, max)
    var color = d3.scaleLinear()
        .domain([min, max])
        .range(["#fee0d2", "#de2d26"]);

    // Root SVG objects within #calendar div
    var cal = d3.select("#calendar")
        .selectAll("svg")
        .data(d3.range(2015, 2017)); // range of years
    // remove old data in calendar
    cal.exit().remove();

    var svg = cal.enter().append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

    // Defines test for year in calendar
    svg.append("text")
        .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "middle")
        .text(function(d) {
            return d;
        });

    svg.append("text")
        .attr("font-family", "sans-serif")
        .attr("font-size", 15)
        .attr('x', 10)
        .attr('y', -5)
        .attr("text-anchor", "under")
        .text("Number of unique vehicles");

    var rectSelect = svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "#ccc")
        .selectAll("rect")
        .data(function(year) {
            return d3.timeDays(new Date(year, 0, 1), new Date(year + 1, 0, 1));
        });

    var rect = rectSelect
        .enter().append("rect")
        .attr("width", cellSize)
        .attr("height", cellSize)
        .attr("x", function(d) {
            return d3.timeWeek.count(d3.timeYear(d), d) * cellSize;
        })
        .attr("y", function(d) {
            return d.getDay() * cellSize;
        })
        .datum(d3.timeFormat("%d/%m/%Y"))
        .on('click', onRectClicked)
        // .on('click', function(){
        //     var coords = d3.mouse(this);
        //     console.log(coords)
        // })
        .append('title');

    svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "#000")
        .selectAll("path")
        .data(function(d) {
            return d3.timeMonths(new Date(d, 0, 1), new Date(d + 1, 0, 1));
        })
        .enter().append("path")
        .attr("d", pathMonth);

    d3.select("#calendar").selectAll("rect")
        .attr("fill", function(d) {

            if (d in my_data) {
                return color(my_data[d]);
            } else {
                return "grey";
            }

        })
        .select("title")
        .text(function(d) {
            if (d in my_data) {
                return d + ": " + my_data[d];
            } else {
                return "No data";
            }


        });

    // create visual line separating months
    function pathMonth(t0) {
        var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
            d0 = t0.getDay(),
            w0 = d3.timeWeek.count(d3.timeYear(t0), t0),
            d1 = t1.getDay(),
            w1 = d3.timeWeek.count(d3.timeYear(t1), t1);
        return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize +
            "H" + w0 * cellSize + "V" + 7 * cellSize +
            "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize +
            "H" + (w1 + 1) * cellSize + "V" + 0 +
            "H" + (w0 + 1) * cellSize + "Z";
    }
};

// draws the sub-calendars for Types
function drawType(which_type) {
    var width = 460,
        height = 100,
        cellSize = 8;

    // append sub-calendars under the main calendar
    var root = d3.select('#subcalendar').append('div');
    root.exit().remove();

    var svg = root
        .selectAll("svg")
        .data(d3.range(2015, 2017))
        .enter().append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");
d3.select("root").exit().remove();
    svg.append("text")
        .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "middle")
        .text(function(d) {
            return d;
        });

    svg.append("text")
        .attr("font-family", "sans-serif")
        .attr("font-size", 15)
        .attr('x', 10)
        .attr('y', -5)
        .attr("text-anchor", "under")
        .text("Total moving vehicles of Type " + which_type);


    var rect = svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "#ccc")
        .selectAll("rect")
        .data(function(d) {
            return d3.timeDays(new Date(d, 0, 1), new Date(d + 1, 0, 1));
        })
        .enter().append("rect")
        .attr("width", cellSize)
        .attr("height", cellSize)
        .attr("x", function(d) {
            return d3.timeWeek.count(d3.timeYear(d), d) * cellSize;
        })
        .attr("y", function(d) {
            return d.getDay() * cellSize;
        })
        .datum(d3.timeFormat("%d/%m/%Y"))
        .on('click', onRectClicked);

    svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "#000")
        .selectAll("path")
        .data(function(d) {
            return d3.timeMonths(new Date(d, 0, 1), new Date(d + 1, 0, 1));
        })
        .enter().append("path")
        .attr("d", pathMonth);


    d3.csv("data/busyness_by_type.csv", function(error, csv) {
        if (error) throw error;

        var data = d3.nest()
            .key(function(d) {

                return d.Day;
            })
            .rollup(function(d) {
                return parseInt(d[0][which_type])
            })
            .object(csv);
        console.log("data in Types: ", data)

        // set colorgradient for min/max values
        var max = d3.max(d3.values(data));
        var min = d3.min(d3.values(data));
        console.log("min/max for type " + which_type, min, max)

        var color = d3.scaleLinear()
            .domain([min, max])
            .range(["#fee0d2", "#de2d26"]);

        rect.filter(function(d) {
                return d in data;
            })
            .attr("fill", function(d) {
                return color(data[d]);
            })
            .append("title")
            .text(function(d) {
                return d + ": " + data[d];
            });
    });

    function pathMonth(t0) {
        var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
            d0 = t0.getDay(),
            w0 = d3.timeWeek.count(d3.timeYear(t0), t0),
            d1 = t1.getDay(),
            w1 = d3.timeWeek.count(d3.timeYear(t1), t1);
        return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize +
            "H" + w0 * cellSize + "V" + 7 * cellSize +
            "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize +
            "H" + (w1 + 1) * cellSize + "V" + 0 +
            "H" + (w0 + 1) * cellSize + "Z";
    }
};

// draws the sub-calendars for locations
function drawLocations(which_location) {

    var width = 560,
        height = 100,
        cellSize = 10;

    var color = d3.scaleLinear()
        .domain([0, 122]) // MUST BE RELATIVE TO MIN AND MAX
        .range(["#fee0d2", "#de2d26"]);

    // append sub-calendars under the main calendar
    var root = d3.select('#subcalendar').append('div');

    var svg = root
        .selectAll("svg")
        .data(d3.range(2015, 2017))
        .enter().append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");
d3.select("root").exit().remove();
    svg.append("text")
        .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "middle")
        .text(function(d) {
            return d;
        });

    svg.append("text")
        .attr("font-family", "sans-serif")
        .attr("font-size", 15)
        .attr('x', 10)
        .attr('y', -5)
        .attr("text-anchor", "under")
        .text("Moving vehicles at " + which_location);


    var rect = svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "#ccc")
        .selectAll("rect")
        .data(function(d) {
            return d3.timeDays(new Date(d, 0, 1), new Date(d + 1, 0, 1));
        })
        .enter().append("rect")
        .attr("width", cellSize)
        .attr("height", cellSize)
        .attr("x", function(d) {
            return d3.timeWeek.count(d3.timeYear(d), d) * cellSize;
        })
        .attr("y", function(d) {
            return d.getDay() * cellSize;
        })
        .datum(d3.timeFormat("%d/%m/%Y"))
        .on('click', onRectClicked);

    svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "#000")
        .selectAll("path")
        .data(function(d) {
            return d3.timeMonths(new Date(d, 0, 1), new Date(d + 1, 0, 1));
        })
        .enter().append("path")
        .attr("d", pathMonth);


    d3.csv("data/busylocations.csv", function(error, csv) {
        if (error) throw error;

        var data = d3.nest()
            .key(function(d) {

                if (d.Day.length == 8) {
                    return d.Day.substring(0, 6) + "20" + d.Day.substring(6, 8);
                }



                return d.Day;
            })
            .rollup(function(d) {

                return parseInt(d[0][which_location])
            })
            .object(csv);
        console.log("data in Locations: ", data)
        // set colorgradient for min/max values
        var max = d3.max(d3.values(data));
        var min = d3.min(d3.values(data));
        console.log("min/max for type " + which_location, min, max)

        var color = d3.scaleLinear()
            .domain([min, max])
            .range(["#fee0d2", "#de2d26"]);

        rect.filter(function(d) {
                return d in data;
            })
            .attr("fill", function(d) {
                return color(data[d]);
            })
            .append("title")
            .text(function(d) {
                return d + ": " + data[d];
            });
    });

    function pathMonth(t0) {
        var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
            d0 = t0.getDay(),
            w0 = d3.timeWeek.count(d3.timeYear(t0), t0),
            d1 = t1.getDay(),
            w1 = d3.timeWeek.count(d3.timeYear(t1), t1);
        return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize +
            "H" + w0 * cellSize + "V" + 7 * cellSize +
            "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize +
            "H" + (w1 + 1) * cellSize + "V" + 0 +
            "H" + (w0 + 1) * cellSize + "Z";
    }
};

function drawLinechart(linechart_file){
var svg = d3.select("#linechart").select("svg"),

    margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");



var parseTime = d3.timeParse("%d-%m-%Y");

var x = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    z = d3.scaleOrdinal(d3.schemeCategory10);

var line = d3.line()
    .curve(d3.curveBasis)
    .x(function(d) { return x(d.Day); })
    .y(function(d) { return y(d.vehicles); });

d3.tsv(linechart_file, type, function(error, data) {
  if (error) throw error;

  var types = data.columns.slice(1).map(function(id) {
    return {
      id: id,
      values: data.map(function(d) {
        return {Day: d.Day, vehicles: d[id]};
      })
    };
  });

  x.domain(d3.extent(data, function(d) { return d.Day; }));

  y.domain([
    d3.min(types, function(c) { return d3.min(c.values, function(d) { return d.vehicles; }); }),
    d3.max(types, function(c) { return d3.max(c.values, function(d) { return d.vehicles; }); })
  ]);

  z.domain(types.map(function(c) { return c.id; }));

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("fill", "#000")
      .text("Unique vehicles");

  var type = g.selectAll(".type")
    .data(types)
    .enter().append("g")
      .attr("class", "type");

  type.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return z(d.id); });

  type.append("text")
      .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.Day) + "," + y(d.value.vehicles) + ")"; })
      .attr("x", 3)
      .attr("dy", "0.35em")
      .style("font", "10px sans-serif")
      .text(function(d) { return d.id; });
});

function type(d, _, columns) {
  d.Day = parseTime(d.Day);
  for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
  return d;
}
};