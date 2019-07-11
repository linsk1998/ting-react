import {Component,CSSProperties} from "react";

import * as React from "react";
import * as ReactDOM from "react-dom";

var style=document.head.style;
var supportFlexWrap="flexWrap" in style || "msFlexWrap" in style || "webkitFlexGrow" in style;

export interface RowProps{
	cols?:number,
	gutter?:number,
}
export interface ColProps{
	span?:number
}

export class Row extends Component <RowProps,{}>{
	static defaultProps = { 
		gutter:0,
		cols:NaN
	}
	cols:number=NaN;
	constructor(props,context){
		super(props,context);
	}
	render(){
		if(supportFlexWrap){
			return this.renderFlex();
		}else if(Sky.browser.quirks){
			return this.renderBorder();
		}
		return this.renderInlineBlock();
	}
	renderFlex(){
		var style:any={};
		if(this.props.gutter){
			style.marginLeft=-this.props.gutter+"px";
		}
		var children=this.props.children;
		if(Array.isArray(children)){
			if(isNaN(this.props.cols)){
				this.cols=children.reduce(sumCol,0);
			}else{
				this.cols=this.props.cols;
			}
			children=children.map(childrenToFlex,this);
		}
		return <div className="flex flex-row flex-wrap" style={style}>{children}</div>;
	}
	renderInlineBlock(){
		var gutter=this.props.gutter;
		var children=this.props.children;
		var rowStyle:CSSProperties=null;
		if(gutter){
			rowStyle={
				marginLeft:-gutter+"px"
			};
		}
		var rows=[];
		if(Array.isArray(children)){
			if(isNaN(this.props.cols)){
				this.cols=children.reduce(sumCol,0);
			}else{
				this.cols=this.props.cols;
			}
			var colEle,cols=[];
			var rowEle=<div className="row-nowrap" style={rowStyle}>{cols}</div>;
			rows.push(rowEle);
			var i,curCount=0;
			for(i=0;i<children.length;i++){
				var child:any=children[i];
				var span=child.props.span;
				curCount=curCount+span;
				var colStyle:CSSProperties={};
				if(gutter){
					colStyle.borderLeftWidth=this.props.gutter+"px";
				}
				colStyle.width=span/this.cols*100+"%";
				colEle=<div className="col-inline" style={colStyle}>{child}</div>;
				cols.push(colEle);
				if(curCount+span>this.cols){
					curCount=0;
					cols=new Array();
					rowEle=<div className="row-nowrap" style={rowStyle}>{cols}</div>;
					rows.push(rowEle);
				}
			}
		}
		return <React.Fragment>{rows}</React.Fragment>;
	}
	renderBorder(){
		var gutter=this.props.gutter;
		var children=this.props.children;
		var rows=[];
		if(Array.isArray(children)){
			if(isNaN(this.props.cols)){
				this.cols=children.reduce(sumCol,0);
			}else{
				this.cols=this.props.cols;
			}
			var colEle,cols=[];
			var rowEle=<div className="row-nowrap">{cols}</div>;
			rows.push(rowEle);
			var i,curCount=0;
			for(i=0;i<children.length;i++){
				var child:any=children[i];
				var span=child.props.span;
				var colStyle:CSSProperties={};
				if(gutter){
					var d=gutter/this.cols;
					if(curCount>0){
						colStyle.borderLeftWidth=(-Math.round(-d*(this.cols-curCount-1)))+"px";
					}
					if(curCount+span<this.cols-1){
						colStyle.borderRightWidth=Math.round(d*(curCount+span+1))+"px";
					}
				}
				curCount=curCount+span;
				colStyle.width=span/this.cols*100+"%";
				colEle=<div className="col-inline" style={colStyle}>{child}</div>;
				cols.push(colEle);
				if(curCount+span>this.cols){
					curCount=0;
					cols=new Array();
					rowEle=<div className="row-nowrap">{cols}</div>;
					rows.push(rowEle);
				}
			}
		}
		return <React.Fragment>{rows}</React.Fragment>;
	}
	renderTable(){
		var children=[],els=this.props.children;
		var gutter=this.props.gutter;
		if(Array.isArray(els)){
			if(isNaN(this.props.cols)){
				this.cols=els.reduce(sumCol,0);
			}else{
				this.cols=this.props.cols;
			}
			var i;
			var ths=[],thEle;
			for(i=0;i<this.cols;i++){
				thEle=React.createElement("th",{width:100/this.cols+"%"});
				ths.push(thEle);
				if(gutter && i<this.cols-1){
					thEle=React.createElement("th",{width:0, className:"placeholder-h"},<div style={{width:gutter+'px'}}></div>);
					ths.push(thEle);
				}
			}
			children.push(<thead>{ths}</thead>);
			var trs=[],tds=[],tdEle=null;
			var trEle=React.createElement("tr",null,tds);
			trs.push(trEle);
			var curCount=0;
			for(i=0;i<els.length;i++){
				var child:any=els[i];
				var span=child.props.span;
				curCount=curCount+span;
				tdEle=React.createElement("td",{colSpan:span+(gutter?span-1:0),vAlign:'top'},child);
				tds.push(tdEle);
				if(curCount+span>this.cols){
					curCount=0;
					tds=new Array();
					trEle=React.createElement("tr",null,tds);
					trs.push(trEle);
				}else if(gutter && curCount<this.cols){
					tdEle=<td>1</td>;
					tds.push(tdEle);
				}
			}
			children.push(React.createElement("tbody", null, trs));
		}
		var tableProps={
			width:"100%",
			border:0, cellSpacing:0, cellPadding:0,
			className:"layout-table"
		};
		return React.createElement("table", tableProps, children);
	}
}
function sumCol(accumulator, curr, idx, arr){
	return accumulator + curr.props.span;
}
function childrenToFlex(child){
	var style:CSSProperties={};
	if(this.props.gutter){
		style.borderLeft=this.props.gutter+"px dotted transparent";
	}
	style.width=child.props.span/this.cols*100+"%";
	//if(child.props.span){
		//style.MozBoxFlex=style.WebkitBoxFlex=style.msFlex=style.flexGrow=child.props.span;
	//}
	return <div className="col-sider" style={style}>{child}</div>;
}
function childrenToTable(child){
	var style:CSSProperties={};
	if(this.props.gutter){
		style.borderLeft=this.props.gutter+"px solid transparent";
	}
	style.width=child.props.span/this.cols*100+"%";
	//if(child.props.span){
		//style.MozBoxFlex=style.WebkitBoxFlex=style.msFlex=style.flexGrow=child.props.span;
	//}
	return <div className="col-sider" style={style}>{child}</div>;
}
export class Col extends React.Component<ColProps,any>{
	static defaultProps = { 
		span:1
	}
	render(){
		return this.props.children;
	}
}