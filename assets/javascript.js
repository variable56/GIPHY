//Array for topics that will create buttons
let topics = ["Batman", "Superman", "Wonder Woman", "Joker", "Red Hood", "Scarecrow"]

function apiCall() {
    
    var host = "https://api.giphy.com/"
    var path = "v1/gifs/search?&"
    var q = "q=batman&"
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

        newGif.attr("src", stillImage);

        $("#gifContainer").append(newGif);
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
    

