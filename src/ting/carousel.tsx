
import {Component,Fragment} from "react";

import * as React from "react";
import * as ReactDOM from "react-dom";

export interface CarouselProps{
	dots?:boolean,
	duration?:number,
	children:Array<any>
}
export interface CarouselItemProps{
	active?:boolean,
	children?:any
}

export class Carousel extends Component <CarouselProps,{}>{
	static defaultProps={
		dots:true,
		duration:5000
	};
	current:number;
	size:number;
	render(){
		this.size=this.props.children.length;
		this.current=0;
		return <div className="carousel">
			<div className="carousel-inner">
				{this.props.children.map(renderCarouselItems,this.props.children)}
			</div>
			<div className="carousel-control">
					<a className="left fa" href="javascript:;">&#xf104;</a>
					<a className="right fa" href="javascript:;">&#xf105;</a>
			</div>
			{CarouselIndicators(this.props)}
		</div>;
	}
	componentDidMount(){
		
	}
}
function CarouselIndicators(props?:CarouselProps){
	if(props.dots){
		return <ol className="carousel-indicators">
			{props.children.map(renderCarouselIndicators,props.children)}
		</ol>;
	}
	return null;
}
function renderCarouselIndicators(){
	return <li className="fa">&#xf111;</li>;
}
function renderCarouselItems(item:React.ReactChild){
	return <div className="item">{item}</div>;
}
export function CarouselItem(props?:CarouselItemProps){
	return this.props.children;
}
export function CarouselCaption(){
	return <div className="carousel-caption">this.props.children</div>;
}



function autoNext(){
	$("div[role=carousel]",document).each(function(){
		var $carousel=$(this);
		var $items=$carousel.find('.carousel-inner>.item');
		var index=$items.filter(".active").index(".item");
		if(index<$items.length-1){
			index++;
			setIndex($carousel,index);
		}else{
			setIndex($carousel,0);
		}
	});
}