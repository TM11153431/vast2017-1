// +-+-+-+-+ +-+-+-+-+-+-+-+-+-+ +-+-+-+-+              
// |V|A|S|T| |C|H|A|L|L|E|N|G|E| |2|0|1|7|              
// +-+-+-+-+ +-+-+-+-+-+-+-+-+-+ +-+-+-+-+              
// PETER VAN TWUYVER, 10872809
// MINOR PROGRAMMEREN UVA 2017
// +-+-+-+-+ +-+-+-+-+-+-+-+-+-+ +-+-+-+-+  
function onRectClicked(item) {
    console.log(item);
}
window.onload = function() {
    getOption();
};
// get User selection and select appropriate function to draw svg's
function getOption() {
    var obj = document.getElementById("mySelect");
    if (obj.value == "Campsites") {
        //showData("data/fake_all_camps.csv");
        showData("data/all_camps.csv");
        // type-calendars
        
        var all_types = ['camping0', 'camping1', 'camping2', 'camping3', 'camping4', 'camping5', 'camping6', 'camping7', 'camping8'];
        // send data from each row to Draw function
        all_types.forEach(function(item) {
            drawLocations(item);
        });
    }
    if (obj.value == "Entrances") {
        //showData("data/fake_all_camps.csv");
        showData("data/all_entrances.csv"); //CHANGE TO ALL ENTRANCES
        // type-calendars
        
        var all_types = ['entrance0', 'entrance1', 'entrance2', 'entrance3', 'entrance4'];
        // send data from each row to Draw function
        all_types.forEach(function(item) {
            drawLocations(item);
        });
    }
    if (obj.value == "Total") {
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

    var width = 960,
        height = 136,
        cellSize = 17;
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
        .text("Number of unique vehicles ");

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
                return "blue";
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

// draws the sub-calendars
function drawType(which_type) {
    var width = 560,
        height = 136,
        cellSize = 10;

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

// draws the sub-calendars
function drawLocations(which_location) {

    var width = 560,
        height = 136,
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
        .text("Moving vehicles in " + which_location);


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