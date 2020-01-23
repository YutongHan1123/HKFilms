var margin3 = {top: 120, right: innerWidth*0.2, bottom: 20, left: innerWidth*0.2};
var width3 = window.innerWidth - margin3.left - margin3.right;
var height3 = window.innerHeight/2 - margin3.top - margin3.bottom;

var parseTime = d3.timeParse("%Y")
   bisectDate = d3.bisector(function(d) { return d.year; }).left;

d3.csv("./data/gdp.csv", function(data) {
   data.forEach(function(d){
     d.year01 = +d.year;
     d.year = parseTime(d.year);
     d.china = +d.china;
     d.hk = +d.hk;
     d.singapore = +d.singapore;
     d.japan = +d.japan;
     d.korea = d.korea;
     d.us= +d.us;
     // console.log(d.china);
   })

var xScale3 = d3.scaleTime()
.domain(d3.extent(data, function(d) { return d.year; }))
.range([0, width3]);

var yScale3 = d3.scaleLinear()
.domain([d3.min(data, function(d) {return d.hk;})-2, d3.max(data, function(d) {return d.china;})+2])
.range([height3, 0]);

var line1 = d3.line()
    .curve(d3.curveCardinal)
    .x(function(d) { return xScale3(d.year); })
    .y(function(d) { return yScale3(d.china); });

var line2 = d3.line()
    .curve(d3.curveCardinal)
    .x(function(d) { return xScale3(d.year); })
    .y(function(d) { return yScale3(d.hk); });

var line3 = d3.line()
    .curve(d3.curveCardinal)
    .x(function(d) { return xScale3(d.year); })
    .y(function(d) { return yScale3(d.singapore); });

var line4 = d3.line()
    .curve(d3.curveCardinal)
    .x(function(d) { return xScale3(d.year); })
    .y(function(d) { return yScale3(d.japan); });

var line5 = d3.line()
    .curve(d3.curveCardinal)
    .x(function(d) { return xScale3(d.year); })
    .y(function(d) { return yScale3(d.korea); });

var line6 = d3.line()
    .curve(d3.curveCardinal)
    .x(function(d) { return xScale3(d.year); })
    .y(function(d) { return yScale3(d.us); });

var svg3 = d3.select("#line3")
        .append("svg")
        .attr("width", width3 + margin3.left + margin3.right)
        .attr("height", height3 + margin3.top + margin3.bottom)
        .append("g")
        .attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");

var div3 = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

//axis
svg3.append("g")
   .attr("transform", "translate(0," + height3 + ")")
   .attr("class", "axisgrey")
   .call(d3.axisBottom(xScale3)
           .ticks(10));
svg3.append("g")
   .attr("class", "axisgrey")
   .call(d3.axisLeft(yScale3));

svg3.append("path")
.datum(data)
.attr("class", "data-line2")
.attr("d", line1);

svg3.append("path")
.datum(data)
.attr("class", "data-line")
.attr("d", line2);

svg3.append("path")
.datum(data)
.attr("class", "data-line1")
.attr("d", line3);

svg3.append("path")
.datum(data)
.attr("class", "data-line1")
.attr("d", line4);

svg3.append("path")
.datum(data)
.attr("class", "data-line1")
.attr("d", line5);

svg3.append("path")
.datum(data)
.attr("class", "data-line1")
.attr("d", line6);

//add dot
var fixeddot3 = svg3.selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", 2)
    .attr("fill", "#DA3B26");

fixeddot3.attr("cx", function (d) {
        return xScale3(d.year);
    })
    .attr("cy", function (d) {
        return yScale3(d.china);
    })
    .on("mouseover", function (d) {
        div3.transition()
            .duration(200)
            .style("opacity", .9);
        div3.html("<p>Year:" + d.year01 + "</p> <p>China:" + d.china + "</p>")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function(d) {
           div3.transition()
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

var fixeddot4 = svg3.selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", 2)
    .attr("fill", "#667057");

fixeddot4.attr("cx", function (d) {
        return xScale3(d.year);
    })
    .attr("cy", function (d) {
        return yScale3(d.hk);
    })
    .on("mouseover", function (d) {
        div3.transition()
            .duration(200)
            .style("opacity", .9);
        div3.html("<p>Year:" + d.year01 + "</p> <p>HK:" + d.hk + "</p>")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function(d) {
           div3.transition()
           .duration(500)
           .style("opacity", 0);
         });

//title
svg3.append("text")
  .attr("x", window.innerWidth*0.1)
  .attr("y", -window.innerHeight*0.07)
  .text("The Proportion of Intellectual Property")
  .style("font-size", "33px")
  .style("font-family", "'Reenie Beanie', cursive")
  .style("font-weight", "lighter")
  .style("fill", "#667057")
  .attr("alignment-baseline","middle");

//Unit
svg3.append("text")
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
svg3.append("text")
   .attr("x", window.innerWidth*0.52)
   .attr("y", window.innerHeight*0.1)
   .text("China")
   .style("font-size", "30px")
   .style("font-family", "'Reenie Beanie', cursive")
   .style("font-weight", "lighter")
   .style("fill", "#DA3B26")
   .attr("alignment-baseline","middle");

//us
svg3.append("text")
   .attr("x", window.innerWidth*0.012)
   .attr("y", window.innerHeight*0.26)
   .text("US")
   .style("font-size", "30px")
   .style("font-family", "'Reenie Beanie', cursive")
   .style("font-weight", "lighter")
   .style("fill", "#878787")
   .attr("alignment-baseline","middle");

//Korea
svg3.append("text")
   .attr("x", window.innerWidth*0.18)
   .attr("y", window.innerHeight*0.03)
   .text("Korea")
   .style("font-size", "30px")
   .style("font-family", "'Reenie Beanie', cursive")
   .style("font-weight", "lighter")
   .style("fill", "#878787")
   .attr("alignment-baseline","middle");

//Japan
svg3.append("text")
   .attr("x", window.innerWidth*0.42)
   .attr("y", window.innerHeight*0.3)
   .text("Japan")
   .style("font-size", "30px")
   .style("font-family", "'Reenie Beanie', cursive")
   .style("font-weight", "lighter")
   .style("fill", "#878787")
   .attr("alignment-baseline","middle");

//Singapore
svg3.append("text")
   .attr("x", window.innerWidth*0.45)
   .attr("y", window.innerHeight*0.01)
   .text("Singapore")
   .style("font-size", "30px")
   .style("font-family", "'Reenie Beanie', cursive")
   .style("font-weight", "lighter")
   .style("fill", "#878787")
   .attr("alignment-baseline","middle");

//HK
svg3.append("text")
   .attr("x", window.innerWidth*0.1)
   .attr("y", window.innerHeight*0.28)
   .text("HK")
   .style("font-size", "30px")
   .style("font-family", "'Reenie Beanie', cursive")
   .style("font-weight", "lighter")
   .style("fill", "#667057")
   .attr("alignment-baseline","middle");

//typical year
const annotations = [{
           note: { label: "1997 Asian Economic Crisis", wrap: 120 },
           subject: {
             y1: margin3.top*3 ,
             y2: height3 + margin3.bottom
           },
           y: margin3.top*3,
           data: { x: "1997"} //position the x based on an x scale
         },
         {
           note: { label: "The Financial Crisis of 2008-2008", wrap: 120 },
           subject: {
             y1: margin3.top*8,
             y2: height3 + margin3.bottom
           },
           y: margin3.top*8,
           data: { x: "2007"}
         }
         ]

const type = d3.annotationCustomType(
           d3.annotationXYThreshold,
           {"note":{
               "lineType":"none",
               "orientation": "top",
               "align":"middle"}
           }
         )

         const makeAnnotations = d3.annotation()
           .type(type)
           //Gives you access to any data objects in the annotations array
           .accessors({
             x: function(d){ return xScale3(new Date(d.x))},
             y: function(d){ return yScale3(d.y) }
           })
           .annotations(annotations)
           .textWrap(40)

         d3.select("svg")
           .append("g")
           .attr("class", "annotation-group")
           .call(makeAnnotations)
           .style("font-family", "'Mansalva', cursive")
           .style("font-weight", "lighter");
 })
