/*包含常用polyfill、常用工具函数（如ajax等）、AMD模块加载*/
/*此版本不包含DOM查询、DOM批量操作和DOM事件封装*/
var Sky=function(){
	return Sky.overload(arguments,this);
};
this.$=this.$ || Sky;
(function(){
	var rules=[];
	function ckeck(ckeckFunc,index){
		return ckeckFunc(this[index]);
	}
	function compare(x, y){//比较函数
		return x.checks.length-y.checks.length;
	}
	Sky.overload=function(checks,func,target){
		if(target){
			rules.push({
				'checks':checks,
				'func':func,
				'target':target
			});
			rules.sort(compare);
		}else{
			var args=checks;
			var thisVal=func;
			var i=rules.length;
			while(i--){
				var rule=rules[i];
				if(args.callee===rule.func){
					if(rule.checks.length>=args.length){
						if(rule.checks.every(ckeck,args)){
							return rule.target.apply(thisVal,args);
						}
					}
				}
			}
			return Sky;
		}
	};
})();
Sky.isArray=function(a){
	return Array.isArray(a);
};
Sky.isDate=function(obj){
	return Object.prototype.toString.call(obj)==='[object Date]';
};
Sky.isRegExp=function(obj){
	return Object.prototype.toString.call(obj)==='[object RegExp]';
};
Sky.isString=function(obj){
	return Object.prototype.toString.call(obj)==='[object String]';
};
Sky.isFunction=function(obj){
	return Object.prototype.toString.call(obj)==='[object Function]';
};
Sky.isNumber=function(obj){
	return Object.prototype.toString.call(obj)==='[object Number]';
};
Sky.is=function(obj,Clazz){
	obj=Object(obj);
	return obj instanceof Clazz;
};
Sky.isObject=function(obj){
	var type=typeof obj;
	if(type!=="object"){
		return false;
	}
	type=Object.prototype.toString.call(obj);
	switch(type){
		case '[object String]':
		case '[object Number]':
		case '[object Function]':
		case '[object Boolean]':
			return false;
	}
	return true;
};
Sky.isDefined=function(obj){
	return obj!==void 0;
};
Sky.isWindow=function(obj){
	return obj && typeof obj === "object" && "setInterval" in obj;
};
Sky.isPlainObject=function(obj){
	if(obj===null){
		return true;
	}
	if(typeof obj!=="object" || obj.nodeType || Sky.isWindow(obj)){
		return false;
	}
	return Object.getPrototypeOf(obj)===Object.prototype;
};
Sky.isArrayLike=function(obj){
	var length=obj.length;
	if(typeof length !="number" || length<0 || isNaN(length) || Math.ceil(length)!=length){
		return false;
	}
	return true;
};
Sky.isNumeric=function(obj){
	var n=parseFloat(obj);
	return !isNaN(n);
};
if(this.HTMLElement){
	Sky.isElement=function(obj){
		return obj instanceof HTMLElement;
	};
}else{
	Sky.isElement=function(obj){
		return obj?obj.nodeType===1:false;
	};
}
Sky.isEmpty=function(obj){
	if(obj==null) return true;
	if(Sky.isNumber(obj.length)){
		return !obj.length;
	}
	if(Sky.isNumber(obj.size)){
		return !obj.size;
	}
	if(Sky.isFunction(obj.size)){
		return !obj.size();
	}
	if(Sky.isFunction(obj.toArray)){
		return !obj.toArray().length;
	}
	return false;
};
Sky.isArrayLike=function(obj){
	var length=obj.length;
	if(typeof length !="number" || length<0 || isNaN(length) || Math.ceil(length)!=length){
		return false;
	}
	return true;
};
Sky.isNumeric=function(obj){
	var n=parseFloat(obj);
	return !isNaN(n);
};
Sky.isDocument=function(obj){
	return obj===document;
};

Sky.support={};
(function(){
	var userAgent = navigator.userAgent.toLowerCase();
	Sky.browser={
		version:(userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [])[1],
		webkit:/webkit/.test( userAgent ),
		opera:/opera/.test( userAgent ),
		msie:/msie/.test( userAgent ) && !/opera/.test( userAgent ),
		firefox:/firefox/.test( userAgent ),
		safari:/safari/.test( userAgent ),
		chrome:/chrome/.test( userAgent ),
		android:/android/.test( userAgent ),
		ios:/(iphone|ipad|ipod)/.test( userAgent ),
		mobile:/mobile/.test( userAgent ),
		quirks:(document.compatMode == 'BackCompat')
	};
	var ie="ActiveXObject" in window;
	Sky.browser.ie5=ie&&!document.compatMode;//ie5及以下
	Sky.browser.ie6=ie&&!!document.compatMode&&!window.XMLHttpRequest;
	Sky.browser.ie7=ie&&!!window.XMLHttpRequest&&!document.querySelector;
	Sky.browser.ie8=ie&&!!document.querySelector&&!document.addEventListener;
	Sky.browser.ie9=ie&&!!document.addEventListener&&!window.atob;
	Sky.browser.ie10=ie&&!!window.atob&&!!window.attachEvent;
	Sky.browser.ie11=ie&&!!window.atob&&!window.attachEvent;
	if(Sky.browser.ie11){
		Sky.browser.ie=11;
	}else if(ie){
		Sky.browser.ie=parseInt(Sky.browser.version);
	}
})();
Sky.noop=function(){};

Sky.support.VBScript=false;
if(window.execScript){
	try{
		window.execScript([
			'Function alert(msg)',
			'msgbox msg',
			'End Function' //去除弹窗的图标
		].join('\n'), 'VBScript');
		if(typeof alert=="unknown"){
			Sky.support.VBScript=true;
		}
	}catch(e){}
}

if(!Array.from){
	Array.from=function(arrayLike, mapFn, thisArg){
		var arr;
		try{
			arr=Array.prototype.slice.call(arrayLike);
		}catch(e){
			arr=new Array();
			for(var i=0;i<arrayLike.length;i++){
				arr.push(arrayLike[i]);
			}
		}
		if(mapFn){
			arr=arr.map( mapFn, thisArg);
		}
		return arr;
	};
}
if(!Array.isArray){
	Array.isArray=function(obj){
		return Object.prototype.toString.call(obj)==='[object Array]';
	};
}
//判断一个元素在数组中的位置
if(!Array.prototype.indexOf){
	Array.prototype.indexOf=function(e,fromIndex){
		fromIndex=isNaN(fromIndex)?0:fromIndex;
		for(var i=fromIndex,j;i<this.length; i++){
			j=this[i];
			if(j===e){return i;}
		}
		return -1;
	};
}
if(!Array.prototype.includes){
	Array.prototype.includes=function(search,start){
		return this.indexOf(search, start)!==-1;
	};
}
if(!Array.prototype.lastIndexOf){
	Array.prototype.lastIndexOf = function(e, fromIndex) {
		fromIndex=isNaN(fromIndex)?this.length-1:fromIndex;
		for (var i=fromIndex,j; i<this.length; i--) {
			j=this[i];
			if(j===e){return i;}
		}
		return -1;
	};
}
if(!Array.prototype.findIndex){
	Array.prototype.findIndex = function(callback, thisArg) {
		for(var i=0,j; i<this.length; i++){
			j=this[i];
			var r=callback.call(thisArg,j,i,this);
			if(r){
				return i;
			}
		}
		return -1;
	};
}
if(!Array.prototype.find){
	Array.prototype.find = function(callback, thisArg) {
		var i=this.findIndex(callback, thisArg);
		if(i>=0){
			return this[i];
		}
	};
}
//遍历数组
if(!Array.prototype.forEach){
	Array.prototype.forEach =function(callback, thisArg){
		var len=this.length;
		for(var i=0,j;i<len && i<this.length; i++){
			j=this[i];
			callback.call(thisArg,j,i,this);
		}
	};
}
if(!Array.prototype.map){
	Array.prototype.map = function(fn, context) {
		var arr = [];
		for (var k = 0, length = this.length; k < length; k++) {
			arr.push(fn.call(context, this[k], k, this));
		}
		return arr;
	};
}
if(!Array.prototype.filter){
	Array.prototype.filter = function(fn, context) {
		var arr = [];
		for (var k = 0, length = this.length; k < length; k++) {
			fn.call(context, this[k], k, this) && arr.push(this[k]);
		}
		return arr;
	};
}
if(!Array.prototype.some){
	Array.prototype.some = function(fn, context) {
		var passed = false;
		for (var k = 0, length = this.length; k < length; k++) {
			if (passed === true) break;
			passed = !!fn.call(context, this[k], k, this);
		}
		return passed;
	};
}
if(!Array.prototype.every){
	Array.prototype.every = function(fn, context) {
		var passed = true;
		for (var k = 0, length = this.length; k < length; k++) {
			if (passed === false) break;
			passed = !!fn.call(context, this[k], k, this);
		}
		return passed;
	};
}
if(!Array.prototype.reduce){
	Array.prototype.reduce=function(callback,initialValue){
		var value=initialValue;
		for (var i=0;i<this.length;i++) {
			if (i in this) {
				value=callback(value,this[i],i,this);
			}
		}
		return value;
	};
}
(function(){//TODO
	function Iterator(arr){
		this.array=arr;
		this.i=0;
	}
	Iterator.prototype.next=function(){
		var result={};
		result.done=this.array.length<=this.i;
		result.value=this.array[this.i];
		if(!result.done){
			this.i++;
		}
		return result;
	};
	Array.prototype.entries=function(){
		return new Iterator(this);
	};
})();

//删除左右两端的空格
if(!String.prototype.trim){
	String.prototype.trim=function() {
		return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,'');
	};
}
if(!String.prototype.trimStart){
	String.prototype.trimStart=function() {
		return this.replace(/^[\s\uFEFF\xA0]+/g,'');
	};
}
if(!String.prototype.trimEnd){
	String.prototype.trimEnd=function() {
		return this.replace(/[\s\uFEFF\xA0]+$/g,'');
	};
}
if(!String.prototype.startsWith){
	String.prototype.startsWith=function(prefix,position){
		if(prefix===null){ return false;}
		position=position?position:0;
		return this.slice(position, prefix.length) === prefix;
	};
}
if(!String.prototype.endsWith){
	String.prototype.endsWith=function(prefix,position){
		var length=prefix.length;
		position=position<length?position:this.length;
		return this.slice(position-length, position) === prefix;
	};
}
if(!String.prototype.includes) {
	String.prototype.includes = function(search, start) {
		if(typeof start!=='number'){
			start=0;
		}
		if(start+search.length>this.length){
			return false;
		}else{
			return this.indexOf(search, start)!==-1;
		}
	};
}
if(!String.prototype.repeat){
	String.prototype.repeat=function(count){
		if(count<0){
			throw 'RangeError repeat count must be non-negative';
		}
		if(count==Number.POSITIVE_INFINITY){
			throw 'RangeError repeat count must be less than infinity';
		}
		return new Array(count+1).join(this);
	};
}
if(!String.prototype.padStart){
	String.prototype.padStart=function(targetLength,padString){
		var x=targetLength-this.length;
		if(x<0) return this+"";
		if(!padString) padString=" ";
		return padString.repeat(Math.ceil(x/padString.length)).substr(0,x)+this;
	};
}
if(!String.prototype.padEnd){
	String.prototype.padEnd=function(targetLength,padString){
		var x=targetLength-this.length;
		if(x<0) return this+"";
		if(!padString) padString=" ";
		return this+padString.repeat(Math.ceil(x/padString.length)).substr(0,x);
	};
}
Math.log2 = Math.log2 || function(n){ return Math.log(n) / Math.log(2); };
Number.isNaN=Number.isNaN || function(value){
	return typeof value === "number" && isNaN(value);
};
Number.isInteger=Number.isInteger || function(value){
	return typeof value === "number" &&	isFinite(value) &&	Math.floor(value) === value;
};

(function(){
	/** 时间对象的格式化; **/
	/* eg:format="%Y-%m-%d %H:%M:%S"; */
	function pad2(number) {
		if(number<10){
			return '0'+number;
		}
		return number;
	}
	if (!Date.prototype.toLocaleFormat) {//部分浏览器支持
		Date.prototype.toLocaleFormat = function(format) {
			var Y=this.getFullYear();
			var M=pad2(this.getMonth()+1);
			var D=pad2(this.getDate());
			var h=pad2(this.getHours());
			var m=pad2(this.getMinutes());
			var s=pad2(this.getSeconds());
			var o={
				"%x":Y+"/"+M+"/"+D,
				"%X":h+":"+m+":"+s,
				"%Y":Y,
				"%y":pad2(this.getYear()%100),
				"%m":M,
				"%e":this.getDate(),
				"%d":D,
				"%H":h,
				"%i":pad2(this.getHours()%12),
				"%M":m,
				"%S":s,
				"%p":this.getHours()%12>1?"PM":"AM",
				"%%":"%"
			};
			o["%T"]=o["%X"];
			return format.replace(/%[xXTYymedHiMSp%]/g,function(word){
				for(var k in o){
					if(k==word){
						return o[k];
					}
				}
				return word;
			});
		};
	}
	if (!Date.prototype.toISOString){//部分浏览器支持
		Date.prototype.toISOString = function() {
			return this.getUTCFullYear()+
				'-'+pad2(this.getUTCMonth()+1)+
				'-'+pad2( this.getUTCDate() ) +
				'T'+pad2( this.getUTCHours() ) +
				':'+pad2( this.getUTCMinutes() ) +
				':'+pad2( this.getUTCSeconds() ) +
				'.'+new String(this.getUTCMilliseconds()).padStart(3,'0')+'Z';
		};
	}
})();
if(!Date.prototype.toJSON){
	Date.prototype.toJSON=Date.prototype.toISOString;
}
if(new Date().toLocaleString().match(/[a-z]/i)){//谷歌浏览器，360用谷歌内核，会显示成英文(未考虑语言环境)
	Date.prototype.toLocaleString = function() {
		return this.toLocaleFormat("%Y-%m-%d %H:%M:%S");
	};
	Date.prototype.toLocaleDateString = function() {
		return this.toLocaleFormat("%Y-%m-%d");
	};
	Date.prototype.toLocaleTimeString = function() {
		return this.toLocaleFormat("%H:%M:%S");
	};
}
if(!Date.now){
	Date.now=function(){
		return new Date().getTime();
	};
}

Sky.toString=null;
if(!Sky.propertyIsEnumerable('toString')){
	Sky.dontEnums=["toString","toLocaleString","valueOf","hasOwnProperty", "isPrototypeOf","propertyIsEnumerable"];
	Sky.forIn=function(obj,fn,thisArg){
		thisArg=thisArg || window;
		for(var key in obj) {
			if(!(obj instanceof Object)){
				if(key.startsWith("__") || key=="constructor"){
					continue ;
				}
			}
			if(fn.call(thisArg,obj[key],key)===false){
				return false;
			}
		}
		var nonEnumIdx=Sky.dontEnums.length;
		var proto=Object.getPrototypeOf(obj);
		//遍历nonEnumerableProps数组
		while(nonEnumIdx--){
			var prop=Sky.dontEnums[nonEnumIdx];
			if(prop in obj && obj[prop]!==proto[prop]){
				if(fn.call(thisArg,obj[prop],prop)===false){
					return false;
				}
			}
		}
		return true;
	};
	Sky.forOwn=function(obj,fn,thisArg){
		thisArg=thisArg || window;
		var type=typeof obj;
		if(type=="unknow"){
			return true;
		}
		if(type!="object"){
			obj=Object(obj);
		}
		for(var key in obj) {
			if(!(obj instanceof Object)){
				if(key.startsWith("__") || key=="constructor"){
					continue ;
				}
			}
			if(Sky.hasOwn(obj,key)){
				if(fn.call(thisArg,obj[key],key)===false){
					return false;
				}
			}
		}
		for(var i=0;i<Sky.dontEnums.length;i++){
			var prop=Sky.dontEnums[i];
			if(Sky.hasOwn(obj,prop)){
				if(fn.call(thisArg,obj[prop],prop)===false){
					return false;
				}
			}
		}
		return true;
	};
	Sky.hasOwn=function(obj,key){
		if(!(key in obj)){
			return false;
		}
		var value=obj[key];
		if(typeof obj=="object" && !(obj instanceof Object)){
			if(Sky.isFunction(value)){
				return true;
			}
			return false;
		}
		return Object.prototype.hasOwnProperty.call(obj,key);
	};
}else{
	Sky.forIn=function(obj,fn,thisArg){
		thisArg=thisArg || window;
		for(var key in obj) {
			if(fn.call(thisArg,obj[key],key)===false){
				return false;
			}
		}
		return true;
	};
	Sky.forOwn=function(obj,fn,thisArg){
		thisArg=thisArg || window;
		for(var key in obj) {
			if(Object.prototype.hasOwnProperty.call(obj,key)){
				if(fn.call(thisArg,obj[key],key)===false){
					return false;
				}
			}
		}
		return true;
	};
	Sky.hasOwn=function(obj,key){
		return Object.prototype.hasOwnProperty.call(obj,key);
	};
}
Sky.pick=function(obj,keys){
	var rest={};
	if(obj){
		Sky.forOwn(obj, function(value,key){
			if(keys.indexOf(key)>=0){
				rest[key]=value;
			}
		});
	}
	return rest;
};
Sky.omit=function(obj,keys){
	var rest={};
	if(obj){
		Sky.forOwn(obj, function(value,key){
			if(keys.indexOf(key)<0){
				rest[key]=value;
			}
		});
	}
	return rest;
};

if(!Object.values){
	Object.values=function(obj){
		var result=[];
		Sky.forOwn(obj,function(value,key){
			result.push(obj[key]);
		});
		return result;
	};
}
if(!Object.keys){
	Object.keys=function(obj){
		var result=[];
		Sky.forOwn(obj,function(value,key){
			result.push(key);
		});
		return result;
	};
}
if(!Object.assign){
	Object.assign=function(target, varArgs){
		if(target==null){
			throw 'Cannot convert undefined or null to object';
		}
		var to=Object(target);
		for(var i=1;i<arguments.length;i++){
			var obj=arguments[i];
			if(obj!=null){
				Sky.forOwn(obj,function(v,k){
					to[k]=v;
				});
			}
		}
		return target;
	};
}

Sky.inherits=function(clazz,superClazz){
	Object.assign(clazz,superClazz);
	clazz.prototype=Object.create(superClazz.prototype);
	clazz.superclass=superClazz;//为了其他程序的代码方便获取父类
	clazz.prototype.constructor=clazz;
}

if(!Object.create){
	Object.create=function(proto){
		function F(){}
		F.prototype = proto;
		return new F();
	};
}
if (!Object.is){
	Object.is=function(x, y){
		if(x===y){// Steps 1-5, 7-10
			// Steps 6.b-6.e: +0 != -0
			return x!==0 || 1/x===1/y;
		}else{
			// Step 6.a: NaN == NaN
			return x!==x && y!==y;
		}
	};
}
if(!Object.getPrototypeOf){
	if('__proto__' in Sky){
		Object.getPrototypeOf=function(object){
			return object.__proto__;
		};
	}else{
		Object.getPrototypeOf=function(object){
			var constructor=object.constructor;
			if(Sky.isFunction(constructor)){
				if(object!=constructor.prototype){
					return constructor.prototype;
				}else if('superclass' in constructor){
					return constructor.superclass.prototype;
				}
			}
			console.warn("cannot find Prototype");
			return Object.prototype;
		};
	}
}
if(Sky.support.__defineSetter__){
	if(!Object.defineProperty) {
		Object.defineProperty=function(obj, prop, descriptor){
			if(descriptor.get) obj.__defineGetter__(prop,descriptor.get);
			if(descriptor.set) obj.__defineSetter__(prop,descriptor.set);
			if(descriptor.value) obj[prop]=descriptor.value;
		};
	}
	if(!Object.defineProperties){
		Object.defineProperties=function(obj,properties){
			for(var key in properties){
				var descriptor=properties[key];
				if(descriptor.get) obj.__defineGetter__(key,descriptor.get);
				if(descriptor.set) obj.__defineSetter__(key,descriptor.set);
				if(descriptor.value) obj[key]=descriptor.value;
			}
		};
	}
}

if(!Function.prototype.bind){
	Function.prototype.bind=function(context){
		var self=this,args=Array.prototype.slice.call(arguments,1);
		return function(){
			return self.apply(context,args.concat(Array.from(arguments)));
		};
	};
}

if(!this.Map){
	Map=function(){
		this.items=[];
		this.size=0;
	};
	Map.prototype.entries=function(){
		return this.items.entries();
	};
	Map.prototype.clear=function(){
		this.items.splice(0,this.items.length);
		this.size=0;
	};
	Map.prototype["delete"]=function(key){
		var i=this.items.findIndex(function(item){
			return item[0]===key;
		});
		if(i>=0){
			var r=this.items[i];
			this.items.splice(i,1);
			this.size=this.items.length;
			return r;
		}
		return false;
	};
	Map.prototype.forEach=function(callbackfn,thisArg){
		var len=this.size;
		for(var i=0,j;i<len; i++){
			j=this.items[i];
			if(j){
				callbackfn.call(thisArg,j[1],j[0],i,this);
			}
		}
	};
	Map.prototype.get=function(key){
		var r=this.items.find(function(item){
			return item[0]===key;
		});
		if(r){
			return r[1];
		}
	};
	Map.prototype.has=function(key){
		return this.items.some(function(item){
			return item[0]===key;
		});
	};
	Map.prototype.set=function(key,value){
		var r=this.items.find(function(item){
			return item[0]===key;
		});
		if(r){
			r[1]=value;
		}else{
			this.items.push([key,value]);
		}
		this.size=this.items.length;
		return this;
	};
}
if(!Map.prototype.remove){
	Map.prototype.remove=Map.prototype['delete'];
}
if(!this.Set){
	Set=function(){
		this.items=[];
		this.size=0;
	};
	Set.prototype.has=function(value){
		return this.items.indexOf(value)>=0;
	};
	Set.prototype.add=function(value){
		if(!this.has(value)){
			this.items.push(value);
			this.size=this.items.length;
		}
	};
	Set.prototype['delete']=function(value){
		var i=this.items.indexOf(value);
		if(i>=0){
			this.items.splice(i,1);
			this.size=this.items.length;
			return true;
		}
		return false;
	};
	Set.prototype.clear=function(){
		this.items.splice(0,this.items.length);
		this.size=0;
	};
	Set.prototype.forEach=function(callback,thisArg){
		for(var i=0,j;i<this.size; i++){
			j=this.items[i];
			callback.call(thisArg,j,j,this);
		}
	};
	Set.prototype.toArray=function(){
		return this.items.slice(0);
	};
}
if(!Set.prototype.remove){
	Set.prototype.remove=Set.prototype['delete'];
}
if(!Set.prototype.toArray){
	Set.prototype.toArray=function(){
		var a=[];
		this.forEach(function(item){
			a.push(item);
		});
		return a;
	};
}
if(!Set.prototype.addAll){
	Set.prototype.addAll=function(data){
		if(data.forEach){
			data.forEach(function(item){
				this.add(item);
			},this);
		}
		return this;
	};
}
if(!Set.prototype.removeAll){
	Set.prototype.removeAll=function(data){
		if(data.forEach){
			data.forEach(function(item){
				this.remove(item);
			},this);
		}
		return this;
	};
}
if(!Set.prototype.retainAll){
	Set.prototype.retainAll=function(data){
		this.forEach(function(item){
			if(data.has){
				if(!data.has(item)) this.remove(item);
			}else if(data.indexOf){
				if(data.indexOf(item)<0) this.remove(item);
			}
		},this);
		return this;
	};
}
if(!Set.prototype.toArray){
	Set.prototype.toArray=function(){
		var r=[];
		this.forEach(function(item){
			r.push(item);
		});
		return r;
	};
}
var URLSearchParams;
if(!this.URLSearchParams){
	URLSearchParams=function(paramsString){
		this._data=new Array();
		if(paramsString){
			var i,pair;
			if(Array.isArray(paramsString)){
				i=this._data.length=paramsString.length;
				while(i-->0){
					pair=paramsString[i];
					this._data[i]=new Array(pairs[1],pairs[0]);
				}
			}else{
				var pairs=paramsString.split("&");
				i=this._data.length=pairs.length;
				while(i-->0){
					pair=pairs[i];
					if(pair){
						var id=pair.indexOf("=");
						this._data[i]=new Array(decodeURIComponent(pair.substring(id+1,pair.length)),decodeURIComponent(pair.substring(0,id)));
					}
				}
			}
		}
	};
	URLSearchParams.prototype.append=function(key,value){
		this._data.push([key,value]);
	};
	URLSearchParams.prototype.get=function(key){
		var item=this._data.find(function(item){
			return item[1]==key;
		});
		if(item) return item[0];
		return null;
	};
	URLSearchParams.prototype.getAll=function(key){
		return this._data.filter(function(item){
			return item[1]==key;
		}).map(function(item){
			return item[0];
		});
	};
	URLSearchParams.prototype.set=function(key,value){
		var item=this._data.find(function(item){
			return item[1]==key;
		});
		if(item){
			item[0]=value;
		}else{
			this.append(key,value);
		}
	};
	URLSearchParams.prototype['delete']=function(key){
		this._data=this._data.filter(function(item){
			return item[1]!=key;
		});
	};
	URLSearchParams.prototype.has=function(key){
		return this._data.some(function(item){
			return item[1]==key;
		});
	};
	URLSearchParams.prototype.toString=function(){
		return this._data.map(function(item){
			return encodeURIComponent(item[1])+"="+encodeURIComponent(item[0]);
		}).join("&");
	};
	URLSearchParams.prototype.sort=function(){
		return this._data.sort(function(a,b){
			return a[1] > b[1];
		});
	};
	URLSearchParams.prototype.forEach=function(fn,thisArg){
		this._data.forEach.apply(this._data,arguments);
	};
}
var URL;
(function(window){
	var SearchParams=function(url){
		this._url=url;
	};
	SearchParams.prototype=Object.create(URLSearchParams.prototype);
	["append","set","delete"].forEach(function(method){
		SearchParams.prototype[method]=function(key,value){
			var searchParams=new URLSearchParams(this._url.search.replace(/^\?/,""));
			searchParams[method].apply(searchParams,arguments);
			this._url.search="?"+searchParams.toString();
		};
	});
	["getAll","get","has","toString"].forEach(function(method){
		SearchParams.prototype[method]=function(key,value){
			var searchParams=new URLSearchParams(this._url.search.replace(/^\?/,""));
			return searchParams[method].apply(searchParams,arguments);
		};
	});
	var url=null;
	try{
		url=new URL(location.href);
	}catch(e){
	}
	if(!url || !('href' in url)){
		URL=function(relativePath, absolutePath){
			var path,arr,me=this;
			if(!Object.defineProperties){
				me=VBUrlFactory();
			}
			me.protocol=me.hostname=me.pathname=null;
			me.port=me.search=me.hash=me.username=me.password="";
			me.searchParams=new SearchParams(me);
			var pattern=/^[a-zA-Z]+:/;
			if(arr=relativePath.match(pattern)){
				me.protocol=arr[0];
				path=relativePath.replace(pattern,"");
				pattern=/^\/*([^\/]+)/;
				var host=path.match(pattern)[1];
				path=path.replace(pattern,"");
				arr=host.split("@");
				if(arr.length>1){
					me.host=arr[1];
					arr=arr[0].split(":");
					if(arr.length>1){
						me.username=arr[0];
						me.password=arr[1];
					}else{
						me.username=arr[0];
					}
				}else{
					me.host=host;
				}
			}else if(absolutePath){
				var absInfo=absolutePath.indexOf?new URL(absolutePath):absolutePath;
				me.protocol=absInfo.protocol;
				me.hostname=absInfo.hostname;
				me.port=absInfo.port;
				if(absInfo.username) me.username=absInfo.username;
				if(absInfo.password) me.password=absInfo.password;
				me.pathname=absInfo.pathname;
				if(relativePath.startsWith("#")){
					me.search=absInfo.search;
					me.hash=relativePath;
					return me;
				}else if(relativePath.startsWith("?")){
					var a=relativePath.indexOf("#");
					if(a<0){
						me.search=relativePath;
						me.hash="";
					}else{
						me.search=relativePath.substr(0,a);
						me.hash=relativePath.substring(a,relativePath.length);
					}
					return me;
				}else if(relativePath.startsWith("/")){
					path=relativePath;
				}else if(relativePath.startsWith("../")){
					path=absInfo.pathname.replace(/\/[^\/]*$/,"/")+relativePath;
					pattern=/[^\/]+\/\.\.\//;
					while(pattern.test(path)){
						path=path.replace(pattern,"");
					}
					path=path.replace(/^(\/\.\.)+/,"");
				}else{
					path=absInfo.pathname.replace(/[^\/]*$/,"")+relativePath.replace(/^\.\//,"");
				}
			}else{alert(arr);
				throw "SYNTAX_ERROR";
			}
			pattern=/^[^#]*/;
			me.hash=path.replace(pattern,"");
			arr=path.match(pattern);
			path=arr[0];
			pattern=/^[^\?]*/;
			me.search=path.replace(pattern,"");
			arr=path.match(pattern);
			me.pathname=arr[0];
			return me;
		};
	}
	URL.properties={
		host:{
			enumerable:true,
			get:function(){
				if(this.port){
					return this.hostname+":"+this.port;
				}
				return this.hostname;
			},
			set:function(value){
				var pattern=/(.*):(\d+)$/;
				var arr=value.match(pattern);
				this.port="";
				if(arr){
					this.hostname=arr[1];
					this.port=arr[2];
				}else{
					this.hostname=value;
				}
			}
		},
		origin:{
			enumerable:true,
			get:function(){
				return this.protocol+"//"+this.host;
			}
		},
		href:{
			enumerable:true,
			get:function(){
				var user=this.username;
				if(user){
					if(this.password){
						user+=":"+this.password;
					}
					user+="@";
				}
				return this.protocol+"//"+user+this.host+this.pathname+this.search+this.hash;
			},
			set:function(value){
				var url=new URL(value);
				this.protocol=url.protocol;
				this.hostname=url.hostname;
				this.pathname=url.pathname;
				this.port=url.port;
				this.search=url.search;
				this.hash=url.hash;
				this.username=url.username;
				this.password=url.password;
			}
		}
	};
	if(Object.defineProperties){
		if(!url || !('href' in url)){
			Object.defineProperties(URL.prototype,URL.properties);
		}else{
			if(!('origin' in url)){
				Object.defineProperty(URL.prototype,"origin",URL.properties.origin);
			}
			if(!('searchParams' in url)){
				Object.defineProperty(URL.prototype,"searchParams",{
					enumerable:true,
					get:function(){
						var searchParams=new SearchParams(this);
						Object.defineProperty(this,"searchParams",{
							enumerable:true,
							value:searchParams
						});
						return searchParams;
					}
				});
			}
		}
	}else{
		window.execScript([
			'Class VBURL',
			'	Public [protocol]',
			'	Public [hostname]',
			'	Public [pathname]',
			'	Public [port]',
			'	Public [search]',
			'	Public [searchParams]',
			'	Public [hash]',
			'	Public [username]',
			'	Public [password]',
			'	Public Property Let [host](var)',
			'		Call URL.properties.host.set.call(Me,var)',
			'	End Property',
			'	Public Property Get [host]',
			'		[host]=URL.properties.host.get.call(Me)',
			'	End Property',
			'	Public Property Let [origin](var)',
			'	End Property',
			'	Public Property Get [origin]',
			'		[origin]=URL.properties.origin.get.call(Me)',
			'	End Property',
			'	Public Property Let [href](var)',
			'		Call URL.properties.href.set.call(Me,var)',
			'	End Property',
			'	Public Property Get [href]',
			'		[href]=URL.properties.href.get.call(Me)',
			'	End Property',
			'End Class',
			'Function VBUrlFactory()',
			'	Dim o',
			'	Set o = New VBURL',
			'	Set VBUrlFactory = o',
			'End Function'
		].join('\n'), 'VBScript');
	}
})(this);

Sky.escapeString=function(str) {//from lodash
	var rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
	rx_escapable.lastIndex = 0;
	return rx_escapable.test(str)
		? str.replace(rx_escapable, function(a) {
		var meta = {
			"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r": "\\r",	"\"": "\\\"","\\": "\\\\"
		};
		var c = meta[a];
		return typeof c === "string"
			? c
			: "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
	}): str;
};
Sky.support.JSON=true;
if(!this.JSON){
	Sky.support.JSON=false;
	JSON={
		'stringify':function(obj){
			switch(obj){
				case null:
					return "null";
				case false:
				case true:
					return obj;
					break;
				default:
					var type=Object.prototype.toString.call(obj);
					switch(type){
						case '[object String]':
							return '"'+Sky.escapeString(obj)+'"';
						case '[object Number]':
							return isNaN(obj)?"null":obj.toString();
						case '[object Array]':
							return "["+obj.map(JSON.stringify).join(",")+"]";
						default:
							if(Sky.isFunction(obj.toJSON)){
								return JSON.stringify(obj.toJSON());
							}
							var items=[];
							Sky.forOwn(function(value,key){
								if(value!==void 0){
									if(!Sky.isFunction(value)){
										items.push('"'+Sky.escapeString(k)+'":'+JSON.stringify(value));
									}
								}
							});
							return "{"+items.join(",")+"}";
					}
			}
		},
		'parse':function(str){
			return eval('('+str+')');
		}
	};
}
//setImmediate在setTimeout之前执行
if(!this.setImmediate){
	(function(global){
		var index=0;
		var handles=new Map();
		if(this.Promise){
			global.setImmediate=function(fn){
				index++;
				var args=Array.from(arguments);
				args.shift();
				var p=Promise.resolve(index);
				handles.set(index,args);
				p.then(function(id){
					var args=handles.get(id);
					if(args){
						fn.apply(global,args);
						clearImmediate(id);
					}
				});
				return index;
			};
		}else{
			var ticks=null;
			global.setImmediate=function(fn){
				index++;
				if(!ticks){
					ticks=new Array();
					setTimeout(nextTick);
				}
				ticks.push(index);
				handles.set(index,arguments);
				return index;
			};
			function nextTick(){
				if(ticks && ticks.length){
					for(var i=0;i<ticks.length;i++){
						var id=ticks[i];
						var args=handles.get(id);
						if(args){
							var fn=args[0];
							args=Array.from(args);
							args.shift();
							try{
								fn.apply(global,args);
							}catch(e){
								console.error(e);
							}
						}
					}
					ticks=null;
					handles.clear();
				}
			}
			setImmediate.nextTick=nextTick;
			var setTimeoutN=setImmediate.setTimeout=setTimeout;
			if(document.addEventListener){
				global.setTimeout=function(fn,d){
					setTimeoutN(function(){
						setImmediate.nextTick();
						fn();
					},d)
				};
			}else{
				window.execScript("function setTimeout(fn,d){setImmediate.setTimeout(function(){setImmediate.nextTick();fn();},d)}");
			}
		}
		global.clearImmediate=function(id){
			handles['delete'](id);
		};
	})(this);
}

(function(global){
	function Deferred(){
		this._resolveds=[];
		this._rejecteds=[];
		this._state="pending";//resolved | rejected
	}
	Deferred.prototype.state=function(){
		return this._state;
	};
	Deferred.prototype.done=function(fn){
		if(this._state=="resolved"){
			fn.call(this,this.data);
		}else if(this._state=="pending"){
			this._resolveds.push(fn);
		}
		return this;
	};
	Deferred.prototype.fail=function(fn){
		if(this._state=="rejected"){
			fn.call(this,this.data);
		}else if(this._state=="pending"){
			this._rejecteds.push(fn);
		}
		return this;
	};
	Deferred.prototype.always=function(fn){
		if(this._state=="pending"){
			this._resolveds.push(fn);
			this._rejecteds.push(fn);
		}else{
			fn.call(this,this.data);
		}
	};
	Deferred.prototype.resolve=function(d){
		if(this._state=="pending"){
			this.data=d;
			this._state="resolved";
			this._resolveds.forEach(callAll,this);
			this._resolveds=null;
		}
		return this;
	};
	Deferred.prototype.reject=function(d){
		if(this._state=="pending"){
			this.data=d;
			this._state="rejected";
			this._rejecteds.forEach(callAll,this);
			this._rejecteds=null;
		}
		return this;
	};
	function callAll(fn){
		fn.call(this,this.data);
	}
	if(!this.Promise){
		function Promise(executor){
			Deferred.call(this);
			var me=this;
			function resolve(value) {
				setImmediate(function(){
					me.resolve(value);
				});
			}
			function reject(reason) {
				setImmediate(function(){
					me.reject(reason);
				});
			}
			try{
				executor(resolve, reject);
			}catch(e){
				reject(e);
			}
		}
		Promise.prototype=Object.create(Deferred.prototype);
		Promise.prototype.constructor=Promise;
		function nextPromise(before,after,resolve,reject){
			return function(value){
				try{
					var x=before(value);
					if(typeof x.then==="function"){
						x.then(resolve, reject);
					}else{
						after(x);
					}
				}catch(r){
					reject(r);
				}
			};
		}
		Promise.prototype.then=function(onResolved, onRejected){
			var me=this;
			onResolved=onResolved || Sky.noop;
			onRejected=onRejected || Sky.noop;
			return new Promise(function(resolve,reject){
				switch(me.state()){
					case "resolved":
						setImmediate(nextPromise(onResolved,resolve,resolve,reject),me.data);
						break ;
					case "rejected":
						setImmediate(nextPromise(onRejected,reject,resolve,reject),me.data);
						break ;
					default:
						me._resolveds.push(nextPromise(onResolved,resolve,resolve,reject));
						me._rejecteds.push(nextPromise(onRejected,reject,resolve,reject));
				}
			});
		};
		Promise.prototype['catch']=function(onRejected){
			return this.then(undefined,onRejected);
		};
		Promise.all=function(promises){
			if (!Sky.isArray(promises)) {
				throw new TypeError('You must pass an array to all.');
			}
			return new Promise(function(resolve,reject){
				if(promises.length==0) return resolve(new Array());
				var result=new Array(promises.length);
				var c=0;
				promises.forEach(function(one,index){
					if(one instanceof Promise){
						one.then(function(data){
							c++;
							result[index]=data;
							if(c>=promises.length){
								resolve(result);
							}
						},function(data){
							reject(data);
						});
					}else{
						c++;
						result[index]=one;
						if(c>=promises.length){
							resolve(result);
						}
					}
				});
			});
		};
		Promise.race=function(promises){
			if (!Array.isArray(promises)) {
				throw new TypeError('You must pass an array to all.');
			}
			return new Promise(function(resolve,reject){
				promises.forEach(function(one){
					one.then(function(){
						resolve();
					},function(){
						reject();
					});
				});
			});
		};
		Promise.resolve=function(arg){
			return new Promise(function(resolve,reject){
				resolve(arg)
			});
		};
		Promise.reject=function(arg){
			return Promise(function(resolve,reject){
				reject(arg)
			});
		};
		global.Promise=Promise;
		global.Deferred=Deferred;
	}
	Sky.Deferred=function(){
		return new Deferred();
	};
})(this);

Sky.when=function(subordinate){
	if(arguments.length==1){
		return arguments[0];
	}
	var resolveValues=Array.from(arguments);
	var dfd=Sky.Deferred();
	var i=0;
	resolveValues.forEach(function(item){
		item.done(function(){
			i++;
			if(i==resolveValues.length){
				dfd.resolve();
			}
		});
	});
	return dfd;
};

Sky.support.XMLHttpRequest=true;
if(!this.XMLHttpRequest){
	Sky.support.XMLHttpRequest=false;
	XMLHttpRequest=function(){
		if(XMLHttpRequest.progid){
			return new ActiveXObject(XMLHttpRequest.progid);
		}
		var versions=["Microsoft.XMLHTTP","MSXML2.XMLHTTP","Msxml2.XMLHTTP.5.0"];
		var i=versions.length;
		while(i--){
			try{
				var progid=versions[i];
				var request=new ActiveXObject(progid);
				if(request){
					XMLHttpRequest.progid=progid;
					return request;
				}
			}catch(e){}
		}
	};
}

if(!('head' in document)) document.head=document.getElementsByTagName("head")[0];
location.origin=location.origin || location.protocol+"//"+location.host;
/** 判断一个节点后代是否包含另一个节点 **/
if(this.Node && Node.prototype && !Node.prototype.contains){
	Node.prototype.contains=function(arg){
		return !!(this.compareDocumentPosition(arg) & 16);
	}
}
if(!document.contains){
	document.contains=function(ele){
		var i,arr=document.all;
		for(i=0;i<arr.length;i++){
			if(arr[i]===ele){
				return true;
			}
		}
		return false;
	};
}
if(this.HTMLElement) {
	if(!document.head.children){
		HTMLElement.prototype.__defineGetter__("children", function() {
			var a=[];
			for(var i=0; i<this.childNodes.length; i++){
				var n=this.childNodes[i];
				if(n.nodeType==1){
					a.push(n);
				}
			}
			return a;
		});
	}
	if(!('innerText' in document.head)){
		(function(){
			HTMLElement.prototype.__defineGetter__( "innerText", function(){
				var anyString = "";
				var childS = this.childNodes;
				for(var i=0; i<childS.length; i++){
					var node=childS[i];
					if(node.nodeType==1){
						switch(node.tagName){
							case "BR":
								anyString+='\n';
								break ;
							case "SCRIPT":
							case "STYLE":
							case "TEMPLATE":
								break ;
							default :
								anyString+=node.innerText;
						}
					}else if(node.nodeType==3){
						var nodeValue=node.nodeValue;
						if(i==0)
							nodeValue=nodeValue.trimLeft();
						if(i==childS.length-1)
							nodeValue=nodeValue.trimRight();
						if(i>0 && i<childS.length-1){
							if(nodeValue.match(/^\s+$/)){
								if(checkBlock(childS[i-1]) || checkBlock(childS[i+1])){
									nodeValue="\n";
								}
							}
						}
						anyString+=nodeValue;
					}
				}
				return anyString.trim();
			});
			function checkBlock(node){
				switch(node.tagName){
					case "BR":
					case "SPAN":
					case "I":
					case "U":
					case "B":
					case "FONT":
						return false;
				}
				return true;
			}
		})();
		HTMLElement.prototype.__defineSetter__( "innerText", function(sText){
			this.textContent=sText;
		});
	}
}

(function(){
	var nodes=document.getElementsByTagName('SCRIPT');
	var currentScript=nodes[nodes.length-1];
	Sky.support.getCurrentScript=true;
	if(document.currentScript!==void 0){//最新浏览器
	}else{
		if("readyState" in currentScript){
			Sky.getCurrentScript=function(){//IE11-
				var nodes=document.getElementsByTagName('SCRIPT');
				var i=nodes.length;
				while(i--){
					var node=nodes[i];
					if(node.readyState==="interactive"){
						return node;
					}
				}
				return null;
			};
			if(Object.defineProperty){
				Object.defineProperty(document,"currentScript",{
					enumerable:!!Object.defineProperties,//IE8不支持enumerable
					get:function(){
						return Sky.getCurrentScript();
					}
				});
			}
		}else{
			document.addEventListener('load',function(e){
				if(e.target.tagName==="SCRIPT"){
					e.target.readyState="complete";
				}
			},true);
			Sky.support.getCurrentScript=false;
			Object.defineProperty(document,"currentScript",{
				enumerable:true,
				get:function(){
					if(Sky.support.getCurrentPath){
						var path=Sky.getCurrentPath();
						var nodes=document.getElementsByTagName('SCRIPT');
						if(path){
							for(var i=0;i<nodes.length;i++){
								var node=nodes[i];
								if(path===new URL(node.src,location).href){
									if(node.readyState!=="complete") {
										return node;
									}
								}
							}
							return null;
						}
						if(Sky.isReady){
							return null;
						}
					}
					nodes=document.getElementsByTagName('SCRIPT');
					return nodes[nodes.length-1];
				}
			});
		}
	}
	if(!Sky.getCurrentScript){//最新浏览器
		Sky.getCurrentScript=function(){
			return document.currentScript;
		};
	}
	Sky.support.getCurrentPath=true;
	try{
		throw new Error('get stack');
	}catch(e){
		var stackHandler={
			'stack':[
				/^@(.*):\d+$/,// Firefox
				/^\s+at (.*):\d+:\d+$/,//Chrome
				/^\s+at [^\(]*\((.*):\d+:\d+\)$/ //IE11
			],
			'stacktrace':[
				/\(\) in\s+(.*?\:\/\/\S+)/m//opera
			]
		};
		var stackResult=handleStack(e,stackHandler);
		if(stackResult){
			Sky.getCurrentPath=function(){
				try{
					throw new Error('get stack');
				}catch(e){
					var arr=getLastStack(e[stackResult.name]).match(stackResult.pattern);
					if(arr){
						if(arr[1]!=location.href && arr[1]!=location.origin+location.pathname+location.search){
							return arr[1];
						}
					}
				}
			};
		}
	}
	if(!Sky.getCurrentPath){
		Sky.support.getCurrentPath=false;
		Sky.getCurrentPath=function(){
			var currentScript=Sky.getCurrentScript();
			return new URL(currentScript.src,location).href;
		};
	}
	function getLastStack(stack){
		var stacks=stack.trim().split("\n");;
		return stacks[stacks.length-1];
	}
	function handleStack(e,stackHandler){
		for(var name in stackHandler){
			var stacks=e[name];
			if(stacks){
				var patterns=stackHandler[name];
				var stack=getLastStack(stacks);
				var i=patterns.length;
				while(i--){
					var pattern=patterns[i];
					if(pattern.test(stack)){
						return {'name':name,'pattern':pattern};
					}
				}
			}
		}
	}
})();

if(!this.console){
	console={};
	if(this.Debug){
		console.log=console.info=console.error=console.warn=function(data){
			Debug.writeln(data);
		};
	}else{
		console.log=console.info=console.error=console.warn=function(data){
			window.status=data;
		};
		console.clear=function(){
			window.status='';
		};
	}
}

Sky.getScript=function(src,func,charset){
	var script=document.createElement('script');
	if(!charset){charset="UTF-8"};
	script.charset=charset;
	script.src=src;
	script.async=true;
	if(func){
		var event='onreadystatechange';
		if(event in script){
			script.attachEvent(event,function(){
				if(script.readyState==='loaded'){
					document.head.appendChild(script);
				}else if(script.readyState==='complete'){
					script.detachEvent(event,arguments.callee);
					var evt=window.event;
					//evt.target=evt.currentTarget=evt.srcElement;
					func.call(script,evt);
				}
			});
		}else{
			if('onafterscriptexecute' in script){
				script.onafterscriptexecute=func;
			}else{
				script.onload=func;
			}
			document.head.appendChild(script);
		}
	}else{
		document.head.appendChild(script);
	}
	return script;
};

(function(){
	Sky.isReady=false;
	var p=new Promise(function(resolve, reject){
		if(document.addEventListener){
			document.addEventListener("DOMContentLoaded",function(){
				Sky.isReady=true;
				resolve();
			},false);
		}else if(window==window.top){
			(function() {
				try{
					document.documentElement.doScroll('left');
					Sky.isReady=true;
					resolve();
				}catch(e){
					setTimeout(arguments.callee, 0);
				}
			})();
		}else{
			document.attachEvent("onreadystatechange",function(){
				if(document.readyState === "complete") {
					document.detachEvent("onreadystatechange", arguments.callee);
					Sky.isReady=true;
					resolve();
				}
			});
		}
	});
	Sky.ready=function(callback){
		if(callback && !Sky.isReady){
			return p.then(callback);
		}
		return p;
	};
	Sky.then=function(callback){
		return p.then(callback);
	};
})();


Sky.times=function(n,iteratee,thisArg){
	if(n<1){
		return [];
	}
	var index = -1,
		result = Array(n);
	while (++index < n) {
		result[index] = iteratee.apply(this,thisArg);
	}
	return result;
};
Sky.findIndex=function(arr,key,value){
	for(var i=0; i<arr.length; i++){
		if(arr[i][key]===value){return i;}
	}
	return -1;
};
Sky.findLastIndex=function(arr,key,value){
	for(var i=arr.length-1; i>=0; i--){
		if(arr[i][key]===value){return i;}
	}
	return -1;
};
Sky.find=function(arr,key,value){
	for(var i=0; i<arr.length; i++){
		if(arr[i][key]===value){return arr[i];}
	}
};
Sky.findLast=function(arr,key,value){
	for(var i=arr.length-1; i>=0; i--){
		if(arr[i][key]===value){return value;}
	}
};
Sky.shuffle=function(arr){
	var copyArr=arr.slice();
	var ubound=arr.length-1;
	for(var i=0; i<ubound; i++){
		var r=Sky.random(0,ubound);
		var tmp=copyArr[r];
		copyArr[r]=copyArr[i];
		copyArr[i]=tmp;
	}
	return copyArr;
};
Sky.sortBy=function(arr,key){
	return arr.sort(function(a,b){
		return a[key] > b[key];
	});
};
Sky.pluck=function(arr,key){
	return arr.map(function(item){
		return item[key];
	});
};
Sky.sortedIndex=function(arr,value){
	for(var i=0; i<arr.length; i++){
		if(arr[i]>=value){
			return i;
		}
	}
	return arr.length;
};
Sky.sortedLastIndex=function(arr,value){
	for(var i=arr.length-1; i>=0; i--){
		if(arr[i]<=value){
			return i+1;
		}
	}
};

//数字开头补零
Sky.pad=function(value,width,chars){
	if(!chars){chars=" ";}
	if(Sky.isNumber(value)){
		chars="0";
	}
	value+='';
	return value.padStart(width,chars);
};
//清除HTML代码
Sky.escapeHtml=function(str) {
	return str.replace(/&/g,'&amp;')
		.replace(/</g,'&lt;')
		.replace(/>/g,'&gt;');
};
Sky.escapeAttribute=function(str,quot){
	var esc=Sky.escapeHtml(str);
	if(!quot || quot=='"'){
		return esc.replace(/"/g,'&quot;');
	}else{
		return esc.replaceAll(quot.charAt(0),'&#'+quot.charCodeAt(0)+";");
	}
};
(function(){
	var div=document.createElement('div');
	var htmlEscapes={
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#39;',
		'`': '&#96;'
	};
	Sky.escape=function(text){
		return text.replace(/[&<>"'`]/g,function(i){
			return htmlEscapes[i];
		});
	};
	Sky.unescape=function(html){
		div.innerHTML=html;
		return div.innerText || div.textContent ;
	};
})();
Sky.escapeRegExp=function(str){//from lodash
	if(str){
		var reRegExpChars = /^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g;
		reRegExpChars.lastIndex = 0;
		return (reRegExpChars.test(str))
			? str.replace(reRegExpChars, function(chr, leadingChar, whitespaceChar) {
			if (leadingChar) {
				var regexpEscapes = {
					'0': 'x30', '1': 'x31', '2': 'x32', '3': 'x33', '4': 'x34',
					'5': 'x35', '6': 'x36', '7': 'x37', '8': 'x38', '9': 'x39',
					'A': 'x41', 'B': 'x42', 'C': 'x43', 'D': 'x44', 'E': 'x45', 'F': 'x46',
					'a': 'x61', 'b': 'x62', 'c': 'x63', 'd': 'x64', 'e': 'x65', 'f': 'x66',
					'n': 'x6e', 'r': 'x72', 't': 'x74', 'u': 'x75', 'v': 'x76', 'x': 'x78'
				};
				chr = regexpEscapes[chr];
			} else if (whitespaceChar) {
				var stringEscapes = {
					'\\': '\\',
					"'": "'",
					'\n': 'n',
					'\r': 'r',
					'\u2028': 'u2028',
					'\u2029': 'u2029'
				};
				chr = stringEscapes[chr];
			}
			return '\\' + chr;
		})
			: str;
	}
	return "(?:)";
};
Sky.replaceAll=function(str, reallyDo, replaceWith, ignoreCase) {
	return str.replace(new RegExp(Sky.escapeRegExp(reallyDo), (ignoreCase ? "gi": "g")), replaceWith);
};
//获取字符串占位长度
Sky.strlen=function(str){
	var len=0;
	for(var i = 0; i < str.length; i++){
		if (str.charCodeAt(i) > 127 || str.charCodeAt(i) < 0){
			len+=2;
		}else{
			len++;
		}
	}
	return len;
};
//截取字符串占位长度
Sky.trunc=function(str,len,replaceStr){
	var relen=Sky.strlen(replaceStr);
	if(relen>len){
		for (var i = relen.length-1; i >= 0; i--){
			if (relen.charCodeAt(i) > 127 || relen.charCodeAt(i) < 0){
				len-=2;
			}else{
				len--;
			}
			if(len<0){
				i++;
				return replaceStr.substr(i,replaceStr.length-i);
			}
		}
	}else{
		len-=relen;
		var p=0;
		for (var i = 0; i < str.length; i++){
			if (str.charCodeAt(i) > 127 || str.charCodeAt(i) < 0){
				p+=2;
			}else{
				p++;
			}
			if(p>len){
				return str.substring(0,i)+replaceStr;
			}
		}
		return str;
	}
};

//数字开头补零
Sky.pad=function(value,width,chars){
	if(!chars){chars=" ";}
	if(Sky.isNumber(value)){
		chars="0";
	}
	value+='';
	return value.padStart(width,chars);
};
//清除HTML代码
Sky.escapeHtml=function(str) {
	return str.replace(/&/g,'&amp;')
		.replace(/</g,'&lt;')
		.replace(/>/g,'&gt;');
};
Sky.escapeAttribute=function(str,quot){
	var esc=Sky.escapeHtml(str);
	if(!quot || quot=='"'){
		return esc.replace(/"/g,'&quot;');
	}else{
		return esc.replaceAll(quot.charAt(0),'&#'+quot.charCodeAt(0)+";");
	}
};
(function(){
	var div=document.createElement('div');
	var htmlEscapes={
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#39;',
		'`': '&#96;'
	};
	Sky.escape=function(text){
		return text.replace(/[&<>"'`]/g,function(i){
			return htmlEscapes[i];
		});
	};
	Sky.unescape=function(html){
		div.innerHTML=html;
		return div.innerText || div.textContent ;
	};
})();
Sky.escapeRegExp=function(str){//from lodash
	if(str){
		var reRegExpChars = /^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g;
		reRegExpChars.lastIndex = 0;
		return (reRegExpChars.test(str))
			? str.replace(reRegExpChars, function(chr, leadingChar, whitespaceChar) {
			if (leadingChar) {
				var regexpEscapes = {
					'0': 'x30', '1': 'x31', '2': 'x32', '3': 'x33', '4': 'x34',
					'5': 'x35', '6': 'x36', '7': 'x37', '8': 'x38', '9': 'x39',
					'A': 'x41', 'B': 'x42', 'C': 'x43', 'D': 'x44', 'E': 'x45', 'F': 'x46',
					'a': 'x61', 'b': 'x62', 'c': 'x63', 'd': 'x64', 'e': 'x65', 'f': 'x66',
					'n': 'x6e', 'r': 'x72', 't': 'x74', 'u': 'x75', 'v': 'x76', 'x': 'x78'
				};
				chr = regexpEscapes[chr];
			} else if (whitespaceChar) {
				var stringEscapes = {
					'\\': '\\',
					"'": "'",
					'\n': 'n',
					'\r': 'r',
					'\u2028': 'u2028',
					'\u2029': 'u2029'
				};
				chr = stringEscapes[chr];
			}
			return '\\' + chr;
		})
			: str;
	}
	return "(?:)";
};
Sky.replaceAll=function(str, reallyDo, replaceWith, ignoreCase) {
	return str.replace(new RegExp(Sky.escapeRegExp(reallyDo), (ignoreCase ? "gi": "g")), replaceWith);
};
//获取字符串占位长度
Sky.strlen=function(str){
	var len=0;
	for(var i = 0; i < str.length; i++){
		if (str.charCodeAt(i) > 127 || str.charCodeAt(i) < 0){
			len+=2;
		}else{
			len++;
		}
	}
	return len;
};
//截取字符串占位长度
Sky.trunc=function(str,len,replaceStr){
	var relen=Sky.strlen(replaceStr);
	if(relen>len){
		for (var i = relen.length-1; i >= 0; i--){
			if (relen.charCodeAt(i) > 127 || relen.charCodeAt(i) < 0){
				len-=2;
			}else{
				len--;
			}
			if(len<0){
				i++;
				return replaceStr.substr(i,replaceStr.length-i);
			}
		}
	}else{
		len-=relen;
		var p=0;
		for (var i = 0; i < str.length; i++){
			if (str.charCodeAt(i) > 127 || str.charCodeAt(i) < 0){
				p+=2;
			}else{
				p++;
			}
			if(p>len){
				return str.substring(0,i)+replaceStr;
			}
		}
		return str;
	}
};

Sky.extend=function(){//扩展对象
	var args=arguments;
	if(args.length==0) return;
	if(args.length==1) return args[0];
	var temp=args[0]==true?args[1]:args[0]; //调用复制对象方法
	for (var n=args[0]==true?2:1;n<args.length;n++){
		for(var i in args[n]){
			if(Sky.hasOwn(args[n],i)){
				if(args[n][i]!=null && args[0]==true && Sky.isObject(args[n][i]) && Sky.isObject(temp[i])){
					temp[i]=Sky.extend(true,temp[i],args[n][i]);
					//temp[i] = args[n][i];
				}else{
					temp[i] = args[n][i];
				}
			}
		}
	}
	return temp;
};
Sky.apply=function(obj,config){
	console.warn("Deprecated. use Object.assign");
	Sky.forIn(config,function(v,k){
		obj[k]=v;
	});
	return obj;
};
Sky.applyIf=function(obj,config){
	Sky.forIn(config,function(v,k){
		if(!(k in obj)){
			obj[k]=v;
		}
	});
	return obj;
};


Sky.getFormData=function(form){
	if(Sky.isString(form)){
		form=document.forms[form];
	}
	if(form.tagName.toUpperCase()!="FORM"){
		throw "form is not exit";
	}
	var o={};
	for(var i=0; i<form.length; i++){
		var input=form[i];
		if(input.name){
			var arr,name,value;
			switch (input.type) {
				case "checkbox":
					if(input.checked){
						if(arr=input.name.match(/(.*)\[\]$/)){
							name=arr[1];
							value=o[name];
							if(!value){
								o[name]=value=[];
							}
							if(input.value){
								value.push(input.value);
							}else{
								value.push("on");
							}
						}else if(arr=input.name.match(/(.*)\[([^\]]+)\]$/)){
							name=arr[1];
							var key=arr[2];
							value=o[name];
							if(!value){
								o[name]=value={};
							}
							if(input.value){
								value[key]=input.value;
							}else{
								value[key]="on";
							}
						}else{
							o[input.name]=input.value;
						}
					}
					break;
				case "radio":
					if(input.checked){
						o[input.name]=input.value;
					}
					break;
				default:
					o[input.name]=input.value;
			}
		}
	}
	return o;
};
Sky.setFormData=function(form,data){
	if(Sky.isString(form)){
		form=document.forms[form];
	}
	if(form.tagName.toUpperCase()!="FORM"){
		throw "form is not exit";
	}
	for(var i=0; i<form.length; i++){
		var input=form[i];
		if(input.name){
			var arr,name,value;
			switch (input.type) {
				case "checkbox":
					if(data){
						if(arr=input.name.match(/(.*)\[\]$/)){
							name=arr[1];
							if(name in data){
								value=data[name];
								if(value.split) value=value.split(",");
								if(value.indexOf && value.indexOf(input.value)>=0){
									input.checked=true;
								}else{
									input.checked=false;
								}
							}
						}else if(arr=input.name.match(/(.*)\[([^\]]+)\]$/)){
							name=arr[1];
							if(name in data){
								var key=arr[2];
								value=data[name];
								if(value && value[key]){
									input.value=value[key];
									input.checked=true;
								}else{
									input.checked=false;
								}
							}
						}else{
							if(input.name in data){
								value=data[input.name];
								if(value){
									input.value=value;
									input.checked=true;
								}else{
									input.checked=false;
								}
							}
						}
					}else{
						input.checked=false
					}
					break;
				case "radio":
					if(data){
						if(input.name in data){
							input.checked=data[input.name]==input.value;
						}
					}else{
						input.checked=false
					}
					break;
				default:
					if(data){
						if(input.name in data){
							input.value=data[input.name];
						}
					}else{
						input.value="";
					}
			}
		}
	}
};
Sky.clearFormData=function(form){
	if(Sky.isString(form)){
		form=document.forms[form];
	}
	if(form.tagName.toUpperCase()!="FORM"){
		throw "form is not exit";
	}
	for(var i=0; i<form.length; i++){
		var input=form[i];
		switch (input.type) {
			case "checkbox":
			case "radio":
				input.checked=false;
				break;
			default:
				input.value="";
		}
	}
};

var define,require;
(function(window){
	Sky.Module=Module;
	var commentRegExp=/\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/mg;
	var cjsRequireRegExp=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g;
	var STATUS={
		INITED:0,//初始化
		LOADING:1,//正在加载script
		DEFINED:2,//已定义
		DEPENDING:3,//正在加载依赖
		COMPLETE:4//完成
	};
	var libs=new Map();
	var cache=new Map();
	var config=new Map();

	var paths=new Map();
	var map=new Map();
	var baseUrl=location.href;
	var urlArgs="";
	var pkgs=[];
	var rules=[];
	var hooks=[];
	var shim={};
	function Module(name){
		this.status=STATUS.INITED;
		this.name=name;
		var me=this;
		this.promise=new Promise(function(resolve, reject){
			var delay=null;
			me.resolve=function(exports){
				if(exports!==void 0){
					me.exports=exports;
				}
				var pluginResolve=function(exports){
					me.status=STATUS.COMPLETE;
					resolve(exports);
				};
				var i=hooks.length;
				while(i-->0){
					var hook=hooks[i];
					var r=hook.call(this,pluginResolve,reject);
					if(r===false){
						return false;
					}
				}
				if(delay){
					delay(pluginResolve, reject);
				}else{
					me.status=STATUS.COMPLETE;
					resolve(me.exports);
				}
			};
			me.reject=reject;
			me.delay=function(fn){
				delay=fn;
			};
		});
	}
	/*
	全局变量中的require
	 */
	require=function(deps,callback,onerror){
		var from=this;
		if(from==window){
			from=new Module(null);
			from.script=Sky.getCurrentScript();
		}
		if(!from.dependencies){
			from.dependencies=new Array();
		}
		if(Array.isArray(deps)){
			var modules=new Array();//需要加载JS文件的模块
			var promises=new Array(deps.length);
			for(var i=0;i<deps.length;i++){
				var dep=deps[i];
				switch(dep){
					case 'require':
						promises[i]=Promise.resolve(require.bind(from));
						break;
					case 'exports':
						promises[i]=Promise.resolve(from.exports=new Object());
						break;
					case 'module':
						promises[i]=Promise.resolve(from);
						break;
					default:
						var module;
						var arr=dep.split("!");
						if(arr.length==2){
							module=nameToModule(arr[0],from);
							promises[i]=module.promise.then(function(plugin){
								return new Promise(function(resolve, reject){
									plugin.load(arr[0], require.bind(module), resolve);
								});
							});
						}else{
							module=nameToModule(dep,from);
							promises[i]=module.promise;
						}
						if(module.status<=STATUS.LOADING){
							modules.push(module);
						}else if(module.status==STATUS.DEFINED){
							module.load();//加载依赖
						}
						from.dependencies.push(module);
				}
			}
			Promise.all(promises).then(function(data){
				callback && callback.apply(from,data);
			},function(e){
				onerror && onerror.call(from,e);
			});
			loadModelesScript(modules);
			checkCircular(from);//检测循环依赖
			return from;
		}else{
			var name=deps;
			var module=nameToModule(name,from);
			if(module.status===STATUS.COMPLETE){
				return module.exports;
			}else if(module.status===STATUS.DEFINED){
				return module.loadSync();
			}
			throw new Error("module("+name+") must loaded before");
		}
	};
	/**
	 * 根据字符串查找模块
	 * */
	function nameToModule(name,from){
		var module,url;
		if(name.startsWith("//") || name.match(/^\w+:/) ){//模块名称是绝对路径
			url=new URL(name,baseUrl);
		}else{
			if(name.startsWith(".")){//模块名称是相对路径
				name=new URL(name,"http://localhost/"+from.name).pathname.replace("/","");
			}
			if(from){//优先查询同脚本模块
				if(from.script){
					if(from.script.modules){
						module=from.script.modules.find(findName,name);
						if(module){
							return module;
						}
					}
				}else{
					debugger ;
				}
			}
			//查询全局声明的模块
			module=cache.get(name);
			if(module){
				return module;
			}
			var pkg=checkPkgs(name);
			if(pkg){
				url=new URL(pkg,baseUrl);
			}else{
				//根据配置获取
				url=nameToURL(name,from);
				if(!url){
					url=new URL(name,baseUrl);
				}
			}
		}
		//TODO 非js模块
		//js模块
		if(!url.search){
			if(!url.pathname.endsWith(".js")){
				url.pathname+=".js";
			}
			if(urlArgs){
				url.search+="?"+urlArgs;
			}
		}else{
			if(urlArgs){
				url.search+="&"+urlArgs;
			}
		}
		var path=url.href;
		var script=libs.get(path);
		if(script){
			var lib=script.modules;
			if(lib.length==1){//匿名模块文件
				return lib[0];
			}
			module=lib.find(findName,name);
			if(module){
				cache.set(name,module);
				return module;
			}else{
				var requires=script.requires;
				if(requires){
					module=requires.find(findName,name);
					if(module){
						return module;
					}
					module=lib.find(findNoName,name);
					if(module){
						return module;
					}
					module=new Module(name);
					cache.set(name,module);
					module.src=path;
					module.script=script;
					module.status=STATUS.LOADING;
					requires.push(module);
					return module;
				}
				console.warn("module ["+name+"] not in js \""+path+"\"");
			}
		}else{
			module=new Module(name);
			cache.set(name,module);
			module.src=path;
			return module;
		}
	}
	function checkPkgs(name){
		var i=pkgs.length;
		while(i-->0){
			var pkg=pkgs[i];
			if(pkg==name){
				return pkg;
			}
			if(name.startsWith(pkg+"/")){
				return pkg;
			}
		}
		return false;
	}
	function nameToURL(name,from){
		var i=rules.length;
		while(i--){
			var rule=rules[i];
			var url=rule(name,from);
			if(url){
				return url;
			}
		}
		var path=paths.get(name);
		if(path){
			return new URL(path,baseUrl);
		}
		var fromPaths=map.get(from.name);
		if(fromPaths){
			path=fromPaths.get(name);
			if(path){
				return new URL(path,baseUrl);
			}
		}
		return null;
	}
	function findName(mod){
		return mod.name==this;
	}
	function findNoName(mod){
		return mod.name==null;
	}
	/**加载script */
	function loadModelesScript(modules){
		var libs=new Map();
		var i=modules.length;
		while(i-->0){
			var mod=modules[i];
			if(mod.status==STATUS.INITED){
				var lib=libs.get(mod.src);
				if(!lib){
					lib=new Array();
					libs.set(mod.src,lib);
				}
				lib.push(mod);
			}
		}
		libs.forEach(loadModelesScriptPath);
	}
	function loadModelesScriptPath(modules,src){
		var script=Sky.getScript(src,handleLast);
		libs.set(src,script);
		script.requires=modules;
		script.modules=[];
		script.onerror=handleError;
		var i=modules.length;
		while(i-->0){
			var mod=modules[i];
			mod.status=STATUS.LOADING;
			mod.script=script;
		}
	}
	function handleError(message,url,line){
		var requires=this.requires;
		requires.forEach(function(module){
			module.reject({'message':message,'url':url,'line':line});
		});
	}
	function handleLast(){
		var requires=this.requires;
		this.requires=null;
		var i=requires.length;
		while(i-->0){
			var module=requires[i];
			if(module.status<=STATUS.LOADING){
				useShim.call(this,module);
			}else if(module.status==STATUS.DEFINED){
				module.load();
			}
		}
	}
	function useShim(module){
		if(Object.prototype.hasOwnProperty.call(shim,module.name)){
			module.resolve(window[shim[module.name]]);
		}else{
			console.warn("No module found in script:"+this.src);
		}
	}
	Module.prototype.define=function(deps,initor){
		if(this.name){
			if(checkPkgs(this.name)){
				cache.set(this.name,this);
			}
		}
		this.script.modules.push(this);
		if(Sky.isFunction(initor)){
			this.initor=initor;
			this.deps=deps;
			this.status=STATUS.DEFINED;
		}else{
			this.resolve(initor);
		}
	};
	Module.prototype.config=function(){
		return config.get(this.name);
	};
	/*
	加载依赖
	 */
	Module.prototype.load=function(){
		if(this.deps && this.deps.length){
			this.status=STATUS.DEPENDING;//加载依赖
			require.call(this,this.deps,function(){
				this.resolve(this.initor.apply(this,arguments));
			},function(e){
				this.reject(e);
			});
		}else{
			this.resolve(this.initor());
		}
	};
	Module.prototype.loadSync=function(){
		var result;
		this.plugin=function(fn){
			throw "the module ["+this.name+"] has not been loaded yet";
		};
		if(this.deps && this.deps.length){
			var deps=this.deps.map(function(dep){
				return require.call(this,dep);
			},this);
			result=this.initor.apply(this,deps);
		}else{
			result=this.initor();
		}
		this.resolve(result);
		this.status=STATUS.COMPLETE;
		return this.exports;
	};
	Module.define=function(name,deps,initor){
		var module;
		var script=Sky.getCurrentScript();
		if(script.modules){
			var path=new URL(script.src,location).href;
			libs.set(path,script);
		}else{
			script.modules=new Array();
		}
		if(script.requires){
			var i=script.requires.length;
			while(i-->0){
				module=script.requires[i];
				if(module.status<=STATUS.LOADING){
					if(name==null || module.name==name){
						module.define(deps,initor);
						return ;
					}
				}
			}
		}
		module=new Module(name);
		cache.set(name,module);
		module.script=script;
		module.define(deps,initor);
	};
	/*
	 define(data);
	 define(initor);
	 define(deps,initor);
	 define(name,deps,initor);
	 */
	define=function(arg1,arg2,arg3){
		switch(arguments.length){
			case 1:
				if(Sky.isFunction(arg1)){
					var deps=new Array();
					switch(arg1.length){
						case 3:
							deps.unshift('module');
						case 2:
							deps.unshift('exports');
						case 1:
							deps.unshift('require');
							break ;
					}
					arg1.toString().replace(commentRegExp,commentReplace).replace(cjsRequireRegExp,function(match,dep){
						deps.push(dep);//CMD
					});
					Module.define(null,deps,arg1);
				}else{
					Module.define(null,null,arg1);
				}
				break;
			case 2:
				Module.define(null,arg1,arg2);
				break;
			case 3:
				Module.define(arg1,arg2,arg3);
		}
	};
	function checkCircular(module){
		if(module.dependencies.length){
			var stack=new Array();
			stack.push(module);
			return checkCircularSub(module,stack);
		}
	}
	function checkCircularSub(module,stack){
		var i=module.dependencies.length
		stack.push(module);
		while(i-->0){
			var mod=module.dependencies[i];
			if(stack.includes(mod)){
				var j=stack.length;
				while(j-->0){
					m=stack[j];
					if('exports' in m){
						m.resolve(m.exports);
						m.status=STATUS.COMPLETE;
						return ;
					}
				}
				console.error("circular dependency found,should use exports");
				return ;
			}
			if(mod.dependencies && mod.STATUS!=STATUS.COMPLETE){
				stack.push(mod);
				checkCircularSub(mod,stack);
				stack.pop();
			}
		}
	}
	function commentReplace(match, singlePrefix) {
		return singlePrefix || '';
	}
	require.path=function(rule){
		rules.push(rule);
	};
	require.complete=function(hook){
		hooks.push(hook);
	};
	require.config=function(options){
		Sky.forOwn(options.paths,function(value,key){
			paths.set(key,value);
		});
		Sky.forOwn(options.bundles,function(names,path){
			if(names.forEach){
				names.forEach(function(name){
					paths.set(name,path);
				});
			}
		});
		Sky.forOwn(options.map,function(paths,formPath){
			var pathMap=map.get(formPath);
			if(!pathMap){
				pathMap=new Map();
				map.set(formPath,pathMap);
			}
			paths.forEach(function(path,name){
				pathMap.set(name,path);
			});
		});
		Sky.forOwn(options.config,function(value,key){
			config.set(key,value);
		});
		if(options.baseUrl){
			baseUrl=options.baseUrl;
		}
		if(options.urlArgs){
			urlArgs=options.urlArgs;
		}
		if(options.pkgs){
			var i=options.pkgs.length;
			while(i-->0){
				var pkg=options.pkgs[i];
				if(!pkgs.includes(pkg)){
					pkgs.push(pkg);
				}
			}
		}
	};
	define.amd=true;
})(this);