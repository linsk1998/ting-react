(function() {
	var html5Styles,unknownElements;
	try {
		var a = document.createElement('a');
		a.innerHTML = '<xyz></xyz>';
		//if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles
		html5Styles = ('hidden' in a);

		unknownElements=a.childNodes.length == 1 || (function() {
			// assign a false positive if unable to shiv
			(document.createElement)('a');
			var frag = document.createDocumentFragment();
			return (
				!('cloneNode' in frag ) ||
				!('createDocumentFragment' in frag) ||
				!('createElement' in frag)
			);
		}());
		'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video'
		.split(" ").forEach(function(tag){
			document.createElement(tag);
		});
	} catch(e) {
		// assign a false positive if detection fails => unable to shiv
		html5Styles=true;
		unknownElements=true;
	}
	Sky.support.html5Styles=html5Styles;
	Sky.support.unknownElements=unknownElements;
}());