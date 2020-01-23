var margin5 = {top: 60, right: window.innerWidth*0.0125, bottom: 0, left: window.innerWidth*0.0125};

var width5 = window.innerWidth/4-margin5.left-margin5.right;
var height = window.innerHeight/2-margin5.top - margin5.bottom;
var fullWidth5 = width5 + margin5.left+margin5.right;
var fullHeight5 = height+margin5.top+margin5.bottom;
var radius5 = Math.min(width5, height) / 2;

// var color = d3.scaleOrdinal(d3.schemeCategory20b);
var color5 = d3.scaleOrdinal().domain([])
  .range(["#667057", "#CCCCCC"]);

var svg5 = d3.select("#donut").append("svg")
    .attr("width", fullWidth5)
    .attr("height", fullHeight5);

var g5 = svg5.append("g")
    .attr("transform","translate(" + (fullWidth5 / 2) + "," + (fullHeight5 / 2) +")")
    .attr("class","chartGroup");

var donutWidth5 = ( width5 / 4);

var arc5 = d3.arc()
    .innerRadius(donutWidth5)
    .outerRadius(radius5);

var pie5 = d3.pie()
    .value(function(d) { return d.imax})
    .sort(null);

 d3.csv('data/donut.csv', function(error, dataset) {
          dataset.forEach(function(d) {
            d.imax = +d.imax;
            d.enabled5 = true;
          });

var path5 = g5.selectAll('path')
    .data(pie5(dataset))
    .enter()
    .append('path')
        .attr('d',arc5)
        .attr('fill', function(d,i){
            return color5(d.data.label);
        })
    .each(function(d){this._current = d;});


var legendRectSize5 = 18;
var legendSpacing5 = 10;

var legend5 = g5.selectAll('.legend5')
    .data(color5.domain())
    .enter()
        .append('g')
        .attr('class','legend5')
        .attr('transform', function(d,i){
            var height = legendRectSize5 + legendSpacing5;
            var offset = height * color5.domain().length / 2;
            var horz = -2 * legendRectSize5;
            var vert = i * height-offset;
            return 'translate(' + horz + ',' + vert + ')';
        });

    legend5.append('rect')
        .attr('width',legendRectSize5)
        .attr('height',legendRectSize5)
        .style('fill',color5)
        .style('stroke',color5);

legend5.append('text')
  .attr('x', legendRectSize5 + legendSpacing5)
  .attr('y', legendRectSize5 - legendSpacing5)
  .attr('style','font-size: 18')
  .attr('alignment-baseline','middle')
  .text(function(d) { return d; })
  .style("font-size", "25px")
  .style("font-family", "'Reenie Beanie', cursive")
  .style("font-weight", "lighter")
  .style("fill", "#667057");

//subtitle
svg5.append("text")
.attr("x", window.innerWidth*0.11)
.attr("y", window.innerHeight*0.03)
.text("IMAX")
.style("font-size", "33px")
.style("font-family", "'Reenie Beanie', cursive")
.style("font-weight", "lighter")
.style("fill", "#667057")
.attr("alignment-baseline","middle");

 });
