
var additionalInfo = {
  "title": document.title,
  "selection": window.getSelection().toString()
};

var convertFromCups = function(from) {
  from = from.replace(/\s*[-]?\s*[\u00BC]/, ".25");
  from = from.replace(/\s*[-]?\s*[\u00BD]/, ".5");
  from = from.replace(/\s*[-]?\s*[\u00BE]/, ".75");
  from = from.replace(/\s*[-]?\s*[\u2153]/, ".33");
  from = from.replace(/\s*[-]?\s*[\u2154]/, ".66");
  var orig = parseFloat(from);
  var conv = orig * 237;
  var rounded = Math.round(conv / 5) * 5;
  return rounded + "ml";
};

var applyConversion = function(regex, convert) {
  $("body *").find(':not(.universal-cookbook-translation *)').replaceText(regex, function(from) {
    var to = convert(from);
    return '<span class="universal-cookbook-translation">' +
             '<span class="universal-cookbook-from">' + from + '</span>' +
             '<span class="universal-cookbook-to">' + to + '</span>' +
           '</span>';
  });
};

applyConversion(/\b\d+\.\d+\s+cup[s]?\b/i, convertFromCups);
applyConversion(/\b\d+\s+cup[s]?\b/i, convertFromCups);
applyConversion(/\b\d+\s*[-]?\s*[\u00BC\u00BD\u00BE\u2153\u2154]\s*cup[s]?\b/i, convertFromCups);
applyConversion(/[\u00BC\u00BD\u00BE\u2153\u2154]\s*cup[s]?/, convertFromCups);


var translationelems = $(".universal-cookbook-translation");
translationelems.css("position", "relative");
translationelems.css("padding", "0");

var fromelems = $(".universal-cookbook-from");
fromelems.hide();
fromelems.css("position", "absolute");
fromelems.css("top", "1.75em");
fromelems.css("z-index", "99");
fromelems.css("background-color", "yellow");
fromelems.css("color", "black");
fromelems.css("padding", "0");

var toelems = $(".universal-cookbook-to");
toelems.css("background-color", "blue");
toelems.css("color", "white");
fromelems.css("padding", "5px");
fromelems.css("min-width", "100px");

toelems.mouseover(function() {
  $(this).siblings(".universal-cookbook-from").show();
});

toelems.mouseleave(function() {
  $(this).siblings(".universal-cookbook-from").hide();
});

chrome.extension.connect().postMessage(additionalInfo);
