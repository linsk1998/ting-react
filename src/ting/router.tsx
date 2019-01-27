
import {Component} from "react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as anu from "anu";


var RouterContext=React.createContext({
	history:"hashHistory",
	location:"",
	currentPath:""
});

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
			currentPath:this.state.currentPath
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
		var me=this;
		return <RouterContext.Consumer>
			{function(context){
				var curPath=context.currentPath;
				var mypath=context.location+me.props.path;
				if(me.props.exact && curPath===mypath || (curPath+"/").startsWith(mypath+"/") && !me.props.exact){
					if(me.props.component){
						return React.createElement(me.props.component, me.props, me.props.children);
					}
					return me.props.children;
				}
				return null;
			}}
		</RouterContext.Consumer>;
	}
}
export class Link extends Component<{to:string,[key:string]:any},any>{
	render(){
		var {to,...rest}=this.props;
		return <RouterContext.Consumer>
			{function(context){
				if('onhashchange' in window){
					return <a href={"#"+to} {...rest}/>;
				}
				return <a href={"#"+to} {...rest} onClick={linkClickHandle}/>;
			}}
		</RouterContext.Consumer>;
	}
}

var routers:Set<HashRouter>=new Set();
function currentPath(){
	var path=location.hash.replace(/^#/,"");
	return path;
}
export function navigate(path){
	location.href="#"+path;
	if(!('onhashchange' in window)){
		detach(path);
	}
}
export function linkClickHandle(e){
	var target=e.currentTarget as HTMLAnchorElement;
	detach(target.href.replace(/^[^#]*#/,""));
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