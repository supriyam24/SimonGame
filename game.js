
let buttonColours = ["red","blue","green","yellow"];
let gamePattern = [];
var userClickedPattern = [];

$(".btn").click(function(){

  //to store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
})

var started = false;
var level = 0;
$(document).on('keypress', function(event){
    if(!started){
        started = true;
        nextSequence();
        checkAnswer()

        //$("h1").text("Level "+level);
        $("#level-title").text("Level " + level);
    }
})

function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
      console.log("Success");

      if (gamePattern.length == userClickedPattern.length) {

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    }else {
      console.log("wrong");
      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      startOver();
      
    }
}

function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function nextSequence(){

  userClickedPattern = [];
  level++;
  //$("h1").text("Level" + level);
  // Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

function startOver(){
    gamePattern = [];
    level = 0;
    started = false;
}