
export function bindComponentEvent(component,callback){
	return function(e){
		callback.call(this,e,component);
	};
}