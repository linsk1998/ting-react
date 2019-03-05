define("support/apng-plugin",[],function(){
	return {
		load:function(path,require,resolve){
			var apng_supported:boolean=false;
			var canvas=document.createElement("canvas");
			if(!canvas.getContext){
				resolve(false);
				return ;
			}
			var apngTest=new Image();
			var ctx=canvas.getContext("2d");
			apngTest.onload=function(){
				ctx.drawImage(this as HTMLImageElement, 0, 0);
				resolve(ctx.getImageData(0, 0, 1, 1).data[3]===0);
			};
			apngTest.onerror=function(){
				resolve(false);
			};
			apngTest.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACGFjVEwAAAABAAAAAcMq2TYAAAANSURBVAiZY2BgYPgPAAEEAQB9ssjfAAAAGmZjVEwAAAAAAAAAAQAAAAEAAAAAAAAAAAD6A+gBAbNU+2sAAAARZmRBVAAAAAEImWNgYGBgAAAABQAB6MzFdgAAAABJRU5ErkJggg==";
		}
	};
});


declare module "support/apng-plugin!" {
	const _default: true;
	export default _default;
}