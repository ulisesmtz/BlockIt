$(document).ready(function() {
	document.getElementById("addItem").addEventListener("click", addItem);
	document.getElementById("removeItem").addEventListener("click", removeItem);
	// pressing enter wil also add site to list
	$("#candidate").keyup(function(event) {
		if (event.keyCode === 13) {
			addItem();
		}	
	});

});

function addItem(){
	var candidate = document.getElementById("candidate");
	// if text is empty, return
	if (!candidate.value.trim()) {
		return;
	}
	
	// if text does not start with www. add it automatically
	if (!candidate.value.startsWith("www.")) {
		candidate.value = "www." + candidate.value;	
	}
	var ul = document.getElementById("dynamic-list");
	var li = document.createElement("li");
	li.setAttribute('id',candidate.value);
	li.appendChild(document.createTextNode(candidate.value));
	ul.appendChild(li);
	candidate.value = "";
}

function removeItem(){
	var ul = document.getElementById("dynamic-list");
	var candidate = document.getElementById("candidate");
	var item = document.getElementById(candidate.value);
	try {
		ul.removeChild(item);
	} catch (error) {
		return false;
	}
}