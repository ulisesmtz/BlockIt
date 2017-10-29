$(document).ready(function() {
	document.getElementById("startButton").addEventListener("click", startTimer);
	$("#toggleTimer").click(function(){
        $("#timer").toggle();
    });
});

 
function startTimer() {
	var hours = document.getElementById("hours");
	var mins = document.getElementById("mins");
	var secs = document.getElementById("secs");
	
	// will check for validity of numbers later
	/*if (hours.value > 24 || hours.value < 0) {
		hours.style.borderColor = "red";
		isValid = false;
	}
	
	if (mins.value > 60) {
		mins.style.borderColor = "red";
		isValid = false;
	}
	
	if (secs.value > 60) {
		secs.style.borderColor = "red";
		isValid = false;
	}*/
	
	
}