/*chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		return {redirectUrl: "www.yahoo.com"}; 
	},
	{urls: ["<all_urls>"]},
	["blocking"]
);*/
var interval;
var timeout;
var alarmDate;
var alarmSound = new Audio("cuckoo.ogg");


function setAlarm(hours, mins, secs) {
	// set intveral variable in ms
	interval = (hours * 3600000) + (mins * 60000) + (secs * 1000);  
	clearTimeout(timeout);
	
	alarmDate = new Date();
	alarmDate.setHours(alarmDate.getHours() + hours);
	alarmDate.setMinutes(alarmDate.getMinutes() + mins);
	alarmDate.setSeconds(alarmDate.getSeconds() + secs);
	
	timeout = setTimeout(ring, alarmDate.getTime() - new Date().getTime());
	
	//chrome.browserAction.setBadgeBackgroundColor({color:greenColor});
    setInterval(function() {
        chrome.browserAction.setBadgeText({text: getTimeLeftString()});
    }, 1000);
}

function ring() {
	var options = {
		type: "basic",
		title: "Primary Title",
		message: "Primary message to display"/*,
		iconUrl: "url_to_small_icon"*/
	}
	chrome.notifications.create("", options, null);
	alarmSound.play();
	shutAlarmOff();
}

function getTimeLeftString() {
	
}

function shutAlarmOff() {
	clearTimeout(timeout);
    interval = 0;
    alarmDate = null;
    //pauseDate = null;
    chrome.browserAction.setBadgeText({text: ""});
}