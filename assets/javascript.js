//Array for topics that will create buttons
let topics = ["Batman", "Superman", "Wonder Woman", "Joker", "Red Hood", "Scarecrow"]





// $(document).ready(function(){

//For loop that will make a button for every term in the array
function makeButtons() {
for (i=0; i < topics.length; i++) {
    $("#buttonContainer").append("<button data=\"" + topics[i] +  "\"class=\"btn btn-primary btn-lg btn-block\">" + topics[i] + "</button>");
    }
}

makeButtons();
//make new buttons after searching
$("#submit").on("click", function() {

    topics.push($("#searchTerm").val());
    $("#buttonContainer").empty();
    makeButtons();
});


//click event for buttons to run the ajax call
$(".btn").on("click", function(){
    
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

    .then(function(response){
        console.log(response);
        $("gifContainer").empty();

        for (i = 0; i < response.data.length; i++) {
        
        let stillImage = response.data[i].images.fixed_height_still.url;
        let rating = response.data[i].rating;
        let newGif = $("#gifContainer").append("<div class=\"card m-3\"  style=\"width: 18rem;\"><img  state=\"still\" data=\"" + topics[i] +  "\"class=\"card-img-top\" src=" + stillImage + " alt=\"Card image cap\"><div class=\"card-body\"><p class=\"card-text text-center border-warning\">" + "Rated: " + rating + "</p></div></div>");
        let animateImage = response.data[i].images.fixed_height.url

        newGif.attr("src", stillImage);

        $("img").on("click", function() {
            console.log(this);
        
            if ($(this).attr("state") == "still") {
                $(this).attr("src", response.data[i].images.fixed_height.url);
                $(this).attr("state", "animate");
              }
              
        
              if ($(this).attr("state") == "animate") {
                $(this).attr("src", response.data[i].images.fixed_height_still.url);
                $(this).attr("state", "animate");
              }
            });
        
    }
    
    });  

});
//plays and pauses gif


// });

