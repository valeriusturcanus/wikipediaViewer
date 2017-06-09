$(document).ready(function() {

    function getArticles(intemSearched, manyArticles) {
        var wikiAddress = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + intemSearched + "&format=json&callback=wikiCallback";
        var wikiAddress2 = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + intemSearched;
        var wikiAddress3 = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + intemSearched + "&limit=" + manyArticles;
        $(".articleContainer").html(null);
        $.ajax({
            url: wikiAddress3,
            dataType: "jsonp",
            success: function(response) {
                for (var i = 0; i < response[1].length; i++) {
                    var urlArticle = response[3][i];
                    var wikiTitle = response[1][i];
                    var wikiParagrath = response[2][i];
                    var article = "<article><h2><a href='" + urlArticle + "'>" + wikiTitle + "</a></h2>" + "<p>" + wikiParagrath + "</p></article>"
                    $(".articleContainer").append(article);
                };
            }
        });

    }

    $(document).keypress(function() {
        var searchIntem = $("input").val();
        if (searchIntem) {
            getArticles(searchIntem, 12);
        }
    });
    $("#button").click(function() {
        var wikiRandomArticle = "http://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnnamespace=0&rnlimit=1";
        var randomArticle;
        $.ajax({
            url: wikiRandomArticle,
            dataType: "jsonp",
            success: function(response) {
                randomArticle = response.query.random[0].title;
                getArticles(randomArticle, 1);
            }
        });
    })
})
