
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
    var address = streetVal + ', ' + cityVal;
    $('#greeting').text('So, you want to live at ' + address + '?');
    var linkText = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address;
    $('body').append('<img class=bgimg src="' + linkText + '">');

    return false;
};

$('#form-container').submit(loadData);
