var CrowdCode = {
	get: function(url, callback) {
		if (!CrowdCode.iframe) {
			CrowdCode.iframe = document.createElement('iframe');
			CrowdCode.iframe.src = 'http://crowdcode.s3.amazonaws.com/public/crowdcode/xd/xd.html';
			CrowdCode.iframe.style.display = 'none';
			document.getElementsByTagName('body')[0].appendChild(CrowdCode.iframe);
		}
		
		// if the comm channel isn't ready yet, queue this request
		if (!CrowdCode.xd_ready) {
			CrowdCode.xd_queue.push([url, callback]);
		} else {
			CrowdCode.sendMessage(url, callback);
		}
	},

	// inner workings
	xd_ready: false,
	xd_queue: [],
	xd_callbacks: {},

	sendMessage: function(url, callback) {
		var cb_token = 'cb_' + (new Date()).getTime();
		this.xd_callbacks[cb_token] = callback;
		CrowdCode.iframe.contentWindow.postMessage({ method: 'get_request', url: url, callback: cb_token }, '*');
	}
};

window.addEventListener("message", function(message) {
	if (message.data.method == 'xd_ready') {
		CrowdCode.xd_ready = true;
		while (CrowdCode.xd_queue[0]) {
			CrowdCode.sendMessage(CrowdCode.xd_queue[0][0], CrowdCode.xd_queue[0][1]);
			CrowdCode.xd_queue.shift();
		}
	}	else if (message.data.method == 'get_response') {
		CrowdCode.xd_callbacks[message.data.callback](message.data.data);
		delete CrowdCode.xd_callbacks[message.data.callback];
	}
}, false);