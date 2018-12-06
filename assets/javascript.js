//Array for topics that will create buttons
let topics = ["Batman", "Superman", "Wonder Woman", "Joker", "Red Hood", "Scarecrow"]





// $(document).ready(function(){

//For loop that will make a button for every term in the array
function makeButtons() {
    for (i = 0; i < topics.length; i++) {
        $("#buttonContainer").append("<button data=\"" + topics[i] + "\"class=\"btn btn-primary btn-lg btn-block apiButton\">" + topics[i] + "</button>");
    }
}

makeButtons();
//make new buttons after searching
$("#submit").on("click", function () {

    topics.push($("#searchTerm").val());
    $("#buttonContainer").empty();
    makeButtons();
});



//click event for buttons to run the ajax call
$(".apiButton").on("click", function () {

    $("#gifContainer").empty();
    var host = "https://api.giphy.com/"
    var path = "v1/gifs/search?&"
    var q = "q=" + $(this).attr("data") + "&"
    var limit = "limit=10&"
    var key = "api_key=bSAuwMkKih45mkCg8HU18TqeCW3IRRmU";

    $.ajax({
        url: host + path + q + limit + key,
        method: "GET"
    })

        .then(function (response) {


            //logs to the console the JSON object
            console.log(response);
            //empties the gifContainer of any previous images
            $("gifContainer").empty();
            //creates variables for the information in the object and then adds a card for all 10 items in the object along with all the attributes
            for (i = 0; i < response.data.length; i++) {

                let stillImage = response.data[i].images.fixed_height_still.url;
                let animateImage = response.data[i].images.fixed_height.url
                let rating = response.data[i].rating;
                let title = response.data[i].title;
                let giphyId = response.data[i].id;
                newGif = $("#gifContainer").append("<div id=\"" + title + "\" class=\"card m-3\"  style=\"width: 18rem;\"><img id=\"" + giphyId + "\" state=\"still\" class=\"card-img-top\" src=" + stillImage + " still=\"" + stillImage + "\" animate=\"" + animateImage + "\" alt=\"Card image cap\"><div class=\"card-body\"><p class=\"card-text text-center border-warning\">" + "Rated: " + rating + "</p></div></div>");


                //This is the click event that should start and stop the animation
                $(title).on("click", function () {
                    console.log(title);
                    //$(this).attr("src", animateImage);

                })


            }

        });
});



// });


// });

//Can't get gifs to animate on clicking it has something to do with the fact that it's a bootstrap card im clicking on that has a nested img
//When adding a new button, it breaks the ajax call for all buttons
//the data attributes for each of my cards is going through the array