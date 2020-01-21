var margin2 = {top: 80, right: window.innerWidth*0.2, bottom: 20, left: window.innerWidth*0.2};
var width2 = window.innerWidth - margin2.left - margin2.right; // Use the window's width
var height = window.innerHeight/3 - margin2.top - margin2.bottom; // Use the window's height


d3.csv("./data/1992cat.csv", function(data) {
   data.forEach(function(d){
     d.category = d.category;
     d.number = +d.number;
     // console.log(d.number);
   })

var y = d3.scaleBand()
         .range([height, 0])
         .padding(0.1);

var x = d3.scaleLinear()
         .range([0, width2]);

var svg2 = d3.select("#cat")
        .append("svg")
        .attr("width", width2 + margin2.left + margin2.right)
        .attr("height", height + margin2.top + margin2.bottom)
        .append("g")
        .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

  x.domain([0, d3.max(data, function(d){ return d.number; })])
    y.domain(data.map(function(d) { return d.category; }));

var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

  svg2.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        //.attr("x", function(d) { return x(d.sales); })
        .attr("width", function(d) {return x(d.number); } )
        .attr("y", function(d) { return y(d.category); })
        .attr("height", y.bandwidth());
//axis
svg2.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
svg2.append("g")
      .call(d3.axisLeft(y));

//title
svg2.append("text")
  .attr("x", window.innerWidth*0.08)
  .attr("y", window.innerHeight*-0.05)
  .text("The Type of Top 10 Box Office Movies in HK in 1992")
  .style("font-size", "40px")
  .style("font-family", "'Reenie Beanie', cursive")
  .style("font-weight", "lighter")
  .style("fill", "#667057")
  .attr("alignment-baseline","middle");

//year
svg2.append("text")
  .attr("x", window.innerWidth*0.25)
  .attr("y", window.innerHeight*-0.01)
  .text("1992")
  .style("font-size", "33px")
  .style("font-family", "'Reenie Beanie', cursive")
  .style("font-weight", "lighter")
  .style("fill", "#667057")
  .attr("alignment-baseline","middle");
 })
