
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetVal = $('#street').val();
    var cityVal = $('#city').val();
    var linkText = '<img class=bgimg src=\"http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + streetVal + ', ' + cityVal + '\">';
    $('body').append(linkText)

    return false;
};

$('#form-container').submit(loadData);
