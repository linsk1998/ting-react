
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Collapse,CollapsePanel,Row,Col} from "ting";

export=()=><Row gutter={10} cols={12}>
	<Col span={6}>
		<Collapse>
			<CollapsePanel header="aaa" actived>aaa
			</CollapsePanel>
			<CollapsePanel header="bbb">bbb
			</CollapsePanel>
		</Collapse>
	</Col>
	<Col span={6}>
		<Collapse inverse>
			<CollapsePanel header="aaa" actived>aaa
			</CollapsePanel>
			<CollapsePanel header="bbb">bbb
			</CollapsePanel>
		</Collapse>
	</Col>
</Row>;