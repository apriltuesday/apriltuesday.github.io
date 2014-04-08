// Social graph code
function social(filename, container) {

    var me = "April Shen";
    var width = 800,
	height = 800;
    var color = d3.scale.ordinal()
	.domain([0,1,2,3,4,5,6,7,8,9,10])
	.range(["#333333", "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"]);

    var force = d3.layout.force()
	.charge(-200)
	.linkDistance(function(d) { return 5*Math.pow(d.value, -1.5); })
	.size([width, height]);

    var zoom = d3.behavior.zoom()
	.scaleExtent([1, 10])
	.on("zoom", zoomed);

    var svg = container.append("svg")
	.attr("width", width)
	.attr("height", height)
	.on("click", function() { d3.select("#show-image").html(""); })
	.call(zoom);

    var g = svg.append("g");

    function zoomed() {
	g.selectAll("circle")
	    .style("stroke-width", 1.5 / d3.event.scale + "px")
	    .attr("r", 5 / d3.event.scale + "px");
	g.selectAll("line")
	    .style("stroke-width", function(d) { return Math.sqrt(d.value) / d3.event.scale; });
	g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }

    d3.json(filename, function(error, graph) {
	    force
		.nodes(graph.nodes)
		.links(graph.links)
		.start();

	    var link = g.selectAll(".link")
		.data(graph.links)
		.enter().append("line")
		.attr("class", "link")
		.style("stroke-width", function(d) { return Math.sqrt(d.value); });

	    var node = g.selectAll(".node")
		.data(graph.nodes)
		.enter().append("circle")
		.attr("class", "node")
		.attr("r", 5)
		.style("fill", function(d) { return color(d.group); })
		.call(force.drag);

	    node.append("title")
		.text(function(d) { return d.name; });

	    // create name strings to display groups
	    var names = ["", "", "", "", "", "", "", "", "", ""]; //XXX
	    for (var i in force.nodes()) {
		var theNode = force.nodes()[i];
		if (theNode.group > 0)
		    names[theNode.group] += "<p>" + theNode.name + "</p>";
	    }

	    node.on("mouseover", function(d) {
		    if (d) {
			d3.select("#show-names")
			    .html(names[d.group]);
		    }
		});

	    force.on("tick", function(e) {
		    node.each(gravity(.2 * e.alpha));
		    link.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });

		    node.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; });
		});
	});

    // Draw ME towards center
    function gravity(alpha) {
	return function(d) {
	    if (d.name == me) {
		d.x = width / 2.0;
		d.y = height / 2.0;
	    }
	};
    }
}