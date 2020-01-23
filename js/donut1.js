var margin004 = {top: 40, right: window.innerWidth*0.25, bottom: 0, left: window.innerWidth*0.25};
var width004 = window.innerWidth - margin004.left - margin004.right; // Use the window's width
var height004 = 30; // Use the window's height
var svg004 = d3.select("#donut")
        .append("svg")
        .attr("width", width004 + margin004.left + margin004.right)
        .attr("height", height004 + margin004.top + margin004.bottom)
        .append("g")
        .attr("transform", "translate(" + margin004.left + "," + margin004.top + ")");

//title
svg004.append("text")
  .attr("x", window.innerWidth*0.09)
  .attr("y", 20)
  .text("The Types of Top 10 Box Office Movies")
  .style("font-size", "40px")
  .style("font-family", "'Reenie Beanie', cursive")
  .style("font-weight", "lighter")
  .style("fill", "#667057")
  .attr("alignment-baseline","middle");

var margin4 = {top: 0, right: window.innerWidth*0.0125, bottom: 0, left: window.innerWidth*0.0125};

var width4 = window.innerWidth/4-margin4.left-margin4.right;
var height = window.innerHeight/2-margin4.top - margin4.bottom;
var fullWidth4 = width4 + margin4.left+margin4.right;
var fullHeight4 = height+margin4.top+margin4.bottom;
var radius4 = Math.min(width4, height) / 2;

// var color = d3.scaleOrdinal(d3.schemeCategory20b);
var color4 = d3.scaleOrdinal().domain([])
  .range(["#667057", "#CCCCCC"])

var svg4 = d3.select("#donut").append("svg")
    .attr("width", fullWidth4)
    .attr("height", fullHeight4);

//subtitle
svg4.append("text")
  .attr("x", window.innerWidth*0.11)
  .attr("y", window.innerHeight*0.03)
  .text("3D")
  .style("font-size", "33px")
  .style("font-family", "'Reenie Beanie', cursive")
  .style("font-weight", "lighter")
  .style("fill", "#667057")
  .attr("alignment-baseline","middle");

var g4 = svg4.append("g")
    .attr("transform","translate(" + (fullWidth4 / 2) + "," + (fullHeight4 / 2) +")")
    .attr("class","chartGroup");

var donutWidth4 = ( width4 / 4);

var arc4 = d3.arc()
    .innerRadius(donutWidth4)
    .outerRadius(radius4);

var pie4 = d3.pie()
    .value(function(d) { return d.threed})
    .sort(null);

// var tooltip = d3.select('#chart')
//     .append('div')
//     .attr('class','tooltip')
//
// tooltip.append('div')
//     .attr('class','label');
// tooltip.append('div')
//     .attr('class', 'threed');
// tooltip.append('div')
//     .attr('class','percent');



 d3.csv('data/donut.csv', function(error, dataset) {
          dataset.forEach(function(d) {
            d.threed = +d.threed;
            d.enabled4 = true;
          });

var path4 = g4.selectAll('path')
    .data(pie4(dataset))
    .enter()
    .append('path')
        .attr('d',arc4)
        .attr('fill', function(d,i){
            return color4(d.data.label);
        })
    .each(function(d){this._current = d;});

path4.on('mousemove', function(d){
      var xposSub = document.getElementById("donut").getBoundingClientRect().left;
      var xpos = d3.event.x - xposSub + 20
      var ypos = d3.event.y
      tooltip.style("left" ,xpos + "px")
      tooltip.style("top", ypos + "px")
    var total = d3.sum(dataset.map(function(d){
      return (d.enabled4) ? d.threed : 0;
    }));
  var percent = Math.round(10000 * d.data.threed / total) / 100;
  tooltip.select('.label').html(d.data.label);
  tooltip.select('.threed').html(d.data.threed);
  tooltip.select('.percent').html(percent + '%');
  tooltip.style('display', 'block');
});



path4.on('mouseout', function(d){
    tooltip.style('display','none');

});

var legendRectSize4 = 18;
var legendSpacing4 = 10;

var legend4 = g4.selectAll('.legend4')
    .data(color4.domain())
    .enter()
        .append('g')
        .attr('class','legend4')
        .attr('transform', function(d,i){
            var height = legendRectSize4 + legendSpacing4;
            var offset = height * color4.domain().length / 2;
            var horz = -2 * legendRectSize4;
            var vert = i * height-offset;
            return 'translate(' + horz + ',' + vert + ')';
        });

    legend4.append('rect')
        .attr('width',legendRectSize4)
        .attr('height',legendRectSize4)
        .style('fill',color4)
        .style('stroke',color4)

        .on('click', function(label){
        var rect = d3.select(this);
  var enabled4 = true;
  var totalEnabled4 = d3.sum(dataset.map(function(d) {
    return (d.enabled4) ? 1 : 0;
  }));

  if (rect.attr('class') === 'disabled') {
    rect.attr('class', '');
  } else {
    if (totalEnabled4 < 2) return;
    rect.attr('class', 'disabled');
    enabled4 = false;
  }

  pie4.value(function(d) {
    if (d.label === label) d.enabled4 = enabled4;
    return (d.enabled4) ? d.threed : 0;
  });

  path4 = path4.data(pie(dataset));

  path4.transition()
    .duration(750)
    .attrTween('d', function(d) {
      var interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function(t) {
        return arc(interpolate(t));
      };
    });
    });


legend4.append('text')
  .attr('x', legendRectSize4 + legendSpacing4)
  .attr('y', legendRectSize4 - legendSpacing4)
  .attr('style','font-size: 18')
  .attr('alignment-baseline','middle')
  .text(function(d) { return d; })
  .style("font-size", "25px")
  .style("font-family", "'Reenie Beanie', cursive")
  .style("font-weight", "lighter")
  .style("fill", "#667057");

 });
