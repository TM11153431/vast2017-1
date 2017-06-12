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
      showCampings();
    }
    if (obj.value == "Entrances") {
      console.log("drawEntrances")
    }
    if (obj.value == "Total") {
      showTotal();
    }
}

// show all traffic in te parc, type specific details
function showTotal(){
    // main calendar
    showData("data/busyness_by_type.csv");
    // type-calendars
    var all_types = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Ranger'];
    // send data from each row to Draw function
    all_types.forEach(function(item) {
     drawType(item);   
    });
}

// show all traffic in the campings
function showCampings(){
    showData("data/fake_all_camps.csv");
    // type-calendars
    var all_types = ['CampsiteOne','CampsiteTwo','CampsiteThree','CampsiteFour','CampsiteFive','CampsiteSix','CampsiteSeven'];
    // send data from each row to Draw function
    all_types.forEach(function(item) {
     drawLocations(item);  
     console.log("items :", item) 
    });
}

// show all traffic at the Entrances
function showEntrances(){
    // add Entrance 1, 2 etc
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
                return d3.sum(v, function(d) { return d.Total; });
                //return (d[0].Total)
               
            }) 
            .object(csv);
        console.log("data to DrawTotalCalendar:", data)
        drawTotalCalendar(data);

        });
}



// draw the main calendar
function drawTotalCalendar(my_data) {

    var width = 960,
        height = 136,
        cellSize = 17;

    var color = d3.scaleLinear()
        .domain([5, 250]) // MUST BE RELATIVE TO MIN AND MAX!
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
        .text("Number of unique vehicles MOVING in the park");

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
    
                if(d in my_data) {
                      return color(my_data[d]);
                }
                else {
                    return "blue";
                }
              
            })
    .select("title")
            .text(function(d) {
                if(d in my_data) {
                    return d + ": " + my_data[d];
                }
                else {
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
    var width = 960,
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
        .text("Moving vehicles "+ which_type);


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
                return (d[0][which_type])
            }) 
            .object(csv);
            console.log("data in DrawTypes: ", data)
        
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
    console.log(which_location);
    var width = 960,
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
        .text("Moving vehicles in "+ which_location);


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


    d3.csv("data/fake_all_camps.csv", function(error, csv) {
        if (error) throw error;

        var data = d3.nest()
            .key(function(d) {
                return d.Day;
            })
            .rollup(function(d) {
                console.log(which_location);
                console.log(d[0][which_location])
                return (d[0][which_location])
            }) 
            .object(csv);
            console.log("data in DrawLocations: ", data)
        
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