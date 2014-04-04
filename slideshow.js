
function slideshow(metro) {
  var first = true;
  var current = 0;
  var timeology = 1;
  var focus;

  var id = fresh("slideshow");
  function showcallback(d) {
    $("#fulltext").empty();
    if (d) { // TODO ~ats change this to revealing photo divs (also need to hide on mouseout...)
      d3.html("imagePages/" + d.id.substr(1) + ".html", function(doc) {
        $("#fulltext")
          .append(doc);
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
  function my(controls, timecontrols, linecontrols, panel) {
    function redraw() {
      my(controls, timecontrols, linecontrols, panel);
    }

    /*
    //topological vs. time
    timecontrols.selectAll(".timeologys")
      .data([{name: "Topological"},
             {name: "Time to scale"}
             ])
      .enter()
      .insert("span")
      .attr("class", "timeologys")
      .call(function(span) {
        span.insert("input")
          .attr("type", "radio")
          .attr("name", "timeology")
          .attr("id", function(_,i) {return tid + i})
          .attr("value", function(_,i) {return i})
          .on("change", function(d,i) {
            if (i != timeology) {
              timeology = i;
              show_data();
            }
          });
        span.insert("label")
          .attr("for", function(_,i) {return tid + i})
          .text(function(d) {return d.name});
      })
      ;
    timecontrols.selectAll("input[type=radio]")
        .property("checked", function(_,i) {return i == timeology});
    timecontrols.jq().buttonset();
    */

    //legend and highlighting for different lines //~ats take this out for now
    /*
    linecontrols.selectAll(".lines")
      .data([{name: "kittens", focus: "l0", svg_id: "svg_legend", color_id: "color_blue"},
             {name: "more kittens", focus: "l1", svg_id: "svg_legend", color_id: "color_orange"},
             {name: "so many kittens", focus: "l2", svg_id: "svg_legend", color_id: "color_green"},
             {name: "infinity kittens", focus: "l3", svg_id: "svg_legend", color_id: "color_red"},
             {name: "view all the kittens", svg_id: "svg_legend", color_id: "color_none"},
             ])
      .enter()
      .insert("span")
      .attr("class", "lines")
      .call(function(span) {
        span.insert("input")
          .attr("type", "radio")
          .attr("name", "line")
          .attr("id", function(_,i) {return lid + i})
          .attr("value", function(_,i) {return i})
          .on("change", function(d,i) {
            if (focus != d.focus) {
              focus = d.focus;
              show_data();
            }
          });
        span.insert("label")
          .attr("for", function(_,i) {return lid + i})
          .call(function(label) {
            label.insert("svg")
              .attr("id",function(d,_) {return d.svg_id;})
              .insert("line")
              .attr("id",function(d,_) {return d.color_id;})
              .attr("x1","0")
              .attr("y1","7")
              .attr("x2","15")
              .attr("y2","7");
            label.insert("span").text(function(d) {return d.name});
          });
      })
      ;
    linecontrols.selectAll("input[type=radio]")
        .property("checked", function(d,i) {
          return focus == d.focus;
        });
    linecontrols.jq().buttonsetv();
    */
    if (!first) {
      // mostly fixed bug by preserving selected state.  but, now
      // sometimes has black text on black background, not very
      // repeatable though.
      // ezyang: These two functions should not be run the first
      // time we render, esp for debug mode XXX HACK
      show_data();
      //      metro.show(steps[current].show || false);
      //      showcallback(steps[current].show || false);
    } else {
      first = false;
    }
  }
  my.current = function(v) {
    if (!arguments.length) return current;
    current = v;
    return my;
  }
  my.steps = function(v) {
    if (!arguments.length) return steps;
    steps = v;
    return my;
  }
  return my;
}

