
import {Icon} from "ting/icon";
import {bindComponentEvent} from "ting/utils";
import {Component} from "react";

import * as React from "react";
import * as ReactDOM from "react-dom";

export interface ButtonProps extends ButtonStates{
	type?:"button"|"submit",
	onClick?:(e?:MouseEvent,btn?:Button)=>boolean|void,
	[key:string]:any
}
export interface ButtonStates{
	href?:string,
	theme?:"default"|"primary"|"success"|"info"|"warning"|"danger",
	disabled?:boolean,
	block?:boolean,
	size?:"xs"|"sm"|"lg"
}

export class Button extends Component <ButtonProps,ButtonStates>{
	constructor(props,context){
		super(props,context);
		this.state=Sky.pick(props, ['href','theme','disabled','block','size']);
	}
	renderAnchor(className:string,rest:any){
		var children=this.props.children;
		if(!rest.href){
			rest.href="javascript:void 0";
		}
		if(this.props.icon){
			className+=" btn-multiple";
			children=btnIconChildren(this.props.icon,this.state.size,children)
		}
		return <a className={className} {...rest}>{children}</a>;
	}
	renderButton(className:string,rest:object){
		var children=this.props.children;
		if(this.props.icon){
			className+=" btn-multiple";
			children=btnIconChildren(this.props.icon,this.state.size,children)
		}
		return <button type="button" className={className} {...rest}>{children}</button>;
	}
	render(){
		var attrs=Sky.omit(this.props,['block','size','theme']);
		attrs.href=this.state.href;
		attrs.disabled=this.state.disabled;
		var {href,theme,disabled,block,size}=this.state;
		var className="btn"
		if(theme){
			className+=" btn-"+theme;
		}else{
			className+=" btn-default";
		}
		if(block){
			className+=" btn-block";
		}
		if(size){
			className+=" btn-"+size;
		}
		if(disabled){
			className+=" btn-disabled";
		}
		for(var key in attrs){
			if(key.startsWith("on")){
				attrs[key]=bindComponentEvent(this,attrs[key]);
			}
		}
		switch(attrs.type){
			case "button":
			case "submit":
				return this.renderButton(className,attrs);
			default:
				return this.renderAnchor(className,attrs);
		}
	}
}
function btnIconChildren(icon,btnSize,children){
	var size;
	switch(btnSize){
		case "lg":
		size=20;
		break;
		case "sm":
		size=14;
		case "xs":
		size=12;
		default:
		size=16;
	}
	return <React.Fragment>
		<Icon size={size}>{icon}</Icon>
		<span className="btn-label">{children}</span>
	</React.Fragment>;
}
export class ButtonGroup extends Component{
	render(){
		return <div className="btn-group">{this.props.children}</div>;
	}
}
export class ButtonToolbar extends Component{
	render(){
		return <div className="btn-toolbar">{this.props.children}</div>;
	}
}