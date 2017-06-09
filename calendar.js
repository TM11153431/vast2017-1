// +-+-+-+-+ +-+-+-+-+-+-+-+-+-+ +-+-+-+-+              
// |V|A|S|T| |C|H|A|L|L|E|N|G|E| |2|0|1|7|              
// +-+-+-+-+ +-+-+-+-+-+-+-+-+-+ +-+-+-+-+              
// PETER VAN TWUYVER, 10872809
// MINOR PROGRAMMEREN UVA 2017
// +-+-+-+-+ +-+-+-+-+-+-+-+-+-+ +-+-+-+-+  

// start with overview traffic on window load
window.onload = function() {

// d3.queue()
//         .defer(d3.csv, "data/busyness_by_type.csv", function(error, csv) {
//             if (error) throw error;
//             // draw calendars 
//             drawMap(worldpopulation);
//         })
//         .defer(d3.json, "landcodes.json", function(error, agegroups) {
//             if (error) throw error;

//             globalAgegroups = agegroups;

//         })
//         .await(ready);

 showTotal();
};
// get User selection and select appropriate function to draw svg's
function getOption() {
    var obj = document.getElementById("mySelect");
    if (obj.value == "Campsites") {
      console.log("drawCampsites")
      // var svg = d3.select("#calendar");
      //   if (svg !== undefined)
      //       svg.remove();
      showCampings();
    }
    if (obj.value == "Entrances") {
      console.log("drawEntrances")
    }
    if (obj.value == "Total") {
      console.log("drawTotals")
    }
}
// show all traffic in te parc, type specific details
function showTotal(){
    drawPark();
    drawType1();
    drawType2();
    drawType3();
    drawType4();
    drawType5();
    drawType6();
    drawTypeP();
}

// show all traffic in the campings
function showCampings(){
    drawAllCamps();
    drawCamp0();
    drawCamp1();
    // add Camping 1, 2 etc
}

// show all traffic at the Entrances
function showEntrances(){
    
    // add Entrance 1, 2 etc
}

// all svg drawing functions:
function drawPark() {
    var width = 960,
        height = 136,
        cellSize = 17;

    var color = d3.scaleLinear()
        .domain([5, 250]) // MUST BE RELATIVE TO MIN AND MAX
        .range(["#fee0d2", "#de2d26"]);

    var svg = d3.select("#calendar")
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
        .text("Number of unique vehicles MOVING in the park");


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
        .datum(d3.timeFormat("%d/%m/%Y"));

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
                return (d[0].Total)
            }) // Total busyness in park
            .object(csv);
        
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
function drawType1() {
    var width = 960,
        height = 136,
        cellSize = 10;

    var color = d3.scaleLinear()
        .domain([0, 122]) // MUST BE RELATIVE TO MIN AND MAX
        .range(["#fee0d2", "#de2d26"]);

    var svg = d3.select("#type1")
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
        .text("TYPE 1 vehicles MOVING in the park");


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
        .datum(d3.timeFormat("%d/%m/%Y"));

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
                return (d[0].One)
            }) // type 1 busyness in park
            .object(csv);
        
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
function drawType2() {
    var width = 960,
        height = 136,
        cellSize = 10;

    var color = d3.scaleLinear()
        .domain([0, 77]) // MUST BE RELATIVE TO MIN AND MAX
        .range(["#fee0d2", "#de2d26"]);

    var svg = d3.select("#type2")
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
        .text("TYPE 2 vehicles MOVING in the park");


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
        .datum(d3.timeFormat("%d/%m/%Y"));

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
                return (d[0].Two)
            }) // type 2 busyness in park
            .object(csv);
  
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
function drawType3() {
    var width = 960,
        height = 136,
        cellSize = 10;

    var color = d3.scaleLinear()
        .domain([0, 53]) // MUST BE RELATIVE TO MIN AND MAX
        .range(["#fee0d2", "#de2d26"]);

    var svg = d3.select("#type3")
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
        .text("TYPE 3 vehicles MOVING in the park");


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
        .datum(d3.timeFormat("%d/%m/%Y"));

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
                return (d[0].Three)
            }) // type 3 busyness in park
            .object(csv);
        
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
function drawType4() {
    var width = 960,
        height = 136,
        cellSize = 10;

    var color = d3.scaleLinear()
        .domain([0, 13]) // MUST BE RELATIVE TO MIN AND MAX
        .range(["#fee0d2", "#de2d26"]);

    var svg = d3.select("#type4")
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
        .text("TYPE 4 vehicles MOVING in the park");


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
        .datum(d3.timeFormat("%d/%m/%Y"));

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
                return (d[0].Four)
            }) // type 4 busyness in park
            .object(csv);
        
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
function drawType5() {
    var width = 960,
        height = 136,
        cellSize = 10;

    var color = d3.scaleLinear()
        .domain([0, 9]) // MUST BE RELATIVE TO MIN AND MAX
        .range(["#fee0d2", "#de2d26"]);

    var svg = d3.select("#type5")
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
        .text("TYPE 5 vehicles MOVING in the park");


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
        .datum(d3.timeFormat("%d/%m/%Y"));

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
                return (d[0].Five)
            }) // type 5 busyness in park
            .object(csv);
        
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
function drawType6() {
    var width = 960,
        height = 136,
        cellSize = 10;

    var color = d3.scaleLinear()
        .domain([0, 5]) // MUST BE RELATIVE TO MIN AND MAX
        .range(["#fee0d2", "#de2d26"]);

    var svg = d3.select("#type6")
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
        .text("TYPE 6 vehicles MOVING in the park");


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
        .datum(d3.timeFormat("%d/%m/%Y"));

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
                return (d[0].Six)
            }) // type 6 busyness in park
            .object(csv);
        
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
function drawTypeP() {
    var width = 960,
        height = 136,
        cellSize = 10;

    var color = d3.scaleLinear()
        .domain([1, 6]) // MUST BE RELATIVE TO MIN AND MAX
        .range(["#fee0d2", "#de2d26"]);

    var svg = d3.select("#typeP")
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
        .text("Ranger vehicles MOVING in the park");


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
        .datum(d3.timeFormat("%d/%m/%Y"));

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
                return (d[0].Ranger)
            }) // type P busyness in park
            .object(csv);
   
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
function drawAllCamps() {
    var width = 960,
        height = 136,
        cellSize = 17;

    var color = d3.scaleLinear()
        .domain([1, 181]) // MUST BE RELATIVE TO MIN AND MAX
        .range(["#fee0d2", "#de2d26"]);

    var svg = d3.select("#allCamps")
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
        .text("Vehicles in all Campsites");


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
        .datum(d3.timeFormat("%d/%m/%Y"));

    svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "#000")
        .selectAll("path")
        .data(function(d) {
            return d3.timeMonths(new Date(d, 0, 1), new Date(d + 1, 0, 1));
        })
        .enter().append("path")
        .attr("d", pathMonth);


    d3.csv("data/all_camps.csv", function(error, csv) {
        if (error) throw error;

        var data = d3.nest()
            .key(function(d) {
                return d.Day;
            })
            .rollup(function(d) {
                return (d[0].Total)
            }) // type P busyness in park
            .object(csv);
   
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
function drawCamp0() {
    var width = 960,
        height = 136,
        cellSize = 10;

    var color = d3.scaleLinear()
        .domain([0, 22]) // MUST BE RELATIVE TO MIN AND MAX
        .range(["#fee0d2", "#de2d26"]);

    var svg = d3.select("#camp0")
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
        .text("Vehicles moving in Campsite 0");


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
        .datum(d3.timeFormat("%d/%m/%Y"));

    svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "#000")
        .selectAll("path")
        .data(function(d) {
            return d3.timeMonths(new Date(d, 0, 1), new Date(d + 1, 0, 1));
        })
        .enter().append("path")
        .attr("d", pathMonth);


    d3.csv("data/sensor_data_camping0.csv", function(error, csv) {
        if (error) throw error;

        var data = d3.nest()
            .key(function(d) {
                return d.Day;
            })
            .rollup(function(d) {
                return (d[0].Total)
            }) // type P busyness in park
            .object(csv);
   
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
function drawCamp1() {
    var width = 960,
        height = 136,
        cellSize = 10;

    var color = d3.scaleLinear()
        .domain([0, 5]) // MUST BE RELATIVE TO MIN AND MAX
        .range(["#fee0d2", "#de2d26"]);

    var svg = d3.select("#camp1")
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
        .text("Vehicles moving in Campsite 1");


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
        .datum(d3.timeFormat("%d/%m/%Y"));

    svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "#000")
        .selectAll("path")
        .data(function(d) {
            return d3.timeMonths(new Date(d, 0, 1), new Date(d + 1, 0, 1));
        })
        .enter().append("path")
        .attr("d", pathMonth);


    d3.csv("data/sensor_data_camping1.csv", function(error, csv) {
        if (error) throw error;

        var data = d3.nest()
            .key(function(d) {
                return d.Day;
            })
            .rollup(function(d) {
                return (d[0].Total)
            }) // type P busyness in park
            .object(csv);
   
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