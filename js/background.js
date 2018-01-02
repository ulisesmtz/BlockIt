var interval;
var timeout;
var alarmDate;
var alarmSound = new Audio("sounds/cuckoo.ogg");
var nid = null; // notification id

function setAlarm(hours, mins, secs) {
	// set interval variable in ms
	interval = (hours * 3600000) + (mins * 60000) + (secs * 1000);  
	clearTimeout(timeout);
	
	alarmDate = new Date();
	alarmDate.setHours(alarmDate.getHours() + hours);
	alarmDate.setMinutes(alarmDate.getMinutes() + mins);
	alarmDate.setSeconds(alarmDate.getSeconds() + secs);
	
	timeout = setTimeout(ring, alarmDate.getTime() - new Date().getTime());
}

function ring() {
	var options = {
		iconUrl: "img/icon_128.png",
		type: "basic",
		title: "BlockIt",
		message: "Congrats! You made it!",
		contextMessage: "Would you like me to unblock all sites?",
		buttons: [{
            title: "Yes please!",
            iconUrl: "img/icon_16.png"
        }, {
            title: "Keep them blocked for now.",
            iconUrl: "img/icon_128.png"
        }]
	}
	chrome.notifications.create("", options, function(id){nid = id;});
	alarmSound.play();
	shutAlarmOff();
}


function getTimeLeft() {
	return alarmDate.getTime() - new Date().getTime();
}

function shutAlarmOff() {
	clearTimeout(timeout);
    interval = 0;
    alarmDate = null;
    //pauseDate = null;
}

var callBack = function(details) {
	if (chrome.runtime.lastError) {
		alert(chrome.runtime.lastError.message);
		return;
	} else if (JSON.parse(localStorage.getItem("blockedURL")).length > 0){
		return {redirectUrl: (chrome.extension.getURL("blocked.html"))}
	}
} 

chrome.webRequest.onBeforeRequest.addListener(
	callBack,
	{urls: JSON.parse(localStorage.getItem("blockedURL"))},
	["blocking"]
);
  
chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
    if (notifId === nid) {
        if (btnIdx === 0) {
            alert("Yup");
        } else if (btnIdx === 1) {
			alert("Nope");
        }
    }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.type == "update") {
		var blockedUrl = JSON.parse(localStorage.getItem("blockedURL"));
		if (blockedUrl.length > 0 && blockedUrl != null) {
			chrome.webRequest.onBeforeRequest.removeListener(callBack);
			chrome.webRequest.onBeforeRequest.addListener(
				callBack,
				{urls: blockedUrl},
				["blocking"]
			);
		}
	}
	sendResponse({type: "bar"});
});