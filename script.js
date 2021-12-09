var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var isStart = false;

function playSound(color){
    var audio = new Audio('sounds/' + color + '.mp3');
    audio.play();
}

function nextSequence(){
    level++;
    $("h1").text("Level " + level);
    userClickedPattern.length = 0;
    var randomNumbers = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumbers];
    gamePattern.push(randomChosenColour);
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function checkAnswer(){
        if (userClickedPattern[userClickedPattern.length - 1]===gamePattern[userClickedPattern.length - 1]){
            if (userClickedPattern.length == gamePattern.length){
                setTimeout(() => { nextSequence(); }, 1000);
            }
        }
        else {
            $("body").addClass("game-over");
            $("h1").text("Game Over, Press Any Key To Restart");
            setTimeout(() => { $("body").removeClass("game-over"); }, 200);
            playSound("wrong");
            gamePattern.length = 0;
            level = 0;
            isStart = false;
        }
    
}

$(".btn").click(function(){
    $(this).addClass("pressed");
    setTimeout(() => { $(this).removeClass("pressed"); }, 100);
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    checkAnswer();

});

$(document).keypress(function(){
    if (isStart == false){
        $("h1").text("Level " + level);
        nextSequence();
        isStart = true;
    }
});

