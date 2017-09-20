$(document).ready(function() {});

function createTweetElement(tweet) {

    var $article = $("<article>").addClass("tweet")

    var $header = $("<header>").addClass("tweet-header")
        .append($("<img>").addClass("user-avatar").attr("src", tweet.user.avatars.small))
        .append($("<h1>").addClass("user-name").text(tweet.user.name))
        .append($("<span>").addClass("user-handle").text(tweet.user.handle))

    var $main = $("<main>").addClass("tweet-content")
        .append($("<div>").addClass("tweet-content").text(tweet.content.text))

    var $icons = $("<div>").addClass("tweet-actions")
        .append($("<i>").addClass("fa fa-flag"))
        .append($("<i>").addClass("fa fa-retweet"))
        .append($("<i>").addClass("fa fa-heart"))

    var $footer = $("<footer>").addClass("tweet-footer")
        .append($("<div>").addClass("tweet-timestamp").text(tweet.created_at))
        .append($("<div>").addClass("tweet-actions"))
        .append($icons);

    var $combine = $article.append($header).append($main).append($icons).append($footer);

    return $combine;

}


function renderTweets(tweets) {
    tweets.forEach(function(eachT) {
        let $tweet = createTweetElement(eachT);
        $('#tweets-container').append($tweet);

    });
}



function loadTweets() {
    $.ajax({
        url: '/tweets',
        method: 'GET',
        success: function(data) {
            renderTweets(data);
        }
    });
}


loadTweets();

renderTweets(tweetData);