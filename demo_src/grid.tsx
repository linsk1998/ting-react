
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Col,Row} from "ting";

var btnStyle={ marginRight:"10px"};
export=()=><article>
	<h2>均匀分配</h2>
	<Row>
		<Col>
			<div className="bg-info">1</div>
		</Col>
		<Col>
			<div className="bg-warn">2</div>
		</Col>
		<Col>
			<div className="bg-info">3</div>
		</Col>
		<Col>
			<div className="bg-warn">4</div>
		</Col>
	</Row>
	<h2>带间隙均匀分配</h2>
	<Row gutter={20}>
		<Col>
			<div className="bg-primary">1</div>
		</Col>
		<Col>
			<div className="bg-success">2</div>
		</Col>
		<Col>
			<div className="bg-primary">3</div>
		</Col>
		<Col span={2}>
			<div className="bg-success">4</div>
		</Col>
	</Row>
	<Row gutter={20}>
		<Col>
			<div className="bg-primary">1</div>
		</Col>
		<Col>
			<div className="bg-success">2</div>
		</Col>
		<Col>
			<div className="bg-primary">3</div>
		</Col>
		<Col>
			<div className="bg-success">4</div>
		</Col>
		<Col>
			<div className="bg-primary">5</div>
		</Col>
	</Row>
	<h2>12等分</h2>
	<Row cols={12}>
		<Col span={3}>
			<div className="bg-primary">1</div>
		</Col>
		<Col span={3}>
			<div className="bg-success">2</div>
		</Col>
		<Col span={3}>
			<div className="bg-primary">3</div>
		</Col>
		<Col span={3}>
			<div className="bg-success">4</div>
		</Col>
	</Row>
	<Row cols={12}>
		<Col span={3}>
			<div className="bg-primary">1</div>
		</Col>
		<Col span={3}>
			<div className="bg-success">2</div>
		</Col>
		<Col span={6}>
			<div className="bg-primary">3</div>
		</Col>
	</Row>
	<h2>带间隙12等分</h2>
	<Row cols={12} gutter={20}>
		<Col span={3}>
			<div className="bg-primary box-mbxs">1</div>
		</Col>
		<Col span={3}>
			<div className="bg-success box-mbxs">2</div>
		</Col>
		<Col span={3}>
			<div className="bg-primary box-mbxs">3</div>
		</Col>
		<Col span={3}>
			<div className="bg-success box-mbxs">4</div>
		</Col>
	</Row>
	<Row cols={12} gutter={20}>
		<Col span={3}>
			<div className="bg-primary">1</div>
		</Col>
		<Col span={3}>
			<div className="bg-success">2</div>
		</Col>
		<Col span={6}>
			<div className="bg-primary">3</div>
		</Col>
	</Row>
	<h2>超出自动换行</h2>
	<Row cols={12} gutter={20}>
		<Col span={6}>
			<div className="bg-primary box-mbxs">1<br/>1</div>
		</Col>
		<Col span={6}>
			<div className="bg-success box-mbxs">2</div>
		</Col>
		<Col span={6}>
			<div className="bg-primary box-mbxs">3</div>
		</Col>
		<Col span={6}>
			<div className="bg-success box-mbxs">4</div>
		</Col>
		<Col span={6}>
			<div className="bg-primary box-mbxs">5</div>
		</Col>
		<Col span={6}>
			<div className="bg-success box-mbxs">6</div>
		</Col>
		<Col span={6}>
			<div className="bg-primary box-mbxs">7</div>
		</Col>
		<Col span={6}>
			<div className="bg-success box-mbxs">8</div>
		</Col>
	</Row>
</article>;