var margin2 = {top: 80, right: innerWidth*0.2, bottom: 20, left: innerWidth*0.2};
var width2 = window.innerWidth - margin2.left - margin2.right;
var height2 = window.innerHeight/1.3 - margin2.top - margin2.bottom;

var parseTime = d3.timeParse("%Y")
   bisectDate = d3.bisector(function(d) { return d.year; }).left;

d3.csv("./data/patent.csv", function(data) {
   data.forEach(function(d){
     d.year01 = +d.year;
     d.year = parseTime(d.year);
     d.china = +d.china;
     d.hk = +d.hk;
     d.singapore = +d.singapore;
     d.uk = +d.uk;
     d.us= +d.us;
     // console.log(d.china);
   })

var xScale2 = d3.scaleTime()
.domain(d3.extent(data, function(d) { return d.year; }))
.range([0, width2]);

var yScale2 = d3.scaleLinear()
.domain([0, d3.max(data, function(d) {return d.china;})])
.range([height2, 0]);

var line1 = d3.line()
    .curve(d3.curveCardinal)
    .x(function(d) { return xScale2(d.year); })
    .y(function(d) { return yScale2(d.china); });

var line2 = d3.line()
    .curve(d3.curveCardinal)
    .x(function(d) { return xScale2(d.year); })
    .y(function(d) { return yScale2(d.hk); });

var line3 = d3.line()
    .curve(d3.curveCardinal)
    .x(function(d) { return xScale2(d.year); })
    .y(function(d) { return yScale2(d.singapore); });

var line4 = d3.line()
    .curve(d3.curveCardinal)
    .x(function(d) { return xScale2(d.year); })
    .y(function(d) { return yScale2(d.uk); });

var line5 = d3.line()
    .curve(d3.curveCardinal)
    .x(function(d) { return xScale2(d.year); })
    .y(function(d) { return yScale2(d.us); });

var svg2 = d3.select("#line2")
        .append("svg")
        .attr("width", width2 + margin2.left + margin2.right)
        .attr("height", height2 + margin2.top + margin2.bottom)
        .append("g")
        .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

var div2 = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

//axis
svg2.append("g")
   .attr("transform", "translate(0," + height2 + ")")
   .attr("class", "axisgrey")
   .call(d3.axisBottom(xScale2)
           .ticks(10));
svg2.append("g")
   .attr("class", "axisgrey")
   .call(d3.axisLeft(yScale2));

svg2.append("path")
.datum(data)
.attr("class", "data-line2")
.attr("d", line1);

svg2.append("path")
.datum(data)
.attr("class", "data-line")
.attr("d", line2);

svg2.append("path")
.datum(data)
.attr("class", "data-line1")
.attr("d", line3);

svg2.append("path")
.datum(data)
.attr("class", "data-line1")
.attr("d", line4);

svg2.append("path")
.datum(data)
.attr("class", "data-line1")
.attr("d", line5);

//add dot
var fixeddot2 = svg2.selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", 2)
    .attr("fill", "#DA3B26");

fixeddot2.attr("cx", function (d) {
        return xScale2(d.year);
    })
    .attr("cy", function (d) {
        return yScale2(d.china);
    })
    .on("mouseover", function (d) {
        div2.transition()
            .duration(200)
            .style("opacity", .9);
        div2.html("<p>Year:" + d.year01 + "</p> <p>China:" + d.china + "/1E4</p>")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function(d) {
           div2.transition()
           .duration(500)
           .style("opacity", 0);
         });

// svg.append("text")
//    .attr("x", window.innerWidth*0.578)
//    .attr("y", window.innerHeight*0.2)
//    .text("import")
//    .style("font-size", "20px")
//    .style("font-family", "'Mansalva', cursive")
//    .style("font-weight", "lighter")
//    .style("fill", "#205e8a")
//    .attr("alignment-baseline","middle");

var fixeddot3 = svg2.selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", 2)
    .attr("fill", "#667057");

fixeddot3.attr("cx", function (d) {
        return xScale2(d.year);
    })
    .attr("cy", function (d) {
        return yScale2(d.hk);
    })
    .on("mouseover", function (d) {
        div2.transition()
            .duration(200)
            .style("opacity", .9);
        div2.html("<p>Year:" + d.year01 + "</p> <p>HK:" + d.hk + "/1E4</p>")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function(d) {
           div2.transition()
           .duration(500)
           .style("opacity", 0);
         });

//title
svg2.append("text")
  .attr("x", window.innerWidth*0.1)
  .attr("y", -window.innerHeight*0.03)
  .text("The Proportion of Intellectual Property")
  .style("font-size", "33px")
  .style("font-family", "'Reenie Beanie', cursive")
  .style("font-weight", "lighter")
  .style("fill", "#667057")
  .attr("alignment-baseline","middle");

//Unit
svg2.append("text")
   .attr("x", 10)
   .attr("y", 10)
   .text("Unit: Numbers")
   .style("font-size", "12px")
   .style("font-family", "'Reenie Beanie', cursive")
   .style("font-weight", "lighter")
   .style("fill", "#878787")
   .attr("alignment-baseline","middle");

//Countries
//china
svg2.append("text")
   .attr("x", window.innerWidth*0.5)
   .attr("y", window.innerHeight*0.03)
   .text("China")
   .style("font-size", "30px")
   .style("font-family", "'Reenie Beanie', cursive")
   .style("font-weight", "lighter")
   .style("fill", "#DA3B26")
   .attr("alignment-baseline","middle");

//us
svg2.append("text")
   .attr("x", window.innerWidth*0.3)
   .attr("y", window.innerHeight*0.25)
   .text("US")
   .style("font-size", "30px")
   .style("font-family", "'Reenie Beanie', cursive")
   .style("font-weight", "lighter")
   .style("fill", "#878787")
   .attr("alignment-baseline","middle");

//UK
svg2.append("text")
   .attr("x", window.innerWidth*0.1)
   .attr("y", window.innerHeight*0.38)
   .text("UK")
   .style("font-size", "30px")
   .style("font-family", "'Reenie Beanie', cursive")
   .style("font-weight", "lighter")
   .style("fill", "#878787")
   .attr("alignment-baseline","middle");

//Singapore
svg2.append("text")
   .attr("x", window.innerWidth*0.2)
   .attr("y", window.innerHeight*0.55)
   .text("Singapore")
   .style("font-size", "30px")
   .style("font-family", "'Reenie Beanie', cursive")
   .style("font-weight", "lighter")
   .style("fill", "#878787")
   .attr("alignment-baseline","middle");

//HK
svg2.append("text")
   .attr("x", window.innerWidth*0.1)
   .attr("y", window.innerHeight*0.6)
   .text("HK")
   .style("font-size", "30px")
   .style("font-family", "'Reenie Beanie', cursive")
   .style("font-weight", "lighter")
   .style("fill", "#667057")
   .attr("alignment-baseline","middle");
 })
