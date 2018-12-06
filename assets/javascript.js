//Array for topics that will create buttons
let topics = ["Batman", "Superman", "Wonder Woman", "Joker", "Red Hood", "Scarecrow"]

function apiCall() {
    $("#gifContainer").empty();
    var host = "https://api.giphy.com/"
    var path = "v1/gifs/search?&"
    var q = "q=" + "batman" + "&"
    var limit = "limit=10&"   
    var key = "api_key=bSAuwMkKih45mkCg8HU18TqeCW3IRRmU";
    
    $.ajax({
        url: host + path + q + limit + key,
        method: "GET"
    })

    .then(function(response){
        $("gifContainer").empty();
        console.log(response);

        for (i = 0; i < response.data.length; i++) {
        
        let newGif = $("<img>"); 
        let stillImage = response.data[i].images.fixed_height_still.url;
        let rating = response.data[i].rating;
        newGif.attr("src", stillImage);

        // $("#gifContainer").append(newGif);
        // $("#gifContainer").append(rating);

        $("#gifContainer").append("<div class=\"card\" style=\"width: 18rem;\"><img class=\"card-img-top\" src=" + stillImage + " alt=\"Card image cap\"><div class=\"card-body\"><p class=\"card-text\">" + "Rated: " + rating + "</p></div></div>");
        }

    });      
}




$(document).ready(function(){

//For loop that will make a button for every term in the array
function makeButtons() {
for (i=0; i < topics.length; i++) {
    $("#buttonContainer").append("<button class=\"btn btn-primary btn-lg btn-block\">" + topics[i] + "</button>");
    }
}

makeButtons();
//make new buttons after searching
$("#submit").on("click", function() {

    topics.push($("#searchTerm").val());
    $("#buttonContainer").empty();
    makeButtons();
});

});
//click event for buttons to run the ajax call
$(this).on("click", function(){
    
    apiCall();
});
    

