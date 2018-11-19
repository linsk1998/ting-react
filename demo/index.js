define(["require", "exports", "react", "react-dom", "react", "ting"], function (require, exports, React, ReactDOM, react_1, ting_1) {
    "use strict";
    exports.__esModule = true;
    ReactDOM.render(React.createElement(react_1.Fragment, null,
        React.createElement(ting_1.Link, { to: "/123" }, "1/123"),
        React.createElement(ting_1.Link, { to: "" }, "Home"),
        React.createElement(ting_1.Route, null, "Home"),
        React.createElement(ting_1.Route, { path: "/123" },
            "123",
            React.createElement(ting_1.Link, { to: "/123/123" }, "2/123/123"),
            React.createElement(ting_1.Link, { to: "/123/456" }, "2/123/456"),
            React.createElement(ting_1.Route, { path: "/123" }, "2.123"),
            React.createElement(ting_1.Route, { path: "/456", "export": "asd" }, "2.456"))), document.body);
});
