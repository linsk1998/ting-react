define("support/webp-animation-supported-plugin",[],function(){
	return {
		load:function(path,require,resolve){
			var webp_supported:boolean=false;
			var canvas=document.createElement("canvas");
			if(!canvas.getContext){
				resolve(false);
				return ;
			}
			var webpTest=new Image();
			webpTest.onload=function(){
				if(webpTest.width>0 && webpTest.height>0){
					var ctx=canvas.getContext("2d");
					ctx.drawImage(webpTest, 0, 0);
					resolve(ctx.getImageData(0, 0, 1, 1).data[3]!==0);
				}else{
					resolve(false);
				}
			};
			webpTest.onerror=function(){
				resolve(false);
			};
			webpTest.src="data:image/webp;base64,UklGRpQAAABXRUJQVlA4WAoAAAACAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GMAAAAAAAAAAAAAAAAAAAAGQAAAJWUDggGAAAADABAJ0BKgEAAQACADQlpAADcAD++/1QAEFOTUYwAAAAAAAAAAAAAAAAAAAAZAAAAlZQOCAYAAAAMAEAnQEqAQABAAIANCWkAANwAP77lAAA";

		}
	};
});

declare module "support/webp-animation-plugin!" {
	const _default: true;
	export default _default;
}