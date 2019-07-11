
import {Component} from "react";

import * as React from "react";
import * as ReactDOM from "react-dom";
import apng_supported from "support/apng";
import webp_animation_supported from "support/webp-animation";
import svg_img_supported from "support/svg-img";

export interface IProps{
	size?:number,
	src?:string,
	svg?:string,
	apng?:string,
	webp?:string,
	png?:string,
	gif?:string,
	[key:string]:any
};
export interface IStates{}

export class Icon extends Component <IProps,IStates>{

	renderFont(size,children,rest){
		var style:any={};
		if(size){
			style.width=style.height=style.lineHeight=style.fontSize=size+"px";
		}
		return <i className="icon fa" style={style}>{children}</i>;
	}
	renderEmoji(size,children,rest){
		var code=toCodePoint(children);
		var src;
		if(svg_img_supported){
			src="https://cdn.bootcss.com/twemoji/11.2.0/2/svg/"+code+".svg";
		}else{
			src="https://cdn.bootcss.com/twemoji/11.2.0/2/72x72/"+code+".png";
		}
		return <img className="icon" height={size} alt={children} src={src} {...rest}/>;
	}
	renderImg(size:number,src:string,rest){
		return <img className="icon" height={size} src={src} {...rest}/>;
	}
	renderPng32(size:number,src:string,rest){
		var style:any={
			filter:'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+Sky.escapeString(new URL(src,location as any as URL).href)+'", sizingMethod="scale")'
		};
		style.height=style.width=size+"px";
		return <i className="icon" style={style} {...rest}/>;
	}
	renderSVG(size:number,src:string,rest){
		return <embed className="icon" width={size} height={size} src={src} {...rest} type="image/svg+xml"/>;
	}
	render(){
		var {size,children,src,atsvg,svg,apng,awebp,png,hfpsgif,gif,...rest}=this.props;
		if(children){
			if(typeof children==="string"){
				if(children.charCodeAt(0)>=0xf000){
					return this.renderFont(size,children,rest);
				}else{
					return this.renderEmoji(size,children,rest);
				}
			}
		}else{
			if(src){
				return this.renderImg(size,src,rest);
			}
			if(atsvg && ('SVGAnimateTransformElement' in window)){
				return this.renderImg(size,atsvg,rest);
			}
			if(svg && ('SVGRect' in window)){
				return this.renderSVG(size,svg,rest);
			}
			if(apng && apng_supported){
				return this.renderImg(size,apng,rest);
			}
			if(awebp && webp_animation_supported){
				return this.renderImg(size,awebp,rest);
			}
			if(png){
				if(Sky.support.XMLHttpRequest){
					return this.renderImg(size,png,rest);
				}else{
					return this.renderPng32(size,png,rest);
				}
			}
			if(hfpsgif && document.addEventListener){
				return this.renderImg(size,hfpsgif,rest);
			}
			if(gif){
				return this.renderImg(size,gif,rest);
			}
		}
		return null;
	}
}


function toCodePoint(unicodeSurrogates) {
	var r = [],
	c = 0,
	p = 0,
	i = 0;
	while (i < unicodeSurrogates.length) {
		c = unicodeSurrogates.charCodeAt(i++);
		if (p) {
			r.push((65536 + (p - 55296 << 10) + (c - 56320)).toString(16));
			p = 0
		} else if (55296 <= c && c <= 56319) {
			p = c
		} else {
			r.push(c.toString(16))
		}
	}
	return r.join("-")
}