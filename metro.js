// Metro map code
function metro(filename, featureFilename, container) {

    // TODO make these scales in a non-shitty manner
    var width = 800,
	height = 400;
    var color = d3.scale.ordinal()
	.domain([1,2,3,4,5,6,7,8,9,10])
	.range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"]);
    var force = d3.layout.force()
	.charge(-200)
	.linkDistance(20)
	.size([width, height]);
    var time = d3.time.scale()
	.range([0, width]); // domain gets set later
    var yScale = d3.scale.ordinal()
	.domain([1,2,3,4,5])
	.range([70, 140, 210, 280, 350]);

    var svg = container.append("svg")
	.attr("width", width)
	.attr("height", height)
	.on("click", function() { d3.select("#show-image").empty(); }); //TODO broken

    // load features
    var faces, dates, longs, lats;
    d3.json(featureFilename, function(error, data) {
	    if (error) console.warn(error);
	    faces = data.faces;
	    dates = [];
	    for (var i = 0; i < data.dates.length; i++) {
		dates.push(new Date(data.dates[i] * 1000)); //s->ms conversion
	    }
	    longs = data.longs;
	    lats = data.lats;
	    makeAxis();
	});

    // make map
    d3.json(filename, function(error, graph) {
	    if (error) console.warn(error);
	    var g = svg.append("g");
    
	    force
		.nodes(graph.nodes)
		.links(graph.links)
		.start();

	    var link = g.selectAll(".link")
		.data(graph.links)
		.enter().append("line")
		.attr("class", "link")
		.style("stroke", function(d) { return color(d.line); })
		.style("stroke-width", 10)
		.style("stroke-opacity", 1);

	    var node = g.selectAll(".node")
		.data(graph.nodes)
		.enter().append("circle")
		.attr("class", "node")
		.attr("r", 8)
		.style("fill", "white")
		.style("stroke", "black");

	    node.append("title")
		.text(function(d) { return d.id; });

	    node.on("mouseover", function(d) {
		    d3.select("#show-image").empty();
		    if (d) {
			d3.select("#show-image")
			    .html("<img style=\"max-width:400px;max-height:400px;\"" +
				  "src=\"images/" + d.id + ".png\" >");
		    }
		});
	    
	    force.on("tick", function() {
		    // position nodes horizontally according to date,
		    // vertically according to line membership
		    node.each(function(d) {
			    var intended = time(dates[d.id]);
			    d.x = d.px = Math.min(intended + 10, Math.max(intended - 10, d.px));
			    intended = yScale(d.line);
			    d.y = d.py = Math.min(intended + 30, Math.max(intended - 30, d.py));
			});

		    link.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });

		    node.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; });
		});
	});

    // axis -- TODO not showing up :(
    function makeAxis() {
	time.domain(d3.extent(force.nodes(), function(d) { return dates[d.id]; }))
	var axis = d3.svg.axis().scale(time)
	    .orient("bottom")
	    .ticks(d3.time.years, 1)
	    .tickFormat(d3.time.format('%Y')); 
	svg.append("g")
	    .attr("class", "axis")
	    .attr("transform", "translate(0, " + height + ")")
	    .call(axis);
    }

}