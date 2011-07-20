(function() { 
	// PROD
	// var urls = [
	// 	'http://crowdcode.s3.amazonaws.com/public/prototype-1.7.0.rc2.js', 
	// 	'http://crowdcode.s3.amazonaws.com/public/jam-0.0.1.js',
	// 	'http://crowdcode.s3.amazonaws.com/public/codemirror-0.91/codemirror.js',
	// 	'http://crowdcode.s3.amazonaws.com/public/crowdcode/xd/client.js',
	// 	'http://crowdcode.s3.amazonaws.com/public/crowdcode/application.js',
	// 	'http://crowdcode.s3.amazonaws.com/public/crowdcode/application.css'
	// ];

	var urls = [
		'/s3/hashtag/core.js',
		'/s3/example/application.js'
		// '/s3/hashtag/router.js',
		//     '/s3/hashtag/observer.js',
		//     '/s3/hashtag/router.js',
		//     '/s3/hashtag/view.js',
	];

	for (var i=0; i < urls.length; i++) {
		switch (urls[i].split('.').pop()) {
			case 'css':
		  	document.write('<li' + 'nk href="' + urls[i] + '" media="all" rel="stylesheet" type="text/css" />');
				break;
			case 'js':
		  	document.write('<scr' + 'ipt src="' + urls[i] + '" type="text/javascript"></sc' + 'ript/>');
				break;
		}
	}
})();


