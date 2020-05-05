$(function () {
    if ($("body").is(".element-page")) {
        graphDetector();
    }

    function graphDetector() {
        var element = $("#elementID").val();
        var color = $("#colorID").val();
        var name; // name by element
        var reference; // reference to different elements
        var csv = "/myapp/public/data/quantified_element_values.csv";
        var detect = $("input[name='detector-select']:checked").val() == "A" ? "A" : "B";
        $("svg").remove();
        $("#legend").empty();
        var margin = {
                top: 140,
                right: 73,
                bottom: 50,
                left: 75
            },
            width = 900 - margin.left - margin.right,
            height = 770 - margin.top - margin.bottom;
        // append the svg object to the body of the page
        var svg = d3
            .select("#detector")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .call(
                d3
                .zoom()
                .extent([
                    [0, 0],
                    [width, height],
                ])
                .scaleExtent([1, 8])
                .on("zoom", zoomed)
            )
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        function zoomed() {
            svg.attr("transform", d3.event.transform);
        }
        // fetch the pic of mars
        svg.append("image").attr("/myapp/public/images/mars.png");
        //read the csv file
        d3.csv(csv, function (data) {
            var filter = data.filter(function (e) {
                return e.Detector == detect;
            });
            // separate column from csv
            var minX = Number.MAX_SAFE_INTEGER;
            var maxX = 0;
            var minY = Number.MAX_SAFE_INTEGER;
            var maxY = 0;
            var minPer = Number.MAX_SAFE_INTEGER;
            var maxPer = 0;
            for (var i = 0; i < filterData.length; i++) {
                switch (element) {
                    case "Mg":
                        reference = Number(filterData[i]["Mg_%"]);
                        break;
                    case "Al":
                        reference = Number(filterData[i]["Al_%"]);
                        break;
                    case "Ca":
                        reference = Number(filterData[i]["Ca_%"]);
                        break;
                    case "Ti":
                        reference = Number(filterData[i]["Ti_%"]);
                        break;
                    case "Fe":
                        reference = Number(filterData[i]["Fe_%"]);
                        break;
                    case "Si":
                        reference = Number(filterData[i]["Si_%"]);
                        break;
                }
                if (reference < minPer) {
                    minPer = reference;
                }
                if (reference > maxPer) {
                    maxPer = reference;
                }
                if (Number(filterData[i].image_i) < minX) {
                    minX = Number(filterData[i].image_i);
                }
                if (Number(filterData[i].image_i) > maxX) {
                    maxX = Number(filterData[i].image_i);
                }
                if (Number(filterData[i].image_j) < minY) {
                    minY = Number(filterData[i].image_j);
                }
                if (filterData[i].image_j > maxY) {
                    maxY = Number(filterData[i].image_j);
                }
            }
            var myImage_i = new Array(580);
            var myImage_j = new Array(752);
            minX = 0;
            minY = 0;
            for (var i = 0; i <= 580; i++) {
                myImage_i.push(i);
            }
            for (var j = 0; j <= 752; j++) {
                myImage_j.push(j);
            }
            // Build X scales and axis:
            var x = d3.scaleBand().range([0, width]).domain(myImage_i).padding(0.05);
            var xAxis = d3
                .axisBottom(x)
                .tickSize(5)
                .tickSizeOuter(0)
                .tickValues(
                    x.domain().filter(function (d, i) {
                        if (i === 581) {
                            return i;
                        } else {
                            return !((i - 1) % 50);
                        }
                    })
                );
            svg
                .append("g")
                .call(xAxis)
                .style("font-size", 15)
                .attr("transform", "translate(0," + height + ")")
                .select(".domain");
            // text label for the x axis
            svg
                .append("text")
                .attr("transform", "translate(" + width / 2 + " ," + (height + 40) + ")")
                .style("text-anchor", "middle")
                .attr("font-weight", "bold")
                .text("image_i");
            // Build Y scales and axis:
            var y = d3.scaleBand().range([height, 0]).domain(myImage_j).padding(0.05);
            var yAxis = d3
                .axisLeft(y)
                .tickSize(5)
                .tickSizeOuter(0)
                .tickValues(
                    y.domain().filter(function (d, i) {
                        if (i === 753) {
                            return i;
                        } else {
                            if (i != 751) return !((i - 1) % 50);
                        }
                    })
                );
            svg.append("g").style("font-size", 15).call(yAxis).select(".domain");
            // text label for the y axis
            svg
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left + 25)
                .attr("x", 0 - height / 2)
                .attr("dy", ".25em")
                .style("text-anchor", "middle")
                .attr("font-weight", "bold")
                .text("image_j");
            var elementColor;
            switch (element) {
                case "Mg":
                    elementColor = d3.interpolateReds;
                    break;
                case "Al":
                    elementColor = d3.interpolatePuBu;
                    break;
                case "Ca":
                    elementColor = d3.interpolatePuBuGn;
                    break;
                case "Ti":
                    elementColor = d3.interpolateYlGnBu;
                    break;
                case "Fe":
                    elementColor = d3.interpolateYlGn;
                    break;
                case "Si":
                    elementColor = d3.interpolateYlOrBr;
                    break;
            }
            // Build color scale
            var myColor = d3.scaleSequential().interpolator(elementColor).domain([minPer, maxPer]);
            //[Math.round(minPer * 10) / 10, Math.round(maxPer * 10) / 10]
            drawLegend("#legend", myColor);
            // create a tooltip
            var tooltip = d3
                .select("#detector")
                .append("div")
                .style("opacity", 0)
                .attr("class", "tooltip")
                .style("background-color", "white")
                .style("border", "solid")
                .style("border-width", "2px")
                .style("border-radius", "5px")
                .style("padding", "5px");
            // Three function that change the tooltip when user hover / move / leave a cell
            var mouseover = function (d) {
                tooltip.style("opacity", 1);
                d3.select(this).style("stroke", "red").style("opacity", 1);
            };
            var mousemove = function (d) {
                switch (element) {
                    case "Mg":
                        elementRef = d["Mg_%"];
                        break;
                    case "Al":
                        elementRef = d["Al_%"];
                        break;
                    case "Ca":
                        elementRef = d["Ca_%"];
                        break;
                    case "Ti":
                        elementRef = d["Ti_%"];
                        break;
                    case "Fe":
                        elementRef = d["Fe_%"];
                        break;
                    case "Si":
                        elementRef = d["Si_%"];
                        break;
                }
                tooltip
                    .html("<b>" + element + " %: </b>" + elementRef + " <br><b>Location: </b>" + d.image_i + " i : " + d.image_j + " j")
                    .style("left", d3.mouse(this)[0] + (width - 650) + "px")
                    .style("top", d3.mouse(this)[1] + (height - 475) + "px");
            };
            var mouseleave = function (d) {
                tooltip.style("opacity", 0);
                d3.select(this).style("stroke", "none").style("opacity", 0.8);
            };
            svg
                .selectAll()
                .data(filterData)
                .enter()
                .append("rect")
                .attr("x", function (d) {
                    return x(Math.floor(d.image_i));
                })
                .attr("y", function (d) {
                    return y(Math.floor(d.image_j));
                })
                .attr("rx", 4)
                .attr("ry", 4)
                .attr("width", x.bandwidth() + 1)
                .attr("height", y.bandwidth() + 1)
                .style("fill", function (d) {
                    switch (element) {
                        case "Mg":
                            elementRef = d["Mg_%"];
                            break;
                        case "Al":
                            elementRef = d["Al_%"];
                            break;
                        case "Ca":
                            elementRef = d["Ca_%"];
                            break;
                        case "Ti":
                            elementRef = d["Ti_%"];
                            break;
                        case "Fe":
                            elementRef = d["Fe_%"];
                            break;
                        case "Si":
                            elementRef = d["Si_%"];
                            break;
                    }
                    return myColor(elementRef);
                })
                .style("stroke-width", 4)
                .style("stroke", "none")
                .style("opacity", 0.8)
                .on("mouseover", mouseover)
                .on("mousemove", mousemove)
                .on("mouseleave", mouseleave);
        });
        switch (element) {
            case "Mg":
                name = "Magnesium";
                break;
            case "Al":
                name = "Aluminum";
                break;
            case "Ca":
                name = "Calcium";
                break;
            case "Ti":
                name = "Titanium";
                break;
            case "Fe":
                name = "Iron";
                break;
            case "Si":
                name = "Silicon";
                break;
        }
        // Add title to graph
        svg
            .append("text")
            .attr("x", 0)
            .attr("y", -50)
            .attr("text-anchor", "left")
            .style("font-size", "22px")
            .attr("font-weight", "bold")
            .text("Heatmap for " + name + " (Detector " + detect + ")");
    }
    // create continuous color legend
    function drawLegend(selector_id, colorscale) {
        var legendheight = 350,
            legendwidth = 100,
            margin = {
                top: 10,
                right: 60,
                bottom: 10,
                left: 2
            };
        var canvas = d3
            .select(selector_id)
            .style("height", legendheight + "px")
            .style("width", legendwidth + "px")
            .style("position", "relative")
            .append("canvas")
            .attr("height", legendheight - margin.top - margin.bottom)
            .attr("width", 1)
            .style("height", legendheight - margin.top - margin.bottom + "px")
            .style("width", legendwidth - margin.left - margin.right + "px")
            .style("border", "1px solid #000")
            .style("position", "absolute")
            .style("top", margin.top + "px")
            .style("left", margin.left + "px")
            .node();
        var context = canvas.getContext("2d");
        var legendscale = d3
            .scaleLinear()
            .range([1, legendheight - margin.top - margin.bottom])
            .domain(colorscale.domain());
        var image = context.createImageData(1, legendheight);
        d3.range(legendheight).forEach(function (i) {
            var c = d3.rgb(colorscale(legendscale.invert(i)));
            image.data[4 * i] = c.r;
            image.data[4 * i + 1] = c.g;
            image.data[4 * i + 2] = c.b;
            image.data[4 * i + 3] = 255;
        });
        context.putImageData(image, 0, 0);
        var legendaxis = d3.axisRight().scale(legendscale).tickSize(6).ticks(8);
        var svg = d3
            .select(selector_id)
            .append("svg")
            .attr("height", legendheight + "px")
            .attr("width", legendwidth + "px")
            .style("position", "absolute")
            .style("left", "0px")
            .style("top", "0px");
        svg
            .append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + (legendwidth - margin.left - margin.right + 3) + "," + margin.top + ")")
            .call(legendaxis);
    }
    //Event handlers
    $(".detector-btns").on("click", function (e) {
        graphDetector();
    });
});