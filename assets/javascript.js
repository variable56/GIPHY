//Array for topics that will create buttons
let topics = ["Batman", "Superman", "Wonder Woman", "Joker", "Red Hood", "Scarecrow"]





$(document).ready(function(){

//For loop that will make a button for every term in the array
function makeButtons() {
for (i=0; i < topics.length; i++) {
    $("#buttonContainer").append("<button class=\"btn btn-primary btn-lg btn-block\">" + topics[i] + "</button>");
    }
}
makeButtons();
$("#submit").on("click", function() {

    // alert("working");
    topics.push($("#searchTerm").val());
    $("#buttonContainer").empty();
    makeButtons();
    


});

    

})