$(function() {

    //form validation (counter) and post function when "tweet" button pressed
    //serialize input into string obj NOT JSON

    $("form").submit(function(event) {

        event.preventDefault();

        let count;
        count = $("#tweet-input").val().length;
        if (count === 0) {
            alert("Can not post blank tweets");
        }
        if (count > 140) {
            alert("Can't submit a tweet longer than 140 characters")
        } else {
            let tweetString = $("form").serialize();
            $.ajax({
                method: 'POST',
                url: '/tweets',
                data: tweetString,
                encode: true,
                success: function() {
                    $("tweet-input").value = "";
                    loadTweets();
                }
            })
            $("#tweet-input").val('');
        }
    })

    //slide down toggle response "button" click to add compose tweet container

    $('.button').on("click", function(event) {
        event.preventDefault()
        if ($(".new-tweet").is(":hidden")) {
            $(".new-tweet").slideDown("slow");
            //focus on that text area
            $('#tweet-input').focus();
        } else {
            $(".new-tweet").slideUp("slow");
        }
    });

    //jquery to create new tweet element

    function createTweetElement(tweet) {

        let $article = $("<article>").addClass("tweet")

        let $header = $("<header>").addClass("tweet-header")
            .append($("<img>").addClass("user-avatar").attr("src", tweet.user.avatars.small))
            .append($("<h1>").addClass("user-name").text(tweet.user.name))
            .append($("<span>").addClass("user-handle").text(tweet.user.handle))

        let $main = $("<main>").addClass("tweet-content")
            .append($("<div>").addClass("tweet-content").text(tweet.content.text))

        let $icons = $("<div>").addClass("tweet-actions")
            .append($("<i>").addClass("fa fa-flag"))
            .append($("<i>").addClass("fa fa-retweet"))
            .append($("<i>").addClass("fa fa-heart"))

        let $footer = $("<footer>").addClass("tweet-footer")
            .append($("<div>").addClass("tweet-timestamp").text(moment(tweet.created_at).fromNow()))
            .append($("<div>").addClass("tweet-actions"))
            .append($icons);

        let $combine = $article.append($header).append($main).append($icons).append($footer);

        return $combine;

    }


    //get request to load tweets into memory ready to be rendered

    function loadTweets() {
        $.ajax({
            url: '/tweets',
            method: 'GET',
            success: function(data) {
                let arr = data[data.length - 1];
                let $newTweet = createTweetElement(arr);
                $('#tweets-container').prepend($newTweet);
            }
        });
    }

    // render tweets and prepend them in tweet's container

    function renderTweets() {

        $.ajax({
            url: '/tweets',
            method: 'GET',
            success: function(tweets) {
                tweets.forEach(function(eachT) {
                    let $tweet = createTweetElement(eachT);
                    $('#tweets-container').prepend($tweet);

                })
            }
        });
    }

    renderTweets();

});