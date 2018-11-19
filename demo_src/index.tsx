
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Fragment} from "react";
import {Link,Route} from "ting";

ReactDOM.render(<Fragment>
	<Link to="/123">1/123</Link>
	<Link to="">Home</Link>
	<Route>Home
	</Route>
	<Route path="/123">123
		<Link to="/123/123">2/123/123</Link>
		<Link to="/123/456">2/123/456</Link>
		<Route path="/123">2.123
		</Route>
		<Route path="/456" export="asd">2.456
		</Route>
	</Route>
</Fragment>, document.body
);