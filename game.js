
var buttonColours = ['red','green','yellow','blue'];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var start = false;
var gameOver = false;

// $(document).keypress(function() {
//     if (!start) {
//       $("#level-title").text("Level " + level);
//       nextSequence();
//       start = true;
//     }
//   });
  

// $(document).on("click touchstart", function () {
//     if (!start && !gameOver) {
//         nextSequence();
//         start = true;
//         gameOver = false;
//     }
// });

$('.retry').hide();

$('.start').click(function(){
    if (!start && !gameOver) {
        nextSequence();
        start = true;
        gameOver = false;
       
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
       console.log("Game Over triggered");
       $("#level-title").html('Game Over, Press <div type="button" class="retry"><span style="color:#011F3F;">Retry</span> </div> Button to Restart');
       console.log($("#level-title").text());
       setTimeout(function(){
        $('body').removeClass('game-over');
       },200);
      
       gameOver = true;
       $('.retry').show();

    }
}

$(document).on('click', '.retry', function() {
    startOver(); // Call the startOver function when retry button is clicked
});

function startOver() {
    gamePattern = [];
    level =0;
    start = false;
    gameOver = false;
    $('.retry').hide();  // Hide the retry button after the game restarts
    $("#level-title").text('Level ' + level);  // Reset the level title
    nextSequence();  // Start a new game
    
}