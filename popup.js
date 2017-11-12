$(document).ready(function() {
	$("#startButton").on("click", startTimer);
	$("#toggleTimer").click(function(){
        $("#timer").toggle();
    });
});

 
function startTimer() {
	
	//taking user input
    var time = {
        hours: document.getElementById("hours").value * 1,
        minutes: document.getElementById("mins").value * 1,
        seconds: document.getElementById("secs").value * 1
    };


    // Save the interval's handle to `timer`
    var timer = setInterval(countdown, 1000);

    function countdown() {
        var container = document.getElementById("timeLeft");

        if (time.seconds > 0) {
            time.seconds--;
        }
        else {
            if (time.minutes > 0) {
                time.minutes--;
                time.seconds = 59;
            }
            else {
                time.minutes = 59;
                time.seconds = 59;
                time.hours--;
            }
        }

        if (time.hours >= 0) {
            container.innerHTML = 'Please wait <b>' + time.hours + '</b> hours, <b>' + time.minutes + '</b> minutes, <b>' + time.seconds + '</b> seconds';
        }
        else {
            container.innerHTML = 'Time over';
            clearInterval(timer);
        }
    }
}