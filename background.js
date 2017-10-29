chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		return {redirectUrl: "www.yahoo.com"}; 
	},
	{urls: ["<all_urls>"]},
	["blocking"]
);