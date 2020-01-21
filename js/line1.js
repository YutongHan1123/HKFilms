var margin1 = {top: 20, right: 100, bottom: 20, left: 100};
var width1 = window.innerWidth - margin1.left - margin1.right;
var height = window.innerHeight/2 - margin1.top - margin1.bottom;

var parseTime = d3.timeParse("%Y")
   bisectDate = d3.bisector(function(d) { return d.year; }).left;

d3.csv("./data/01.csv", function(data) {
   data.forEach(function(d){
     d.year1 = +d.year;
     d.year = parseTime(d.year);
     d.import = +d.import;
     // console.log(d.import);
   })


var n = 21;

var xScale = d3.scaleTime()
.domain(d3.extent(data, function(d) { return d.year; }))
.range([0, width1]);

var yScale = d3.scaleLinear()
.domain([0, d3.max(data, function(d) {return d.import;})])
.range([height, 0]);

var line = d3.line()
    .defined(function(d) { return d.import != 0; })
    .curve(d3.curveCardinal)
    .x(function(d) { return xScale(d.year); })
    .y(function(d) { return yScale(d.import); });

var svg = d3.select("#cow")
        .append("svg")
        .attr("width", width1 + margin1.left + margin1.right)
        .attr("height", height + margin1.top + margin1.bottom)
        .append("g")
        .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");

var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

//axis
svg.append("g")
   .attr("transform", "translate(0," + height + ")")
   .attr("class", "axisgrey")
   .call(d3.axisBottom(xScale)
           .ticks(10));
svg.append("g")
   .attr("class", "axisgrey")
   .call(d3.axisLeft(yScale));

svg.append("path")
.datum(data)
.attr("class", "data-line")
.attr("d", line);

//add dot
var fixeddot = svg.selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", 3)
    .attr("fill", "#667057");

fixeddot.attr("cx", function (d) {
      if (d.import > 0) {
        return xScale(d.year);
      }
    })
    .attr("cy", function (d) {
      if (d.import > 0) {
        return yScale(d.import);
      }
    })
    .on("mouseover", function (d) {
        div.transition()
            .duration(200)
            .style("opacity", .9);
        div.html("<p>Year:" + d.year1 + "</p> <p>import:" + d.import + "</p>")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function(d) {
           div.transition()
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

//title
svg.append("text")
  .attr("x", window.innerWidth*0.14)
  .attr("y", window.innerHeight*0.01)
  .text("The Change of Numbers of the Countries that Imported HK Films")
  .style("font-size", "33px")
  .style("font-family", "'Reenie Beanie', cursive")
  .style("font-weight", "lighter")
  .style("fill", "#667057")
  .attr("alignment-baseline","middle");

//Unit
svg.append("text")
   .attr("x", 10)
   .attr("y", 10)
   .text("Unit: Numbers")
   .style("font-size", "12px")
   .style("font-family", "'Reenie Beanie', cursive")
   .style("font-weight", "lighter")
   .style("fill", "#878787")
   .attr("alignment-baseline","middle");


 //typical year
 const annotations = [{
            note: { label: "Sino-Japanese War", wrap: 120 },
            subject: {
              y1: margin1.top*13 ,
              y2: height + margin1.bottom
            },
            y: margin1.top*13,
            data: { x: "1896"} //position the x based on an x scale
          },
          {
            note: { label: "Russo-Japanese War", wrap: 120 },
            subject: {
              y1: margin1.top*8,
              y2: height + margin1.bottom
            },
            y: margin1.top*8,
            data: { x: "1906"}
          },
          {
            note: { label: "Xinhai Revolution", wrap: 120},
            subject: {
              y1: margin1.top*7,
              y2: height + margin1.bottom
            },
            y: margin1.top*7,
            data: { x: "1913"}
          },
          {
            note: { label: "May 4th Movement", wrap: 150},
            subject: {
              y1: margin1.top*4,
              y2: height + margin1.bottom
            },
            y: margin1.top*4,
            data: { x: "1921"}
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
              x: function(d){ return xScale(new Date(d.x))},
              y: function(d){ return yScale(d.y) }
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
