// //object block question and answer
// var trivia = [
// 	{number: 0, question: "Where is the highest point in the world?", answer: "Mount Chimborazo"},
// 	{number: 1, question: "In what country can you weigh less, just by living there?", answer: "Canada"},
// 	{number: 2, question: "Hurg de gurge in flibben flabben?", answer: "Foobar"},
// 	{number: 3, question: "How are you feeling?", answer: "Great"}
// ]

// //object block stores other answers
// var notAnswers = [
// 	["Mount Kilimanjaro", "Mount Everest", "Mount McKinley"],
// 	["Europe", "Chile", "Japan"],
// 	["Bass", "Heliotrope", "Teppanyaki"],
// 	["Tired", "Bad", "Malcontent"]
// ]

// //time conversion mechanic
// function timeConverter (t) {
//     var minutes = Math.floor(t/60);
//     var seconds = t - (minutes * 60);
//     if (seconds < 10){
//       seconds = "0" + seconds;
//     }
//     if (minutes === 0){
//       minutes = "00";
//     } else if (minutes < 10){
//       minutes = "0" + minutes;
//     }
//     return minutes + ":" + seconds;
//  }
// //timer for questionaire
// $(document).ready(function(){
// 	setTimeout(function(){
// 	},1000);
// 	time = 10
// 	$("#timer").html("05:00");
// 	function countDown(){
// 		time--;
// 		currentTime = timeConverter(time);
// 		$("#timer").html(currentTime);
// 		console.log(time);
// 		//Time's Up mechanic
// 		if (time == 0) {
// 			for (var e=0; e<trivia.length; e++){
// 				if ($('#question'+e+':checked').val() == trivia[e].answer){
// 					correctAnswers++;
// 				} else if ($('#question'+e+':checked').val() == undefined){
// 					notAnswered++;
// 				} else {
// 					incorrectAnswers++;
// 				}
// 			}
// 			$('#main-section').empty();
// 			$('#main-section').append("<h1>Time\'s Up!</h1>");
// 			$('#main-section').append("<p>You got "+correctAnswers+" correct answers!</p>");
// 			$('#main-section').append("<p>You got "+incorrectAnswers+" incorrect answers.</p>");
// 			$('#main-section').append("<p>You got "+notAnswered+" unanswered answers.</p>");
// 		}
// 	} 
// 	counter = setInterval(countDown,1000);
// })

// //stores player selections into array
// var correctAnswers = 0;
// var incorrectAnswers = 0;
// var notAnswered = 0;

// // checks player answers against correct answers
// 	for (var a=0; a<trivia.length; a++) {
// 		if ($("name="+"question"+a)){}
// 	}

window.onload = function () {
    var display = document.querySelector('#time'),
        timer = new CountDownTimer(60),
        timeObj = CountDownTimer.parse(60);

    format(timeObj.minutes, timeObj.seconds);
    
    timer.onTick(format);
    
    document.querySelector('#show').addEventListener('click', function () {
        timer.start();
    });
    
    function format(minutes, seconds) {
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ':' + seconds;
    }
};
$(document).ready(function(){
    $("#show").click(function(){
        $(".container").show();
    })
    });



$('.answers input[type="radio"]').click(function(){
    
    var type = $(this).data('type'),
        unanswered = [],
        correct = [],
        incorrect = [];
    
    alert(type === 1 ? 'Correct' : 'Wrong');

    $('.question').each(function(k, v){
        
        if(!$(v).find('input[type="radio"]:checked').length){
            //question not answered
            unanswered.push(v);
            return;
        }

        if(unanswered.length ===0);
        
        var correctAnswer = $(v).find('input[type="radio"]:checked').data('type') === 1;
            
        if(correctAnswer)
            correct.push(v);
        else
            incorrect.push(v);
        
        
    });
    $(this).closest('.answers').find('[type="radio"]').prop({ disabled: true });
    console.log(unanswered.length, correct, incorrect);
});

function CountDownTimer(duration, granularity) {
  this.duration = duration;
  this.granularity = granularity || 1000;
  this.tickFtns = [];
  this.running = false;
}

CountDownTimer.prototype.start = function() {
  if (this.running) {
    return;
  }
  this.running = true;
  var start = Date.now(),
      that = this,
      diff, obj;

  (function timer() {
    diff = that.duration - (((Date.now() - start) / 1000) | 0);
    
    if (diff > 0) {
      setTimeout(timer, that.granularity);
    } else {
      diff = 0;
      that.running = false;
    }

    obj = CountDownTimer.parse(diff);
    that.tickFtns.forEach(function(ftn) {
      ftn.call(this, obj.minutes, obj.seconds);
    }, that);
  }());
};

CountDownTimer.prototype.onTick = function(ftn) {
  if (typeof ftn === 'function') {
    this.tickFtns.push(ftn);
  }
  return this;
};

CountDownTimer.prototype.expired = function() {
  return !this.running;
};

CountDownTimer.parse = function(seconds) {
  return {
    'minutes': (seconds / 60) | 0,
    'seconds': (seconds % 60) | 0
  };
};




