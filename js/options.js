
$(document).ready(function() {
	
	$('#selectAll').click(function () {
		$(this).closest("table").find("td input:checkbox").prop("checked", this.checked);
	});
	
	$(".deleteSelected").click(function() {
		$('input.checkRow:checkbox:checked').each(function(){
			$(this).closest('tr').remove();
			$("#selectAll").prop("checked", false);
		});
	});
	
	$(".save").click(function() {
		var urls = [];
		$(".url").each(function() {
			
			var regextest = /(?:(?:\*|http|https|file|ftp|chrome-extension):\/\/(?:\*|\*\.[^\/\*]+|[^\/\*]+)?(?:\/.*))|<all_urls>/.test($(this).text());
			if (regextest){
				$(this).closest("tr").removeClass("redBorder");
			} else {
				$(this).closest("tr").addClass("redBorder");
				return false;	// fix this
			}
			
			
			if ($(this).text().trim().length)
				urls.push($(this).text().trim()); 
			//else
				//$(this).closest('tr').remove();

		});
		localStorage.setItem("blockedURL", JSON.stringify(urls));
		console.log(localStorage.blockedURL);
		chrome.runtime.sendMessage({type: "update"}, function(response) {
			console.log("Message Received");
		});
	});
	
	$("#table").on("click", ".deleteRow", function() {
		$(this).closest('tr').remove();
	});
	
	$(document).on("click", ".addRow", function() {
		addRow("New");	
	});
	
	$(document).keypress(
		function(event){
			if (event.which == '13') {
				event.preventDefault();
			}
	});
	
	loadData();

});

function loadData() {
	var urls = JSON.parse(localStorage.getItem("blockedURL"));
	for (var i = 0; i < urls.length; i++) {
		addRow(urls[i]);
	}
}

function addRow(url) {
	$('#table tr:last').after(
		'<tr>' +
			'<td>' +
				'<input type="checkbox" class="checkRow"/>' +
			'</td>' +
			'<td class="url" contenteditable="true" spellcheck="false">' +
				url +
			'</td>' +
			'<td>' +
				'<button value="Delete" class="deleteRow">Delete</button>' +
			'</td>' +
			'<td>' +
				'<input type="checkbox"/>' +
		'</tr>');
}