define(["require", "exports", "react", "ting"], function (require, exports, React, ting_1) {
    "use strict";
    return function () {
        return React.createElement("article", null,
            React.createElement("div", { style: { height: "300px", marginBottom: "20px" } },
                React.createElement(ting_1.Layout, { full: true },
                    React.createElement(ting_1.Header, { height: 50, className: "bg-info" }, "Header"),
                    React.createElement(ting_1.Content, { className: "bg-danger" }, "Content"),
                    React.createElement(ting_1.Footer, { className: "bg-info" }, "Footer"))),
            React.createElement("div", { style: { height: "300px", marginBottom: "20px" } },
                React.createElement(ting_1.Layout, { full: true },
                    React.createElement(ting_1.Header, { className: "bg-info" }, "Header"),
                    React.createElement(ting_1.Layout, null,
                        React.createElement(ting_1.Sider, { width: 200, className: "bg-warning" }, "Sider"),
                        React.createElement(ting_1.Content, { className: "bg-danger" }, "Content"),
                        React.createElement(ting_1.Sider, { width: 100, className: "bg-warning" }, "Sider")),
                    React.createElement(ting_1.Footer, { className: "bg-info" }, "Footer"))),
            React.createElement("div", { style: { height: "300px", marginBottom: "20px" } },
                React.createElement(ting_1.Layout, { full: true },
                    React.createElement(ting_1.Sider, { width: 200, className: "bg-warning" }, "Sider"),
                    React.createElement(ting_1.Layout, null,
                        React.createElement(ting_1.Header, { height: 50, className: "bg-info" }, "Header"),
                        React.createElement(ting_1.Content, { className: "bg-danger" }, "Content"),
                        React.createElement(ting_1.Footer, { className: "bg-info" }, "Footer")))));
    };
});
