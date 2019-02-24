
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Fragment} from "react";
import {Link,Route,HashRouter,Layout,Header,Content,Sider} from "ting";

export=()=>
<Layout>
	<Header className="box-mblg">
		<PageHeader></PageHeader>
	</Header>
	<Layout className="container-fluid">
		<Sider width={250}>
			<Sidebar></Sidebar>
		</Sider>
		<Sider width={20}></Sider>
		<Content>
			<HashRouter>
				<Route exact>
					<article>
						<h1>ting-react</h1>
						<p>ting-react是一个极高兼容的React组件库</p>
					</article>
				</Route>
				<Route path="/Button" component={PageLoader} import="demo/Button"></Route>
				<Route path="/grid" component={PageLoader} import="demo/grid"></Route>
				<Route path="/Icon" component={PageLoader} import="demo/Icon"></Route>
				<Route path="/Layout" component={PageLoader} import="demo/Layout"></Route>
				<Route path="/todo" exact>
					<article>
						<h1>此页面未完成</h1>
					</article>
				</Route>
			</HashRouter>
		</Content>
	</Layout>
</Layout>;
class PageLoader extends React.Component<{import?:string,export?:string},{component:React.ComponentType<any>,isError:boolean}>{
	constructor(props){
		super(props);
		this.state={
			component:null,
			isError:false
		};
		var me=this;
		import(this.props.import).then(function(module){
			if(me.props.export){
				me.setState({component:module[me.props.export]});
			}else{
				me.setState({component:module});
			}
		},function(){
			me.setState({isError:true});
		});
	}
	render(){
		if(this.state.isError){
			return <div className="alert alert-danger">页面加载失败</div>
		}
		if(this.state.component){
			return React.createElement(this.state.component, this.props, this.props.children);
		}else{
			return <div>加载中...</div>
		}
	}
}
class PageHeader extends React.Component<{},{}>{
	render(){
		return <div className="container-fluid">
			<div className="navbar navbar-top pull-front">
				<div className="navbar-header">
					<button type="button" className="navbar-toggle fa fa-lg">&#xf0c9;</button>
					<Link to="" className="navbar-brand"><img height="37" src="/linsk1998/ting/master/images/logo.png"/><span className="line-middle">Ting Web UI</span></Link>
				</div>
				<ul className="navbar-nav">
					<li><a href="/linsk1998/ting/master/index.html">CSS样式库</a></li>
					<li className="active"><Link to="">React组件</Link></li>
				</ul>
			</div>
		</div>;
	}
}
class Sidebar extends React.Component<{},{}>{
	render(){
		return <div className="sidebar sidebar-nav">
			<div className="sidebar-nav-header">
				<span className="align-middle">通用</span>
			</div>
			<div className="sidebar-nav-body">
				<ul className="nav-list">
					<li><Link to="/Button" className="nav-list-item"><i className="fa fa-fw">&#xf096;</i> Button <small>按钮</small></Link></li>
					<li><Link to="/Icon" className="nav-list-item"><i className="fa fa-fw">&#xf2b4;</i> Icon <small>图标</small></Link></li>
				</ul>
			</div>
			<div className="sidebar-nav-header">
				<span className="align-middle">布局</span>
			</div>
			<div className="sidebar-nav-body">
				<ul className="nav-list">
					<li><Link to="/grid" className="nav-list-item"><i className="fa fa-fw">&#xf0ce;</i> Grid <small>栅格</small></Link></li>
					<li><Link to="/Layout" className="nav-list-item"><i className="fa fa-fw">&#xf0db;</i> Layout <small>布局</small></Link></li>
				</ul>
			</div>
			<div className="sidebar-nav-header">
				<span className="align-middle">导航</span>
			</div>
			<div className="sidebar-nav-body">
				<ul className="nav-list">
					<li><Link to="/todo" className="nav-list-item"><i className="fa fa-fw">&#xf141;</i> Breadcrumb <small>面包屑</small></Link></li>
					<li><Link to="/todo" className="nav-list-item"><i className="fa fa-fw">&#xf0c9;</i> Navbar <small>导航条</small></Link></li>
					<li><Link to="/todo" className="nav-list-item"><i className="fa fa-fw">&#xf152;</i> Pagination <small>分页</small></Link></li>
					<li><Link to="/todo" className="nav-list-item"><i className="fa fa-fw">&#xf0cb;</i> Steps <small>步骤条</small></Link></li>
					<li><Link to="/todo" className="nav-list-item"><i className="fa fa-fw">&#xf150;</i> Dropdown <small>下拉菜单</small></Link></li>
				</ul>
			</div>
			<div className="sidebar-nav-header">
				<span className="align-middle">数据展示</span>
			</div>
			<div className="sidebar-nav-body">
				<ul className="nav-list">
					<li><Link to="/todo" className="nav-list-item"><i className="fa fa-fw">&#xf00b;</i> Tabs <small>标签页</small></Link></li>
					<li><Link to="/todo" className="nav-list-item"><i className="fa fa-fw">&#xf27b;</i> Popover <small>气泡卡片</small></Link></li>
				</ul>
			</div>
		</div>;
	}
}