
//该模块非amd模块，无法使用requirejs
define("apng-supported",[],function(){
	var apng_supported:boolean=false;
	var canvas=document.createElement("canvas");
	if(canvas.getContext){
		var apngTest=new Image();
		var ctx=canvas.getContext("2d");
		this.delay(function(resolve, reject){
			apngTest.onload=function(){
				ctx.drawImage(this as HTMLImageElement, 0, 0);
				resolve(ctx.getImageData(0, 0, 1, 1).data[3]===0);
			};
			apngTest.onerror=function(){
				resolve(false);
			};
			apngTest.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACGFjVEwAAAABAAAAAcMq2TYAAAANSURBVAiZY2BgYPgPAAEEAQB9ssjfAAAAGmZjVEwAAAAAAAAAAQAAAAEAAAAAAAAAAAD6A+gBAbNU+2sAAAARZmRBVAAAAAEImWNgYGBgAAAABQAB6MzFdgAAAABJRU5ErkJggg==";
		});
	}else{
		return false;
	}
});

declare module "apng-supported" {
	const _default: true;
	export = _default;
}