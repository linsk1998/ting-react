
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Carousel,CarouselItem} from "ting";

export=()=><article>
	<Carousel>
		<CarouselItem>
			<img width="100%" src="https://dummyimage.com/720x360/44aa99/fff"/>
			<div className="carousel-caption">
				<h3>金坷垃</h3>
				<p>肥料掺了金坷垃，一袋能顶两袋撒。来自美国的金坷垃是美国肥料研究中心CNT的最新科技成果。</p>
			</div>
		</CarouselItem>
		<CarouselItem>
			<img width="100%" src="https://dummyimage.com/720x360/44aa99/fff"/>
			<div className="carousel-caption">
				<h3>金坷垃</h3>
				<p>肥料掺了金坷垃，一袋能顶两袋撒。来自美国的金坷垃是美国肥料研究中心CNT的最新科技成果。</p>
			</div>
		</CarouselItem>
	</Carousel>
</article>;