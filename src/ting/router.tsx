
import {Component} from "react";
import * as React from "react";
import * as ReactDOM from "react-dom";

var routers:Set<Route>=new Set();

export interface IProps{
	path?:string,
	location?:string,
	component?:React.ComponentType<any>,
	require?:string,
	export?:string
};
export interface IStates{
	currentPath?:string,
	component?:React.ComponentType<any>
}

export class Route extends Component<IProps,IStates>{
	private location:string;
	private isLoading:boolean;
	constructor(props:IProps,context){
		if(props.location==void 0){
			props.location="";
		}
		if(props.path==void 0){
			props.path="";
		}
		super(props,context);
		this.checkChild(this.props.children,props.location+props.path);
		this.isLoading=false;
	}
	componentWillUnmount(){
		routers.delete(this);
	}
	componentWillMount(){
		routers.add(this);
	}
	render(){
		var curPath;
		if(this.state && this.state.currentPath!=void 0){
			curPath=this.state.currentPath;
		}else{
			curPath=currentPath();
		}
		var mypath=this.props.location+this.props.path;
		if((curPath+"/").startsWith(mypath+"/")){
			if(this.props.component){
				return React.createElement(this.props.component, this.props, this.props.children);
			}else if(this.state && this.state.component){
				return React.createElement(this.state.component, this.props, this.props.children);
			}else if(this.props.require && !this.isLoading){
				this.isLoading=true;
				var me=this;
				window.require([this.props.require],function(module){
					me.setState({component:module});
				});
			}
			return this.props.children;
		}
		return null;
	}
	checkChild(children,location){
		children.forEach && children.forEach(function(child){
			if(child.props){
				if(child.type===Route){
					child.props.location=location;
				}else{
					this.checkChild(child.props.children,location);
				}
			}
		},this);
	}
}
export class Link extends Component<{to:string},any>{
	render(){
		var {to,...rest}=this.props;
		if('onhashchange' in window){
			return <a href={"#"+to} {...rest}/>;
		}
		return <a href={"#"+to} {...rest} onClick={linkClickHandle}/>;
	}
}
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
if('onhashchange' in window){
	window.onload=window.onhashchange=function(){
		detach(currentPath());
	};
}
function detach(path){
	routers.forEach(function(router){
		router.setState({currentPath:path});
	});
}
import('ting').then(function(moment) {
    console.log(moment);
  })