var bgpage = chrome.extension.getBackgroundPage();
var displayTimeTimeout;

$(document).ready(function() {
	$("#startButton").on("click", startTimer);
	$("#resetButton").on("click", resetTimer);
	displayTime();
});

 
function startTimer() {
	//taking user input
    var time = {
        hours: document.getElementById("hours").value * 1,
        minutes: document.getElementById("mins").value * 1,
        seconds: document.getElementById("secs").value * 1
    };

	bgpage.setAlarm(time.hours, time.minutes, time.seconds);	
	displayTime();
}

function resetTimer() {
	clearTimeout(displayTimeTimeout);
	bgpage.shutAlarmOff();
	changeTimerValues("00", "00", "00");
}

function displayTime() {
	var ms = bgpage.getTimeLeft();
	var secs = parseInt((ms / 1000) % 60);
	var mins = parseInt(((ms / (1000*60)) % 60));
	var hours = parseInt(((ms / (1000*60*60)) % 24));
	
	
	if (hours < 10) 
		hours = "0" + hours;
	if (mins < 10) 
		mins = "0" + mins;
	if (secs < 10)
		secs = "0" + secs

	changeTimerValues(hours, mins, secs);
	displayTimeTimeout = setTimeout(displayTime, 1000);
}

function changeTimerValues(hours, mins, secs) {
	document.getElementById("timeH").innerHTML = hours;
	document.getElementById("timeM").innerHTML = mins;
	document.getElementById("timeS").innerHTML = secs;
}
