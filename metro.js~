// Metro map code
function metro(container) {

    var width = 800,
	height = 400;
    var color = d3.scale.ordinal()
	.domain([1,2,3,4,5,6,7,8,9,10])
	.range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"]);

    var force = d3.layout.force() // TODO we need to do this better
	.charge(-200)
	.linkDistance(20)
	.size([width, height]);

    var svg = container.append("svg")
	.attr("width", width)
	.attr("height", height)
	.on("click", function() { d3.select("#show-image").empty(); }); //TODO broken

    var g = svg.append("g");

    d3.json("test-map.json", function(error, graph) {
	    force
		.nodes(graph.nodes)
		.links(graph.links)
		.start();

	    var link = g.selectAll(".link")
		.data(graph.links)
		.enter().append("line")
		.attr("class", "link")
		.style("stroke", function(d) { return color(d.line); })
		.style("stroke-width", 10);

	    var node = g.selectAll(".node")
		.data(graph.nodes)
		.enter().append("circle")
		.attr("class", "node")
		.attr("r", 5)
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
		    link.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });

		    node.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; });
		});
	});

}