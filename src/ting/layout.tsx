
import * as React from "react";
import * as ReactDOM from "react-dom";

var style=document.head.style;
export var supportFlex:boolean="order" in style || "msFlexOrder" in style || "webkitBoxOrdinalGroup" in style;// || "MozBoxOrdinalGroup" in style;
export var isQuirks:boolean=Sky.browser.quirks;

export const enum POSITION { LEFT=0, RIGHT=1, TOP=2, BUTTON=3};
export const enum DIRCTION { H=1, V=2};
export const enum LAYOUT { FLEX=1, TABLE=2, NONE=0};

export interface ContentProps{
	className?:string,
}
export interface SiderProps{
	width?:number,
	className?:string,
}
export interface VShrinkProps{
	height?:number,
	className?:string
}
export interface LayoutProps{
	height?:number | string,
	className?:string
};

export class Layout extends React.Component<LayoutProps,{}>{
	static defaultProps = { 
		className:""
	}
	render(){
		var children=this.props.children;
		if(Array.isArray(children)){
			var dir:DIRCTION;
			var i=children.length;
			while(i-->0){
				var child:any=children[i];
				if(child.type==Header || child.type==Footer){
					dir=DIRCTION.V;
					return <VGroup {...this.props}>{this.props.children}</VGroup>;
				}else if(child.type==Sider){
					dir=DIRCTION.H;
					return <HGroup {...this.props}>{this.props.children}</HGroup>;
				}
			}
		}
		return <div>{children}</div>;
	}
}
export class VGroup extends React.Component<LayoutProps,{}>{
	static defaultProps = { 
		className:""
	}
	render(){
		if(this.props.height!="auto"){
			if(supportFlex){
				return this.renderFlex();
			}else if(isQuirks){
				return this.renderTableQuirks();
			}
		}
		return this.renderDiv();
	}
	renderFlex(){
		var className=this.props.className+" col-flex";
		var children=this.props.children;
		if(Array.isArray(children)){
			children=children.map(childrenToFlexV,this);
		}
		var style:any={};
		var height=this.props.height;
		if(height){
			if(isNaN(height)){
				style.height=height;
			}else{
				style.height=height+"px";
			}
		}else{
			className+=" layout-full";
		}
		return <div className={className} style={style}>{children}</div>;
	}
	renderTableQuirks(){
		var children=this.props.children;
		var height=this.props.height;
		if(!height){
			height="100%";
		}
		var tableProps={
			width:"100%",height:height,
			border:0, cellSpacing:0, cellPadding:0,
			className:this.props.className
		};
		if(Array.isArray(children)){
			return React.createElement("table", tableProps, 
				React.createElement("tbody", null,
					children.map(childrenToTrQuirks,this)
				)
			);
		}else{
			return <div>{children}</div>;
		}
	}
	renderDiv(){
		var className=this.props.className;
		var children=this.props.children;
		if(Array.isArray(children)){
			children=children.map(childrenToDivV,this);
		}
		var style:any={};
		var height=this.props.height;
		if(height){
			if(isNaN(height)){
				style.height=height;
			}else{
				style.height=height+"px";
			}
		}
		return <div className={className} style={style}>{children}</div>;
	}
}
export class HGroup extends React.Component<LayoutProps,{}>{
	static defaultProps = { 
		className:""
	}
	render(){
		if(supportFlex){
			return this.renderFlex();
		}else if(isQuirks){
			if(this.props.height!="auto"){
				return this.renderTableQuirks();
			}
		}
		return this.renderTable();
	}
	renderFlex(){
		var className=this.props.className+" row-flex";
		var children=this.props.children;
		if(Array.isArray(children)){
			children=children.map(childrenToFlexH,this);
		}
		var height=this.props.height;
		var style:any={};
		if(height){
			if(isNaN(height)){
				style.height=height;
			}else{
				style.height=height+"px";
			}
		}else{
			className+=" layout-full";
		}
		return <div className={className} style={style}>{children}</div>;
	}
	renderTableQuirks(){
		var children=this.props.children;
		var height=this.props.height;
		if(!height){
			height="100%";
		}
		var tableProps={
			width:"100%",height:height,
			border:0, cellSpacing:0, cellPadding:0,
			className:"layout-table"
		};
		if(Array.isArray(children)){
			return React.createElement("table", tableProps, 
				React.createElement("tbody", null,
					React.createElement("tr", null,
						children.map(childrenToTdQuirks,this)
					)
				)
			);
		}else{
			return <div>{children}</div>;
		}
	}
	renderTable(){
		var children=this.props.children;
		var tableProps={
			width:"100%",height:this.props.height,
			border:0, cellSpacing:0, cellPadding:0,
			className:"layout-table"
		};
		if(Array.isArray(children)){
			return React.createElement("table", tableProps, 
				React.createElement("tbody", null,
					React.createElement("tr", null,
						children.map(childrenToTd,this)
					)
				)
			);
		}else{
			return <div>{children}</div>;
		}
	}
}
function childrenToTrQuirks(child){
	switch(child.type){
		case Layout:
		case Content:
			return <tr><td height="100%"><div className={child.props.className+" layout-vfull"}>{child}</div></td></tr>;
		default:
			var className=child.props.className;
			if(child.props.height){
				className+=" layout-vfull";
			}
			return <tr><td height={child.props.height}><div className={className}>{child}</div></td></tr>;
	}
}
function childrenToTdQuirks(child){
	switch(child.type){
		case Layout:
			return <td vAlign="top" width="100%">{child}</td>;
		case Content:
			return <td vAlign="top" width="100%"><div className={child.props.className+" layout-vfull"}>{child}</div></td>;
		default:
			var style;
			if(child.props.width){
				style={};
				if(isNaN(child.props.width)){
					style.width=child.props.width;
				}else{
					style.width=child.props.width+"px";
				}
			}
			return <td vAlign="top"><div style={style} className={child.props.className+" layout-vfull"}>{child}</div></td>;
	}
}
function childrenToTd(child){
	switch(child.type){
		case Layout:
			if(this.props.height=="auto"){
				child.props.height="auto";
			}
			return <td vAlign="top" width="100%">{child}</td>;
		case Content:
			return <td vAlign="top" width="100%" className={child.props.className}>{child}</td>;
		default:
			var style;
			var className=child.props.className;
			if(child.props.width){
				style={};
				if(isNaN(child.props.width)){
					style.width=child.props.width;
				}else{
					style.width=child.props.width+"px";
				}
			}
			return <td vAlign="top" className={className}><div style={style} className="layout-vfull">{child}</div></td>;
	}
}
function childrenToDivV(child){
	switch(child.type){
		case Layout:
			if(this.props.height=="auto"){
				child.props.height="auto";
			}
		case Content:
			return <div className={child.props.className}>{child}</div>;
		default:
			var style;
			if(child.props.height){
				style={height:child.props.height+"px"};
			}
			return <div className={child.props.className} style={style}>{child}</div>;
	}
}
function childrenToFlexV(child){
	switch(child.type){
		case Layout:
			child.props.className+=" row-fill";
			return child;
		case Content:
			return <div className={child.props.className+" row-fill"}>{child}</div>;
		default:
			var style;
			if(child.props.height){
				style={height:child.props.height+"px"};
			}
			return <div className={child.props.className+" row-fixed"} style={style}>{child}</div>;
	}
}
function childrenToFlexH(child){
	switch(child.type){
		case Layout:
			if(this.props.height=="auto"){
				child.props.height="auto";
			}
			child.props.className+=" col-center";
			return child;
		case Content:
			return <div className={child.props.className+" col-center"}>{child}</div>;
		default:
			var style;
			if(child.props.width){
				style={width:child.props.width+"px"};
			}
			return <div className={child.props.className+" col-sider"} style={style}>{child}</div>;
	}
}
export class Header extends React.Component<VShrinkProps,any>{
	static defaultProps = { 
		className:""
	}
	render(){
		return this.props.children;
	}
}
export var Footer=Header;
export class Sider extends React.Component<SiderProps,any>{
	static defaultProps = { 
		className:""
	}
	render(){
		return this.props.children;
	}
}
export class Content extends React.Component<ContentProps,any>{
	static defaultProps = { 
		className:""
	}
	render(){
		return this.props.children;
	}
}