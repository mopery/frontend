document.observe("dom:loaded", function() {
	var files = [
		'/public/crowdcode/loader.js',
		'/public/prototype-1.7.0.rc2.js', 
		'/public/codemirror-0.91/codemirror.js',
		'/public/jam-0.0.1.js',
		'/public/crowdcode/xd/client.js',
		'/public/crowdcode/application.js',
		'/public/crowdcode/application.css'
	];
				
	document.getElementsByTagName('body')[0].appendChild(table({id: 'tbl'}, 
		tbody(
			tr(
				td({ 'class': 'files' },
					ul(
						files.map(function(file) {
							return li(a({ href: '#', onclick: "loadFromUrl('" + file + "'); return false" }, file.split('/').last()));
						})
					)
				),
				td({ 'class': 'code' },
					div({ id: 'code-wrapper' })
				)
			)
		)
	));

  window.code_mirror = new CodeMirror(document.getElementById('code-wrapper'), {
    content: 'Pick a file on the left.',
    parserfile: ["tokenizejavascript.js", "parsejavascript.js"],
    stylesheet: ["http://crowdcode.s3.amazonaws.com/public/codemirror-0.91/chalkboard-js.css"],
    path: "http://crowdcode.s3.amazonaws.com/public/codemirror-0.91/",
    height: '100%',
    autoMatchParens: false,
    lineNumbers: true
  });
});

function loadFromUrl(url) {
  window.code_mirror.editor.importCode('Loading ' + url + ', please wait.');
  CrowdCode.get(url, function(data) {
    window.code_mirror.editor.importCode(data);
  });
}
