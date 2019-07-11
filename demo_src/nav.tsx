
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Fragment} from "react";
import {NavItem,NavLink,Switch,Route,IndexRoute,Layout,Content,Sider,Header} from "ting";
export=()=>
	<Layout>
		<Header>
			<ul className="nav nav-tabs">
				<NavItem path="/aaa" activeClassName="active" index><li><NavLink to="aaa">aaa</NavLink></li></NavItem>
				<NavItem path="/bbb" activeClassName="active"><li><NavLink to="bbb">bbb</NavLink></li></NavItem>
				<NavItem path="/ccc" activeClassName="active"><li><NavLink to="ccc">ccc</NavLink></li></NavItem>
			</ul>
		</Header>
		<Content>
			<Switch>
				<IndexRoute path="/aaa">
					<Layout>
						<Sider>
							<ul className="nav nav-tabs tabs-stacked">
								<NavItem path="/aaa" activeClassName="active" index><li><NavLink to="aaa">aaa</NavLink></li></NavItem>
								<NavItem path="/bbb" activeClassName="active"><li><NavLink to="bbb">abb</NavLink></li></NavItem>
								<NavItem path="/ccc" activeClassName="active"><li><NavLink to="ccc">acc</NavLink></li></NavItem>
							</ul>
						</Sider>
						<Content>
							<Switch>
								<IndexRoute path="/aaa">
									<Layout>
										<Header>
											<ul className="nav nav-tabs box-mbmd">
												<NavItem path="/aaa" activeClassName="active" index><li><NavLink to="aaa">aaa</NavLink></li></NavItem>
												<NavItem path="/bbb" activeClassName="active"><li><NavLink to="bbb">aab</NavLink></li></NavItem>
												<NavItem path="/ccc" activeClassName="active"><li><NavLink to="ccc">aac</NavLink></li></NavItem>
											</ul>
										</Header>
										<Content>
											<Switch>
												<IndexRoute path="/aaa">
													aaa
												</IndexRoute>
												<Route path="/bbb">
													aab
												</Route>
												<Route path="/ccc">
													aac
												</Route>
											</Switch>
										</Content>
									</Layout>
								</IndexRoute>
								<Route path="/bbb">
									abb
								</Route>
								<Route path="/ccc">
									acc
								</Route>
							</Switch>
						</Content>
					</Layout>
				</IndexRoute>
				<Route path="/bbb">
					bbb
				</Route>
				<Route path="/ccc">
					ccc
				</Route>
			</Switch>
		</Content>
	</Layout>
;