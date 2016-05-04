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


    $("#hide").click(function(){
        $(".container").hide();
        $(".timeline").hide();
    })


