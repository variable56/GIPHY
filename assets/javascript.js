//Array for topics that will create buttons
let topics = ["Batman", "Superman", "Wonder Woman", "Joker", "Red Hood", "Scarecrow"]





$(document).ready(function(){

//For loop that will make a button for every term in the array
for (i=0; i < topics.length; i++) {
    $("#buttonContainer").append("<button class=\"btn btn-primary btn-lg btn-block\">" + topics[i] + "</button>");
    }


    

})