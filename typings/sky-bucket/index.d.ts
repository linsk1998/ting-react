
interface Set<T>{
	/**
	 * 转化为数组
	 */
	toArray():Array<T>;
	/**
	 * 添加多个元素
	 * @param arr 要添加的元素
	 */
	addAll(arr:Array<T>):Set<T>;
	/**
	 * 移除多个元素
	 * @param arr 要移除的元素
	 */
	removeAll(arr:Array<T>):Set<T>;
	/**
	 * 保留元素其他都删了
	 * @param arr 要保留的元素
	 */
	retainAll(arr:Array<T>):Set<T>;
}
declare namespace Sky{
	function forIn(obj:object,callback:(value:any,key:string)=>void,thisArg?:any):void;
	function forOwn(obj:object,callback:(value:any,key:string)=>void,thisArg?:any):void;
	function ajax(settings:{
		url:string,
		type?:string,
		data?:any,
		success?:(data:any)=>void,
		error?:(data:string)=>void,
		dataType:string,
		complete:(data:any)=>void,
		timeout:number,
		async:boolean,
		contentType:string
	});
	function get(URL:string,success:(data:any)=>void,dataType:string);
	function post(URL:string,data:any,success:(data:any)=>void,dataType:string);
	function getJSONP(URL:string,success:(data:any)=>void);
	function getScript(URL:string,success:()=>void,charset?:string):HTMLScriptElement;
	var isReady:boolean;
	function ready(callback?:()=>void):Promise<void>;
	var browser:{
		android:boolean,
		chrome:boolean,
		firefox:boolean,
		ie5:boolean,
		ie6:boolean,
		ie7:boolean,
		ie8:boolean,
		ie9:boolean,
		ie10:boolean,
		ie11:boolean,
		ios:boolean,
		mobile:boolean,
		msie:boolean,
		opera:boolean,
		quirks:boolean,
		safari:boolean,
		version:string,
		webkit:boolean
	};
	var support:{
		DOMParser:boolean,
		JSON:boolean,
		URL:boolean,
		VBScript:boolean,
		XMLHttpRequest:boolean,
		defineProperty:boolean,
		getCurrentPath:boolean,
		getCurrentScript:boolean,
		localStorage:boolean,
		sessionStorage:boolean,
		html5Styles:boolean,
		unknownElements:boolean
	};
	function getCookie(key:string,value:string):void;
	function setCookie(key:string,value:string,timeout?:number,path?:string,domain?:string):void;
	function clearSelect():void;
	function addFavorite(url:string,siteName:string):void;
	function setHome(a:HTMLAnchorElement,url:string):void;
	function copyToClipboard(text:string):void;
	function pad(value:string,length:number):string;
	function escape(value:string):string;
	function unescape(value:string):string;
	function escapeString(value:string):string;
	function escapeRegExp(value:string):string;
	function strlen(value:string):number;
	function trunc(value:string,length:number):string;
	function buildQuery(params:object):String;

	function findIndex(arr:Array<object>,key:string,value:any):number;
	function findLastIndex(arr:Array<object>,key:string,value:any):number;
	function find(arr:Array<object>,key:string,value:any):any;
	function findLast(arr:Array<object>,key:string,value:any):any;
	function shuffle(arr:Array<any>):Array<any>;
	function sortBy(arr:Array<object>,key:string):Array<any>;
	function pluck(arr:Array<object>,key:string):Array<any>;
	function sortedIndex(arr:Array<object>,value:any):number;
	function sortedLastIndex(arr:Array<object>,value:any):number;
	function times(t:number,callback:()=>void);

	function round(n:number, t?:number):number;
	function ceil(n:number, t?:number):number;
	function floor(n:number, t?:number):number;
	function random(n:number, t?:number):number;

	function byId(id:string):HTMLElement;
	function getCurrentScript():HTMLScriptElement;
	function getCurrentPath():string;
	function getElementStyle(name:string):string;
	function hasClass(ele:HTMLElement,className:string):boolean;
	function addClass(ele:HTMLElement,className:string):void;
	function removeClass(ele:HTMLElement,className:string):void;
	function toggleClass(ele:HTMLElement,className:string):void;
	function getPrevElement(ele:HTMLElement):HTMLElement;
	function getNextElement(ele:HTMLElement):HTMLElement;
	function getPageLeft(ele:HTMLElement):number;
	function getPageTop(ele:HTMLElement):number;
	function getFormData(form:HTMLFormElement):object;
	function setFormData(form:HTMLFormElement,data:object);
	function destroy(ele:HTMLElement):void;

	function getElementsByClassName(className:string,parent?:HTMLElement):Array<HTMLElement>;
	function matchesSelector(ele:HTMLElement,selector:string,ancestor?:HTMLElement):boolean;
	function querySelector(selector:string,ancestor?:HTMLElement):Array<HTMLElement>;

	function addEvent(ele:HTMLElement,event:string,callback?:Function);
	function removeEvent(ele:HTMLElement,event?:string,callback?:Function);
	function delegate(ele:HTMLElement,selector:string,event:string,callback?:Function);
	function undelegate(ele:HTMLElement,selector:string,event?:string,callback?:Function);
}

declare class SkyBatch{
	[index:number]:HTMLElement;
	length:number;

	hasClass(className:string):boolean;
	addClass(classNames:string):SkyBatch;
	removeClass(className:string):SkyBatch;
	toggleClass(className:string):SkyBatch;
	attr(attributeName:string,value:any): SkyBatch;
	attr(map:{[key:string]:string;}):SkyBatch;
	removeAttr(attributeName:string):SkyBatch;


	text(textString:string):SkyBatch;
	text(): string;
	html(htmlString:string):SkyBatch;
	html():string;

	prop(propertyName:string):any;
	prop(propertyName: string, value: any):SkyBatch;
	prop(map: any):SkyBatch;
	removeProp(propertyName:string):SkyBatch;


	val():string;
	val(value:string):SkyBatch;

	/***
	 CSS
	****/
	css(propertyName:string, value?: any);
	css(cssText:string, value?: any);
	css(map:{[key:string]:string;});

	hide():SkyBatch;
	show():SkyBatch;

	/******
	 EVENTS
	*******/
	bind(eventType:string,handler:(eventObject:Event)=>boolean):SkyBatch;
	unbind(eventType:string,handler?:(eventObject:Event)=>boolean):SkyBatch;
	on(eventType:string,handler:(eventObject:Event)=>boolean):SkyBatch;
	off(eventType:string,handler?:(eventObject:Event)=>boolean):SkyBatch;
	delegate(selector:any,eventType:string,handler:(eventObject:Event)=>boolean):SkyBatch;
	undelegate(selector:any,eventType?:string,handler?:(eventObject:Event)=>boolean):SkyBatch;

	click(handler:(eventObject:MouseEvent)=>boolean):SkyBatch;
	click():SkyBatch;
	mouseleave(handler:(eventObject:MouseEvent)=>boolean):SkyBatch;
	mouseenter(handler:(eventObject:MouseEvent)=>boolean):SkyBatch;
	trigger(eventType:string):SkyBatch;

	/************
	MANIPULATION
	*************/
	after(...content:any[]):SkyBatch;
	append(...content:any[]):SkyBatch;
	before(...content:any[]):SkyBatch;
	prepend(...content:any[]):SkyBatch;



	empty():SkyBatch;
	prependTo(target:SkyBatch):SkyBatch;
	prependTo(target:HTMLElement):SkyBatch;

	remove(selector?:string):SkyBatch;
	destroy(selector?:string):SkyBatch;


	each(func:(index:any,elem:Element)=>SkyBatch);
	children(selector?:string):SkyBatch;
	filter(selector:string):SkyBatch;

	find(selector:string):SkyBatch;
	next(selector?:string):SkyBatch;

	nextAll(selector?:string):SkyBatch;
	not(selector:string):SkyBatch;
	parent(selector?:string):SkyBatch;
	parents(selector?:string):SkyBatch;
	parentsUntil(selector?:string):SkyBatch;
	prev(selector?:string):SkyBatch;
	prevAll(selector?:string):SkyBatch;
	siblings(selector?:string):SkyBatch;
	static ele(ele:HTMLElement):SkyBatch;
	static ele(doc:HTMLDocument):SkyBatch;
	static query(selector:string):SkyBatch;
	static create(selector:string):SkyBatch;
}
declare function $(ready:Function):void;
declare function $(selector:string):SkyBatch;
declare function $(selector:string,HTMLElement):SkyBatch;
declare function $(selector:string,HTMLDocument):SkyBatch;

declare class EventEmitter{
	_events:Array<any>;
	constructor()
	on(event:string,callback:Function);
	on(event:string,callback:Function,after:boolean);
	off(event:string,callback?:Function);
	emit(event:string):boolean;
	emit(event:string,after:boolean):boolean;
	emit(event:string,after:boolean,args:Array<any>):boolean;
	emit(event:string,args:Array<any>):boolean;
}
declare function define(name:string,deps:string[],initor:Function);
declare function require(deps:string[],callBack:Function);
declare function require(dep:string):any;
declare namespace ${
	function ele(ele:HTMLElement):SkyBatch;
	function ele(doc:HTMLDocument):SkyBatch;
	function query(selector:string):SkyBatch;
	function create(selector:string):SkyBatch;
}
interface Window {
	require(deps:string[],callBack:Function);
}
