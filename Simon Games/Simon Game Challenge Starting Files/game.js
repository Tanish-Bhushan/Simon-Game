var buttonColours = ["red", "blue", "green", "yellow"];
var gamepattern = [];
var userClickedPattern = [];
var level = 0;

$(".btn").click(function () {
    console.log("added");
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playsound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})

function nextSequence() {
    level += 1;
    $("h1").html("Level " + level);
    var rnumber = Math.floor(Math.random() * 4);
    gamepattern.push(buttonColours[rnumber]);
    $("." + buttonColours[rnumber]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playsound(color) {
    var audio = new Audio('sounds/' + color + '.mp3');
    audio.play();
}

function animatePress(col) {
    $("." + col).addClass("pressed");
    setTimeout(function () {
        $("." + col).removeClass("pressed");
    }, 100);
}

$(document).keypress(function () {
    if (level === 0)
        game();
});

function checkAnswer(currentLevel) {

    if (gamepattern[currentLevel] !== userClickedPattern[currentLevel]) {
        gameover();
    }
    if (currentLevel == gamepattern.length - 1) {
        game();
    }
}

function gameover() {
    var audio = new Audio('sounds/wrong.mp3');
    audio.play();
    $("h1").html("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
    startOver();
}

function startOver() {
    gamepattern = [];
    level = 0;
}

function game() {
    setTimeout(function () {
        userClickedPattern = [];
        nextSequence();
    }, 1000);


}