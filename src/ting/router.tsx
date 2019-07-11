
import {Component} from "react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as anu from "anu";

interface MatchResult{
	/**返回URL中匹配部分的字符串。用于创建嵌套的<Link>很有用 */
	url:string,
	/**用于匹配路径模式。用来创建嵌套的<Route> */
	path:string,
	/**返回布尔值，如果准确（没有任何多余字符）匹配则返回true。*/
	isExact:boolean,
	location:string,
	/** 返回一个对象包含Path-to-RegExp包从URL解析的键值对 */
	params?:Map<string,string>
}
var RouterContext=React.createContext({
	history:"hashHistory",
	location:"",
	currentPath:"",
	router:null as MemoryRouter
});

export class MemoryRouter extends Component<{},{currentPath:string}>{
	constructor(props,context){
		super(props,context);
		this.state={
			currentPath:""
		};
	}
	render(){
		var context={
			history:'memoryHistory',
			location:"",
			currentPath:"",
			router:this
		};
		return <RouterContext.Provider value={context}>{this.props.children}</RouterContext.Provider>;
	}
}
export class BrowserRouter extends Component<{},{currentPath:string}>{
	constructor(props,context){
		super(props,context);
		this.state={
			currentPath:location.pathname
		};
	}
	render(){
		var context={
			history:'browserHistory',
			location:"",
			currentPath:this.state.currentPath,
			router:this
		};
		return <RouterContext.Provider value={context}>{this.props.children}</RouterContext.Provider>;
	}
}
export class HashRouter extends Component<{},{currentPath:string}>{
	constructor(props,context){
		super(props,context);
		this.state={
			currentPath:currentPath()
		};
	}
	componentWillUnmount(){
		routers.delete(this);
	}
	componentWillMount(){
		routers.add(this);
	}
	render(){
		var context={
			history:'hashHistory',
			location:"",
			currentPath:this.state.currentPath,
			router:this
		};
		return <RouterContext.Provider value={context}>{this.props.children}</RouterContext.Provider>;
	}
}
export interface RouteProps{
	path?:string,
	exact?:boolean,
	component?:React.ComponentType<any>,
	[key:string]:any
};
export class Route extends Component<RouteProps,{}>{
	static defaultProps={ 
		path:""
	}
	render(){
		return <RouterContext.Consumer>
			{renderRoute.bind(this)}
		</RouterContext.Consumer>;
	}
}
export class IndexRoute extends Component<RouteProps,{}>{
	static defaultProps={ 
		path:""
	}
	render(){
		var me=this;
		return <RouterContext.Consumer>
			{renderIndexRoute.bind(this)}
		</RouterContext.Consumer>;
	}
}
function renderRoute(context){
	var mypath=context.location+this.props.path;
	var curPath=context.currentPath;
	var match=checkPath(mypath,curPath,this.props.exact);
	if(match){
		return renderRouteMatch.call(this,context,match);
	}
	return null;
}
function renderIndexRoute(context){
	var mypath=context.location+this.props.path;
	var curPath=context.currentPath;
	var match=checkPath(mypath,curPath,this.props.exact);
	if((context.location+"/").startsWith(context.currentPath+"/") || match){
		return renderRouteMatch.call(this,context,match);
	}
	return null;
}
function renderRouteMatch(context,match:MatchResult){
	var sub=Object.assign({},context);
	if(this.props.path){
		var url=new URL(match?match.location:(context.location)+this.props.path,"http://localhost"+context.location);
		sub.location=url.pathname;
	}else{
		sub.location=context.location;
	}
	if(this.props.component){
		var props:any=new Object();
		props.match=match;
		Object.assign(props,this.props);
		return <RouterContext.Provider value={sub}>{React.createElement(this.props.component, props, this.props.children)}</RouterContext.Provider>;
	}
	return <RouterContext.Provider value={sub}>{this.props.children}</RouterContext.Provider>;
}
export class Switch extends Component<{},{}>{
	render(){
		var me=this;
		return <RouterContext.Consumer>
			{function(context){
				var children=me.props.children;
				if(Array.isArray(children)){
					var result=null;
					for(var i=0;i<children.length;i++){
						var child:any=children[i];
						if(child.type===IndexRoute){
							result=renderIndexRoute.call(child,context);
						}else if(child.type===Route){
							result=renderRoute.call(child,context);
						}else{
							continue ;
						}
						if(result){
							return result;
						}
					}
				}
				return null;
			}}
		</RouterContext.Consumer>;
	}
}

export class NavLink extends Component<{
	to:string,
	activeClassName?:string,
	exact?:boolean,
	className?:string,
	[key:string]:any
},any>{
	static defaultProps={ 
		className:"",
		activeClassName:""
	}
	render(){
		var me=this;
		var {to,activeClassName,exact,className,...rest}=this.props;
		return <RouterContext.Consumer>
			{function(context){
				var mypath=context.location+me.props.path;
				if(checkPath(mypath,context.currentPath,me.props.exact)){
					className+=" "+activeClassName;
				}
				return <Link to={me.props.to} className={className}>{me.props.children}</Link>;
			}}
		</RouterContext.Consumer>;
	}
}
export class NavItem extends Component<{
	path?:string,
	activeClassName?:string,
	exact?:boolean,
	className?:string,
	index?:boolean
},any>{
	static defaultProps={ 
		className:"",
		activeClassName:""
	}
	render(){
		var me=this;
		var {activeClassName,exact,index}=this.props;
		return <RouterContext.Consumer>
			{function(context){
				var is
				var mypath=context.location+me.props.path;
				var children:any=me.props.children;
				if(checkIndexPath(mypath,context.currentPath,exact,index)){
					if(children && children.props){
						var className=children.props.className;
						if(className){
							children.props.className+=" "+activeClassName;
						}else{
							children.props.className=activeClassName;
						}
					}
				}
				return children;
			}}
		</RouterContext.Consumer>;
	}
}
export class Link extends Component<{to:string,[key:string]:any},any>{
	render(){
		var {to,...rest}=this.props;
		return <RouterContext.Consumer>
			{function(context){
				var url=new URL(to,"http://localhost"+context.location+"/");
				var path=url.pathname;
				switch(context.history){
					case "memoryHistory":
						return <a href="javascript:void 0" {...rest} onClick={callLinkClickHandleByMemory(path,context)}/>;
					case "browserHistory":
						return <a href={path} {...rest}/>;
				}
				if(context.history=="hashHistory"){
					if('onhashchange' in window){
						return <a href={"#"+path} {...rest}/>;
					}
				}
				return <a href={"#"+path} {...rest} onClick={linkClickHandleByHash}/>;
			}}
		</RouterContext.Consumer>;
	}
}
function checkIndexPath(mypath:string,curPath:string,exact:boolean,index:boolean):boolean{
	var params:Map<string,string>;
	if(index){
		if((mypath+"/").startsWith(curPath+"/")){
			return true;
		}
	}
	if(checkPath(mypath,curPath,exact)){
		return true;
	}
	return false;
}
function checkPath(mypath:string,curPath:string,exact:boolean):MatchResult{
	var params:Map<string,string>;
	var r=mypath.match(/:([a-zA-Z0-9]+)/),r2;
	var location=mypath;
	if(r){
		var ppath="^"+Sky.escapeRegExp(mypath).replace(/:([a-zA-Z0-9]+)/,"([a-zA-Z0-9]+)");
		if(exact){
			ppath+="$";
		}
		var p=new RegExp(ppath);
		r2=curPath.match(p);
		if(r2){
			if(!params){
				params=new Map<string,string>();
			}
			var i=r.length;
			while(i-->1){
				params.set(r[i],r2[i]);
			}
			location=r2[0];
		}
	}
	if(!r || !r2){
		if(exact){
			if(curPath!==mypath){
				return null;
			}
		}else{
			if(!(curPath+"/").startsWith(mypath+"/")){
				return null;
			}
		}
	}
	return {
		url:curPath,
		path:mypath,
		isExact:exact,
		location:location,
		params:params
	};
}
var routers:Set<HashRouter>=new Set();
function currentPath(){
	var path=location.hash.replace(/^#/,"");
	return path;
}
function navigate(path:string){
	location.href="#"+path;
	if(!('onhashchange' in window)){
		detach(path);
	}
}
function linkClickHandleByHash(e:React.MouseEvent<HTMLAnchorElement>){
	var target=e.currentTarget;
	detach(target.href.replace(/^[^#]*#/,""));
}
function callLinkClickHandleByMemory(path:string,context:any){
	return function(e:React.MouseEvent<HTMLAnchorElement>){
		detach(context.router.setState({currentPath:path}));
		e.preventDefault();
		return false;
	};
}
function onhashchange(){
	detach(currentPath());
}
if('onhashchange' in window){
	Sky.ready().then(onhashchange);
	if(Sky.browser.quirks){
		var oldHash=location.hash;
		setInterval(function(){
			var hash=location.hash;
			if(oldHash!==hash){
				oldHash=hash;
				detach(currentPath());
			}
		},100);
	}else{
		anu.eventSystem.addEvent(window,'hashchange',onhashchange);
	}
}
function detach(path){
	routers.forEach(function(router){
		router.setState({currentPath:path});
	});
}