define(["require", "exports", "react", "ting"], function (require, exports, React, ting_1) {
    "use strict";
    return function () { return React.createElement(ting_1.Row, { gutter: 10, cols: 12 },
        React.createElement(ting_1.Col, { span: 6 },
            React.createElement(ting_1.Collapse, null,
                React.createElement(ting_1.CollapsePanel, { header: "aaa", actived: true }, "aaa"),
                React.createElement(ting_1.CollapsePanel, { header: "bbb" }, "bbb"))),
        React.createElement(ting_1.Col, { span: 6 },
            React.createElement(ting_1.Collapse, { inverse: true },
                React.createElement(ting_1.CollapsePanel, { header: "aaa", actived: true }, "aaa"),
                React.createElement(ting_1.CollapsePanel, { header: "bbb" }, "bbb")))); };
});
