
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

    // load NYTimes articles
    var nytimesUrl = 'https://api.nytimes.com/svc/search/v2/' +
      'articlesearch.json?q=' + cityVal +
      '&sort=newest&api-key=121c1052355a426487938844b906a199';

    $.getJSON(nytimesUrl, function(data){
      nytHeaderElem.text('New York Times articles about ' + cityVal);

      var articles = data.response.docs;
      for (var i = 0; i<articles.length; i++) {
        var article = articles[i];
        nytElem.append('<li class="article">' +
          '<a href="' + article.web_url + '" target=blank>' +
            article.headline.main +
          '</a>' +
          '<p>' + article.snippet + '</p>' +
        '</li>');
      };
    }).fail(function() {
      nytHeaderElem.text('New York Times articles could not be loaded');
    });

    // load Wikipedia links
    var wikipediaURL = 'https://en.wikipedia.org/w/api.php?action=opensearch' +
      '&search=' + cityVal + '&format=json';

    $.ajax({
      url: wikipediaURL,
      dataType: 'jsonp',
      success: function(response) {
        var links = response[1];
        for (var i = 0; i<links.length; i++) {
          var link = links[i];
          wikiElem.append('<li>' +
            '<a href="https://en.wikipedia.org/wiki/' + link + '" target=blank>' +
              link +
            '</a>' +
          '</li>');
        };
      }
    }).fail(function() {
      wikiElem.append('<p>Wikipedia links could not be loaded</p>');
    });

    return false;
};

$('#form-container').submit(loadData);
