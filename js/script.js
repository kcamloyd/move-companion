
function loadData() {

    var body = $('body');
    var wikiElem = $('#wikipedia-links');
    var nytHeaderElem = $('#nytimes-header');
    var nytElem = $('#nytimes-articles');
    var greeting = $('#greeting');

    // clear out old data before new request
    wikiElem.text("");
    nytElem.text("");

    // load streetview
    var streetVal = $('#street').val();
    var cityVal = $('#city').val();
    var address = streetVal + ', ' + cityVal;

    $('#greeting').text('So, you want to live at ' + address + '?');

    var linkText = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address;

    $('body').append('<img class=bgimg src="' + linkText + '">');

    // load NYTimes Articles
    var nytimesUrl = 'https://api.nytimes.com/svc/search/v2/' +
      'articlesearch.json?q=' + cityVal +
      '&sort=newest&api-key=121c1052355a426487938844b906a199';

    $.getJSON(nytimesUrl, function(data){
      nytHeaderElem.text('New York Times articles about ' + cityVal);

      articles = data.response.docs;
      for (var i = 0; i<articles.length; i++) {
        var article = articles[i];
        nytElem.append('<li class="article">' +
          '<a href="' + article.web_url + '">' + article.headline.main +
            '</a>' +
          '<p>' + article.snippet + '</p>' +
        '</li>');
      };
    });

    return false;
};

$('#form-container').submit(loadData);
