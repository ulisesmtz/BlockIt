var bgpage = chrome.extension.getBackgroundPage();

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
	
	bgpage.setAlarm(time.hours, time.minutes, time.seconds);	
}