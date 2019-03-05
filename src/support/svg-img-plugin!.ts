define("support/svg-img-plugin",[],function(){
	return {
		load:function(path,require,resolve){
			var supported:boolean=false;
			if('SVGRect' in window){
				var imgTest=new Image();
				imgTest.onload=function(){
					resolve(true);
				};
				imgTest.onerror=function(){
					resolve(false);
				};
				imgTest.src="data:image/svg+xml;base64,JTNDc3ZnJTIweG1sbnMlM0QlMjJodHRwJTNBLy93d3cudzMub3JnLzIwMDAvc3ZnJTIyJTIwd2lkdGglM0QlMjI5JTIyJTIwaGVpZ2h0JTNEJTIyOSUyMiUzRSUzQ2NpcmNsZSUyMHIlM0QlMjI0JTIyLyUzRSUzQy9zdmclM0U=";
			}
			resolve(false);
		}
	};
});


declare module "support/svg-img-plugin!" {
	const _default: true;
	export default _default;
}