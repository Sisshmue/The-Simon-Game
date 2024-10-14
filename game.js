
var buttonColours = ['red','green','yellow','blue'];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var start = false;

// $(document).click(function () {
//     if(!start){
//         nextSequence();
//         start = true;
//     }
// })

$(document).on("click touchstart", function () {
    if (!start) {
        nextSequence();
        start = true;
    }
});

$('.btn').click(function (event) {
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1); 
}
)

function nextSequence(){
    userClickedPattern =[];
    $('h1').text("level "+level);
    level++;

    var randomNum = Math.floor(Math.random()*4);

    var randomChosenColours = buttonColours[randomNum];

    gamePattern.push(randomChosenColours);

    $('#'+randomChosenColours).fadeOut(100).fadeIn(100);
   
    playSound(randomChosenColours);

}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $('.'+currentColour).addClass('pressed');
    setTimeout(function () {      
        $("."+currentColour).removeClass("pressed");         
}, 100);
}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }else{
       playSound('wrong');
       $('body').addClass('game-over');
       setTimeout(()=>{
        $('body').removeClass('game-over')
       },200);
       $('h1').text('Game Over, Press Any Key to Restart');
       startOver();
    }
}

function startOver() {
    gamePattern = [];
    level =0;
    start = false;
}