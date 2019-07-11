
import {Component,Fragment} from "react";

import * as React from "react";
import * as ReactDOM from "react-dom";

export interface CollapseProps{
	inverse?:boolean
}
export interface CollapsePanelState{
	actived?:boolean,
	header:string,
	icon?:string
}

export class Collapse extends Component <CollapseProps,{}>{
	render(){
		var className="sidebar sidebar-nav";
		if(this.props.inverse){
			className+=" inverse sidebar-inverse";
		}
		return <div className={className}>{this.props.children}</div>;
	}
}

export class CollapsePanel extends Component <CollapsePanelState,CollapsePanelState>{
	constructor(props){
		super(props);
		this.state=Object.assign({},props);
	}
	toggle(){
		this.setState({actived:!this.state.actived});
	}
	render(){
		var headerClass="sidebar-nav-header";
		var bodyClass="sidebar-nav-body";
		if(this.state.actived){
			headerClass+=" expanded";
		}else{
			bodyClass+=" collapsed";
		}
		var header=<Fragment>
			<i className="fa pull-right">&#xf107;</i>
			<span className="align-middle">{this.state.header}</span>
		</Fragment>;
		return <Fragment>
			<div className={headerClass} onClick={this.toggle.bind(this)}>{header}</div>
			<div className={bodyClass}>
				{this.props.children}
			</div>
		</Fragment>;
	}
}