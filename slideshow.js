
function slideshow(metro) {
  var first = true;
  var timeology = 1;
  var focus;

  var id = fresh("slideshow");
  function showcallback(d) {
    $("#fulltext").empty();
    if (d) {
      d3.html("blank.html", function(doc) {
        $("#fulltext")
	.append("<img style=\"max-width:400px;max-height:500px;\"  src=\"images/" + d.id.substr(1) + ".png\" >");
      });
    }
  };
  metro.showcallback(showcallback);
  var tid = fresh("timeology");
  var lid = fresh("line");
  function json_datas(t, l) {
    if (t == 0) {
      return "sample.json";
    } else {
      if (!l || l == "l0") return "preserving.json";
      else return l + ".json";
    }
  }
  function show_data() {
    d3.json(json_datas(timeology,focus), function(dat) {
      metro.state(dat).focus(focus).animate(1000).stop();
      d3.selectAll(".axis").transition().duration(1000).style("opacity", timeology == 0 ? 0 : 1);
    });
  }

  // CLASSES: page, next, text
  function my() { //controls, timecontrols, linecontrols, panel) {
    function redraw() {
	my(); //controls, timecontrols, linecontrols, panel);
    }

    if (!first) {
      show_data();
    } else {
      first = false;
    }
  }
  return my;
}

