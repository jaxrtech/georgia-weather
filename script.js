$(document).ready(function() {

'use strict';

var url = "https://query.yahooapis.com/v1/public/yql?q=select%20content%20from%20html%20where%20content%20like%20%27%25County%20Schools%25%27%20and%20url%3D%22http%3A%2F%2Fftpcontent3.worldnow.com%2Fwaga%2Fclosings%2Fclosings2013.htm%22%20and%20compat%3D%22html5%22%20and%20xpath%3D%27%2Fhtml%2Fbody%2Fp%2Fb%27%20&format=json&callback=";

$.getJSON(url, function(json_canceled) {
  console.log(json_canceled);
  
  var canceled = function() {
    var temp = json_canceled.query.results.b;
    var result = [];
    for (var i = 0; i < temp.length; i++) {
      result.push(temp[i].replace(" County Schools", ""));
    }
    return result;
  }();
  
  $.getJSON("counties.json", function(json) {
    var values = [];

    for (var i = 0; i < json.length; i++) {
      var name = json[i];
      var formatting = function() {
        if (canceled.indexOf(name) > 0) {
          return { color: "#658fff", opacity: 1 };
        } else {
          return { color: "#ffffff", opacity: 0 };
        }
      }();
      
      values.push({
        value: name,
        vectorOptions: {
          fillColor: formatting.color,
          fillOpacity: formatting.opacity,
          opacity: 1,
          color: "#c7c7c7",
          weight: 3
        }
      });
    }

    var result = {
      type: "unique",
      property: "name",
      values: values
    };

    $("#style-script").html(JSON.stringify(result));
  });
});

});