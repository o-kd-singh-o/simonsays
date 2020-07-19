var buttonColor = ["red","blue","green","yellow"];   //main color array
var level=0;
var game = false;
var gamePattern = [];    //overall gamer color pattern to be followed
var userPattern = [];   //overall game color patter user followed


$(document).on("keypress",function(){
  if(game===false){
    game = true;
    nextSequence();   //calling the overall main function
  }
})


function nextSequence(){  //using random no to generate random color
  userPattern = [];   //reseting the array for next level

  var randomNo = Math.floor(Math.random()*4);
  randomChoosenColor = buttonColor[randomNo];
  gamePattern.push(randomChoosenColor);   //adding new ccolor to the game pattern array

  $("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);  //animation effect to the div button
  makeSound(randomChoosenColor)

  level++;
  $("#level-title").text("Level "+level);
}


function checkAnswer(currentLevel){
  if(userPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("Success");
    if(userPattern.length === gamePattern.length){  //can also compare currentLevel+1 === gamePattern.length
      setTimeout(function(){
        nextSequence();
      },1000)
    }
  }

  else{
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200)

    $("#level-title").html("Game Over!<br><span class = 'subtitle'>Press Any Key to Restart<span>");
    startOver();
  }
}

function startOver(){
  level=0;
  game = false;
  gamePattern = [];
  userPattern = [];
}


$(".btn").on("click",function(event){   //using btn class to choose all the div buttons
  var userChoosenColor =  $(event.target).attr("id");   //to retrieve the id of the div buttons --> here this can also be used as $(this).attr("id")
  userPattern.push(userChoosenColor);  //adding new color to the user pattern array
  makeSound(userChoosenColor);

  animatePress(this);   //Press button animation

  checkAnswer(userPattern.length-1);
});


function makeSound(colorName){
  var audio = new Audio("sounds/"+colorName+".mp3");  //to play audio
  audio.play();
}

function animatePress(currentColor){  //Basically to have a difference between when computer pressed the button and when player pressed the button this is being used.
  $(currentColor).addClass("pressed");
  setTimeout(function(){
    $(currentColor).removeClass("pressed");
  },100);
}













/*
var audio;
switch(randomChoosenColor){
case "red":
    $("#"+randomChoosenColor).fadeOut(200).fadeIn(200);
    audio = new Audio("sounds/red.mp3");
    audio.play();
  break;

case "blue":
    $("#"+randomChoosenColor).fadeOut(200).fadeIn(200);
    audio = new Audio("sounds/blue.mp3");
    audio.play();
  break;

case "green":
    $("#"+randomChoosenColor).fadeOut(200).fadeIn(200);
    audio = new Audio("sounds/green.mp3");
    audio.play();
  break;

case "yellow":
    $("#" + randomChoosenColor).fadeOut(200).fadeIn(200);
    audio = new Audio("sounds/yellow.mp3");
    audio.play();
  break;
}
*/
