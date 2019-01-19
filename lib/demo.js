
var __extends=Sky.inherits;
var __assign=Object.assign;
var __rest=Sky.omit;

require.config({
	bundles:{
		'lib/anu':['react','react-dom']
	}
});
require(['react'],function(React){
	Sky.attachEvent=React.eventSystem.addEvent;
});