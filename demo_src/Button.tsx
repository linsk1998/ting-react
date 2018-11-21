
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Button,ButtonGroup,ButtonToolbar} from "ting";

var btnStyle={ marginRight:"10px"};
export=()=><article>
	<h2>普通按钮</h2>
	<Button style={btnStyle} type="primary" onClick={function(e){ alert("你点击了按钮");}}>Primary</Button>
	<Button style={btnStyle}>hello</Button>
	<Button style={btnStyle} type="info">Info</Button>
	<Button style={btnStyle} type="warning">Warning</Button>
	<Button style={btnStyle} type="danger">Danger</Button>
	<h2>超级链接</h2>
	<Button style={btnStyle} href="/linsk1998/ting/master/" target="_blank" type="primary" title="超级链接">Primary</Button>
	<Button style={btnStyle} href="/linsk1998/ting/master/" target="_blank">hello</Button>
	<Button style={btnStyle} href="/linsk1998/ting/master/" target="_blank" type="info">Info</Button>
	<Button style={btnStyle} href="/linsk1998/ting/master/" target="_blank" type="warning">Warning</Button>
	<Button style={btnStyle} href="/linsk1998/ting/master/" target="_blank" type="danger">Danger</Button>
	<h2>按钮禁用</h2>
	<Button type="primary" disabled>Primary</Button>
	<h2>block按钮</h2>
	<Button href="/linsk1998/ting/master/" target="_blank" type="primary" block style={{marginBottom:'10px'}}>Primary</Button>
	<Button block>hello</Button>
	<h2>按钮尺寸</h2>
	<Button href="javascript:void 0" size="lg">大</Button>
	<Button href="javascript:void 0">中</Button>
	<Button href="javascript:void 0" size="sm">小</Button>
	<Button href="javascript:void 0" size="xs">微小</Button>
	<h2>按钮组</h2>
	<ButtonGroup>
		<Button>按钮 1</Button>
		<Button>按钮 2</Button>
		<Button>按钮 3</Button>
	</ButtonGroup>
	<h2>按钮工具栏</h2>
	<ButtonToolbar>
		<Button>按钮 1</Button>
		<Button>按钮 2</Button>
		<ButtonGroup>
			<Button>按钮 1</Button>
			<Button>按钮 2</Button>
			<Button>按钮 3</Button>
		</ButtonGroup>
		<ButtonGroup>
			<Button>按钮 1</Button>
			<Button>按钮 2</Button>
			<Button>按钮 3</Button>
		</ButtonGroup>
	</ButtonToolbar>
</article>;