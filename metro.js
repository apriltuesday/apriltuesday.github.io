// Metro map code
function metro(container) {

    var width = 800,
	height = 400;
    var color = d3.scale.category10();

    var force = d3.layout.force()
	.charge(-200)
	.linkDistance(20)
	.size([width, height]);

    var svg = container.append("svg")
	.attr("width", width)
	.attr("height", height);

    var g = svg.append("g");

    d3.json("test-map.json", function(error, graph) {
	    force
		.nodes(graph.nodes)
		.links(graph.links)
		.start();

	    var link = g.selectAll(".link")
		.data(graph.links)
		.enter().append("line")
		.attr("class", "link");

	    var node = g.selectAll(".node")
		.data(graph.nodes)
		.enter().append("circle")
		.attr("class", "node")
		.attr("r", 5)
		.style("fill", function(d) { return color(d.line); })
		.call(force.drag);

	    node.append("title")
		.text(function(d) { return d.id; });

	    force.on("tick", function() {
		    link.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });

		    node.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; });
		});
	});

}