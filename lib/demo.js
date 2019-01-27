
var __extends=Sky.inherits;
var __assign=Object.assign;
var __rest=Sky.omit;

require.config({
	paths: {
		'anu':"lib/anu"
	}
});
define('react',['anu'],function(anu){
	return anu;
});
define('react-dom',['anu'],function(anu){
	return anu;
});