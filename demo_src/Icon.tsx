
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Icon} from "ting";

export=()=><article>
	<h2>字体图标</h2>
	<Icon size={32}>&#xf000;</Icon>
	<Icon size={32}>&#xf001;</Icon>
	<Icon size={48}>&#xf002;</Icon>
	<h2>twitter emoji</h2>
	<Icon size={72}>📝</Icon>
	<Icon size={72}>📖</Icon>
	<Icon size={72}>📷</Icon>
	<Icon size={72}>⛷</Icon>
	<Icon size={72}>🍟</Icon>
	<h2>图片图标</h2>
	<Icon size={72} src="https://cdn.bootcss.com/twemoji/11.2.0/2/72x72/1f649.png"/>
	<Icon size={72} src="/linsk1998/ting/master/images/logo.png"/>
	<Icon size={72} png="https://cdn.bootcss.com/twemoji/11.2.0/2/72x72/1f649.png"/>
	<Icon size={72} png="/linsk1998/ting/master/images/logo.png"/>
	<h2>SVG优雅降级</h2>
	<Icon size={144} svg="https://cdn.bootcss.com/twemoji/11.2.0/2/svg/1f649.svg" png="https://cdn.bootcss.com/twemoji/11.2.0/2/72x72/1f649.png"/>
	<Icon size={144} png="https://cdn.bootcss.com/twemoji/11.2.0/2/72x72/1f649.png"/>
	<h2>动图优雅降级</h2>
	<Icon size={144}
		atsvg="/linsk1998/spinfox/master/spinfox.svg"
		apng="/linsk1998/spinfox/master/spinfox.png"
		awebp="/linsk1998/spinfox/master/spinfox.webp"
		hfpsgif="/linsk1998/spinfox/master/spinfox.hfps.gif"
		gif="/linsk1998/spinfox/master/spinfox.gif"
	/>
	<Icon size={144}
		apng="/linsk1998/spinfox/master/spinfox.png"
		awebp="/linsk1998/spinfox/master/spinfox.webp"
		hfpsgif="/linsk1998/spinfox/master/spinfox.hfps.gif"
		gif="/linsk1998/spinfox/master/spinfox.gif"
	/>
	<Icon size={144}
		awebp="/linsk1998/spinfox/master/spinfox.webp"
		hfpsgif="/linsk1998/spinfox/master/spinfox.hfps.gif"
		gif="/linsk1998/spinfox/master/spinfox.gif"
	/>
	<Icon size={144}
		hfpsgif="/linsk1998/spinfox/master/spinfox.hfps.gif"
		gif="/linsk1998/spinfox/master/spinfox.gif"
	/>
	<Icon size={144}
		gif="/linsk1998/spinfox/master/spinfox.gif"
	/>
</article>;