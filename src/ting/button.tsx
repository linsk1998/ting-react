
import {Component} from "react";

import * as React from "react";
import * as ReactDOM from "react-dom";

export interface ButtonProps{
	type?:string,
	disabled?:boolean,
	block?:boolean,
	size?:string,
	onClick?:React.MouseEventHandler<HTMLButtonElement>,
	[key:string]:any
};
export interface ButtonStates{}

export class Button extends Component <ButtonProps,ButtonStates>{

	renderAnchor(className:string,rest:object){
		return <a className={className} {...rest}>{this.props.children}</a>;
	}
	renderButton(className:string,rest:object){
		return <button type="button" className={className} {...rest}>{this.props.children}</button>;
	}
	render(){
		var {type,block,size,...rest}=this.props;
		var className="btn"
		if(type){
			className+=" btn-"+type;
		}else{
			className+=" btn-default";
		}
		if(block){
			className+=" btn-block";
		}
		if(size){
			className+=" btn-"+size;
		}
		if(this.props.disabled){
			className+=" btn-disabled";
		}
		if(rest.href){
			return this.renderAnchor(className,rest);
		}else{
			return this.renderButton(className,rest);
		}
	}
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