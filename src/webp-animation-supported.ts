//该模块非amd模块，无法使用requirejs
define("webp-animation-supported",[],function(){
	var webp_supported:boolean=false;
	var canvas=document.createElement("canvas");
	if(!canvas.getContext){
		return false;
	}
	var webpTest=new Image();
	this.delay(function(resolve, reject){
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
	});
});

declare module "webp-animation-supported" {
	const _default: true;
	export = _default;
}