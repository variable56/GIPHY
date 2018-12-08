//Array for topics that will create buttons
let topics = ["Batman", "Superman", "Wonder Woman", "Joker", "Red Hood", "Scarecrow"]
let gifArray = [];





// $(document).ready(function(){

//For loop that will make a button for every term in the array
function makeButtons() {
    for (i = 0; i < topics.length; i++) {
        $("#buttonContainer").append("<button data=\"" + topics[i] + "\"class=\"btn btn-primary btn-lg btn-block apiButton\">" + topics[i] + "</button>");
    }
}

makeButtons();

//make new buttons after searching
$("#sidebar").on("click", "#submit", function () {

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
    }).then(function (response) {
            gifArray = [];
            for (let i = 0; i <= response.data.length -1; i++) {
            
            gifArray.push({
                stillImage: response.data[i].images.fixed_height_still.url,
                animateImage: response.data[i].images.fixed_height.url,
                rating: response.data[i].rating,
                title: response.data[i].title,
                giphyId: response.data[i].id
            });
            
            // console.log(gifArray);
        }
        renderGif();
    });
    
});



function renderGif(response) {

    
    //logs to the console the JSON object
    // console.log(response);
    //empties the gifContainer of any previous images
    $("gifContainer").empty();
    //creates variables for the information in the object and then adds a card for all 10 items in the object along with all the attributes
    for (i = 0; i < gifArray.length; i++) {


    newGif = $("#gifContainer").append("<div id=\"" + gifArray[i].title + "\" state=\"still\" class=\"card m-3\"  style=\"width: 18rem;\"><img id=\"" + gifArray[i].giphyId + "\" state=\"still\" class=\"card-img-top\" src=" + gifArray[i].stillImage + " still=\"" + gifArray[i].stillImage + "\" animate=\"" + gifArray[i].animateImage + "\" alt=\"Card image cap\"><div class=\"card-body\"><p class=\"card-text text-center border-warning\">" + "Rated: " + gifArray[i].rating + "</p></div></div>");
    
    }
        
}

$("#gifContainer").on("click", "img", function() {
  
if ($(this).attr("src") == $(this).attr("still")) {
    $(this).attr("src", $(this).attr("animate"));
    console.log($(this).attr("src"))
    return;
}
if ($(this).attr("src") == $(this).attr("animate")) {
    $(this).attr("src", $(this).attr("still"));
    console.log($(this).attr("src"));
    return;
    }



});

//Can't get gifs to animate on clicking it has something to do with the fact that it's a bootstrap card im clicking on that has a nested img
//When adding a new button, it breaks the ajax call for all buttons
//the data attributes for each of my cards is going through the array

//objects from ajax are in an array
//need to make the buttons render from newly created array
//onclick to animate images should be based on new array