
import * as React from "react";
import * as ReactDOM from "react-dom";

export interface HChildProps{
	width:number,
	className?:string
}
export interface VChildProps{
	height?:number,
	className?:string
}
export interface LayoutProps{
	full?:boolean,
	height?:number|string,
	className?:string,
	dirction?:number
};
export interface LayoutStates{}
export class Layout extends React.Component<LayoutProps,LayoutStates>{
	render(){
		var children=this.props.children;
		if(Array.isArray(children)){
			var i=children.length;
			while(i-->0){
				var child:any=children[i];
				if(child.type==Header){
					return <VGroup {...this.props}>{this.props.children}</VGroup>;
				}else if(child.type==Sider){
					return <HGroup {...this.props}>{this.props.children}</HGroup>;
				}
			}
		}
		return null;
	}
}
export class VGroup extends React.Component<LayoutProps,LayoutStates>{
	static defaultProps = { 
		className:""
	}
	renderTable(){
		var className=this.props.className;
		if(this.props.full){
			className+=" box-full";
		}
		var children=this.props.children;
		if(Array.isArray(children)){
			var i=children.length;
			while(i-->0){
				var child:any=children[i];
				switch(child.type){
					case Layout:
					case VGroup:
					case HGroup:
					case Content:
					child.props.dirction=2;
				}
			}
		}
		switch(this.props.dirction){
			case 1:
				return <td className={className+" layout-cell"}><table className="layout-table" width="100%" height="100%"><tbody>{children}</tbody></table></td>;
			case 2:
				return {children};
			default:
				return <table className={className+" row-fill layout-table"} width="100%" height={this.props.height}><tbody>{children}</tbody></table>;
		}
	}
	renderFlex(){
		var className=this.props.className+" col-flex";
		if(this.props.full){
			className+=" box-full";
		}else{
			className+=" flex";
		}
		var children=this.props.children;
		if(Array.isArray(children)){
			var i=children.length;
			while(i-->0){
				var child:any=children[i];
				switch(child.type){
					case Layout:
					case VGroup:
					case HGroup:
					case Content:
					child.props.dirction=2;
				}
			}
		}
		switch(this.props.dirction){
			case 1:
				className+=" row-center";
				break ;
			case 2:
				className+=" row-fill";
				break ;
		}
		var style:any={};
		var height=this.props.height;
		if(height){
			if(typeof height!=="number") height=height+"px";
			style.height=height;
		}
		return <div className={className} style={style}>{children}</div>;
	}
	render(){
		if(!Sky.browser.quirks){
			return this.renderFlex();
		}
		return this.renderTable();
	}
}
export class HGroup extends React.Component<LayoutProps,LayoutStates>{
	static defaultProps = { 
		className:""
	}
	renderTable(){
		var className=this.props.className;
		if(this.props.full){
			className+=" box-full";
		}else{
			className+=" flex";
		}
		var children=this.props.children;
		if(Array.isArray(children)){
			var i=children.length;
			while(i-->0){
				var child:any=children[i];
				switch(child.type){
					case Layout:
					case VGroup:
					case HGroup:
					case Content:
					child.props.dirction=1;
				}
			}
		}
		switch(this.props.dirction){
			case 1:
				return {children};
			case 2:
				if(!Sky.browser.quirks){
					return <div className={className+" row-fill"}><table className="layout-table" width="100%"><tbody><tr>{children}</tr></tbody></table></div>;
				}else{
					return <tr><td className={className+" layout-cell"} height="100%">
						<div className="box-full">
							<table className="layout-table" width="100%" height="100%"><tbody><tr>{children}</tr></tbody></table>
						</div>
					</td></tr>;
				}
			default:
				return <table className={className +" layout-table"} height={this.props.height}><tbody><tr>{children}</tr></tbody></table>;
		}
	}
	renderFlex(){
		var className=this.props.className+" row-flex";
		if(this.props.full){
			className+=" box-full";
		}else{
			className+=" flex";
		}
		var children=this.props.children;
		if(Array.isArray(children)){
			var i=children.length;
			while(i-->0){
				var child:any=children[i];
				switch(child.type){
					case Layout:
					case VGroup:
					case HGroup:
					case Content:
					child.props.dirction=1;
				}
			}
		}
		switch(this.props.dirction){
			case 1:
				className+=" col-center";
				break ;
			case 2:
				className+=" row-fill";
				break ;
		}
		var style:any={};
		var height=this.props.height;
		if(height){
			if(typeof height!=="number") height=height+"px";
			style.height=height;
		}
		return <div className={className} style={style}>{children}</div>;
	}
	render(){
		if('atob' in window){
			return this.renderFlex();
		}
		return this.renderTable();
	}
}
export class Header extends React.Component<VChildProps,any>{
	static defaultProps = { 
		className:""
	}
	renderTable(){
		return <tr>
			<td height={this.props.height} className={this.props.className+" layout-cell"}>{this.props.children}</td>
		</tr>;
	}
	renderFlex(){
		var style;
		if(this.props.height){
			style={height:this.props.height+"px"};
		}
		return <div className={"row-fixed "+this.props.className} style={style}>{this.props.children}</div>;
	}
	render(){
		if(!Sky.browser.quirks){
			return this.renderFlex();
		}
		return this.renderTable();
	}
}
export class Sider extends React.Component<HChildProps,any>{
	static defaultProps = { 
		className:""
	}
	renderTableQuirks(){
		var width=this.props.width;
		if(!width){ width=0;}
		return <td width={width} vAlign="top" className={"layout-cell "+this.props.className}><div className="box-full">{this.props.children}</div></td>;
	}
	renderTable(){
		return <td width={this.props.width} vAlign="top" className="layout-cell">{this.props.children}</td>;
	}
	renderFlex(){
		var style;
		if(this.props.width){
			style={width:this.props.width+"px"};
		}
		return <div className={"col-sider "+this.props.className} style={style}>{this.props.children}</div>;
	}
	render(){
		if('atob' in window){
			return this.renderFlex();
		}
		if(Sky.browser.quirks){
			return this.renderTableQuirks();
		}
		return this.renderTable();
	}
}

export class Content extends React.Component<LayoutProps,any>{
	constructor(props,context){
		if(props.className==null){ props.className="";}
		super(props,context);
	}
	renderTable(){
		return <td vAlign="top" className={this.props.className}>{this.props.children}</td>;
	}
	renderTableQuirks(){
		var className;
		switch(this.props.dirction){
			case 1:
				return <td vAlign="top" className="layout-cell"><div className={"box-full "+this.props.className}>{this.props.children}</div></td>;
			case 2:
				return <tr>
					<td vAlign="top" height="100%" className="layout-cell"><div className={"box-full "+this.props.className}>{this.props.children}</div></td>
				</tr>;
		}
	}
	renderFlex(){
		var className;
		switch(this.props.dirction){
			case 1:
				className="col-center "+this.props.className;
				break ;
			case 2:
				className="row-fill "+this.props.className;
				break ;
		}
		return <div className={className}>{this.props.children}</div>;
	}
	render(){
		if('atob' in window){
			return this.renderFlex();
		}
		if(Sky.browser.quirks){
			return this.renderTableQuirks();
		}
		if(this.props.dirction==1){
			return this.renderTable();
		}
		return this.renderFlex();
	}
}
export var Footer=Header;