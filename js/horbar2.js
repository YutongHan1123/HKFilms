var margin3 = {top: 100, right: window.innerWidth*0.1, bottom: 20, left: window.innerWidth*0.2};
var width3 = window.innerWidth - margin3.left - margin3.right; // Use the window's width
var height2 = window.innerHeight/3.5 - margin3.top - margin3.bottom; // Use the window's height


d3.csv("./data/2018cat.csv", function(data) {
   data.forEach(function(d){
     d.category = d.category;
     d.number = +d.number;
     // console.log(d.number);
   })

var y = d3.scaleBand()
         .range([height2, 0])
         .padding(0.1);

var x = d3.scaleLinear()
         .range([0, width3]);

var svg2 = d3.select("#cat2")
        .append("svg")
        .attr("width", width3 + margin3.left + margin3.right)
        .attr("height", height2 + margin3.top + margin3.bottom)
        .append("g")
        .attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");

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
      .attr("transform", "translate(0," + height2 + ")")
      .call(d3.axisBottom(x));
svg2.append("g")
      .call(d3.axisLeft(y));

//title
svg2.append("text")
  .attr("x", window.innerWidth*0.08)
  .attr("y", window.innerHeight*-0.05)
  .text("The Type of Top 10 Box Office Movies in HK in 2018")
  .style("font-size", "40px")
  .style("font-family", "'Reenie Beanie', cursive")
  .style("font-weight", "lighter")
  .style("fill", "#667057")
  .attr("alignment-baseline","middle");

//year
svg2.append("text")
  .attr("x", window.innerWidth*0.25)
  .attr("y", window.innerHeight*-0.01)
  .text("2018")
  .style("font-size", "33px")
  .style("font-family", "'Reenie Beanie', cursive")
  .style("font-weight", "lighter")
  .style("fill", "#667057")
  .attr("alignment-baseline","middle");
 })
