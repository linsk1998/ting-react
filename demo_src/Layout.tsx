
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Fragment} from "react";
import {Layout,Header,Footer,Sider,Content} from "ting";
export=()=>
	<article>
			<div style={{height:"300px",marginBottom:"20px"}}>
				<Layout full>
					<Header height={50} className="bg-info">Header</Header>
					<Content className="bg-danger">Content</Content>
					<Footer className="bg-info">Footer</Footer>
				</Layout>
			</div>
			<div style={{height:"300px",marginBottom:"20px"}}>
				<Layout full>
					<Header className="bg-info">Header</Header>
					<Layout>
						<Sider width={200} className="bg-warning">Sider</Sider>
						<Content className="bg-danger">Content</Content>
						<Sider width={100} className="bg-warning">Sider</Sider>
					</Layout>
					<Footer className="bg-info">Footer</Footer>
				</Layout>
			</div>
			<div style={{height:"300px",marginBottom:"20px"}}>
				<Layout full>
					<Sider width={200} className="bg-warning">Sider</Sider>
					<Layout>
						<Header height={50} className="bg-info">Header</Header>
						<Content className="bg-danger">Content</Content>
						<Footer className="bg-info">Footer</Footer>
					</Layout>
				</Layout>
			</div>
	</article>
;