var CrowdCodeXDServer = {
	start: function() {
		window.addEventListener("message", this.processMessage, false);  
		window.parent.postMessage({ method: 'xd_ready' }, '*');
	},
	
	processMessage: function(message) {
		if (message.data.method == 'get_request') {
			var xhr = new XMLHttpRequest();

			xhr.open("GET", message.data.url, true);
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					window.parent.postMessage({ 
						method: 'get_response', 
						data: xhr.responseText, 
						callback: message.data.callback, 
						url: message.data.url
					}, '*');
				}
			}
			xhr.send(null)
		}
	}
};

CrowdCodeXDServer.start();