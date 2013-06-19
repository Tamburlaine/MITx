var data = [0, 4, 8, 8, 15, 16, 23, 42];

var outer_width = 300;
var outer_height = 300;

var margin = {top: 20, right: 20, bottom: 20, left: 20};

var chart_width = outer_width - margin.left - margin.right;
var chart_height = outer_height - margin.top - margin.bottom;

//function that maps domain values to range values
var x_scale = d3.scale.ordinal().domain(d3.keys(data)).rangeBands([0, chart_width]);
var y_scale = d3.scale.linear().domain([0, d3.max(data)])
	.range([0, chart_height]);

var chart = d3.select(".chart-container").append("svg")
			.attr("class", "chart")
			.attr("height", outer_height)
			.attr("width", outer_width)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
chart.selectAll("rect")
	.data(data).enter().append("rect")
	.attr("x", function(d,i) {return x_scale(i);})
	.attr("y", function(d) {return chart_height - y_scale(d);}) //
	.attr("width", x_scale.rangeBand())
	.attr("height", y_scale);

chart.selectAll("text").data(data)
	.enter().append("text")
	.attr("x", function(d, i) {return x_scale(i) + x_scale.rangeBand()/2;})
	.attr("y", function(d) {return chart_height - y_scale(d);})
	.attr("dy", "1em")
	.text(function (d) {return d;})