define(["require", "exports", "react", "react-dom", "react", "ting"], function (require, exports, React, ReactDOM, react_1, ting_1) {
    "use strict";
    exports.__esModule = true;
    var btnStyle = { marginRight: "10px" };
    ReactDOM.render(React.createElement(react_1.Fragment, null,
        React.createElement("h2", null, "\u666E\u901A\u6309\u94AE"),
        React.createElement(ting_1.Button, { style: btnStyle, type: "primary", onClick: function (e) { alert("你点击了按钮"); } }, "Primary"),
        React.createElement(ting_1.Button, { style: btnStyle }, "hello"),
        React.createElement(ting_1.Button, { style: btnStyle, type: "info" }, "Info"),
        React.createElement(ting_1.Button, { style: btnStyle, type: "warning" }, "Warning"),
        React.createElement(ting_1.Button, { style: btnStyle, type: "danger" }, "Danger"),
        React.createElement("h2", null, "\u8D85\u7EA7\u94FE\u63A5"),
        React.createElement(ting_1.Button, { style: btnStyle, href: "/linsk1998/ting/master/", target: "_blank", type: "primary", title: "\u8D85\u7EA7\u94FE\u63A5" }, "Primary"),
        React.createElement(ting_1.Button, { style: btnStyle, href: "/linsk1998/ting/master/", target: "_blank" }, "hello"),
        React.createElement(ting_1.Button, { style: btnStyle, href: "/linsk1998/ting/master/", target: "_blank", type: "info" }, "Info"),
        React.createElement(ting_1.Button, { style: btnStyle, href: "/linsk1998/ting/master/", target: "_blank", type: "warning" }, "Warning"),
        React.createElement(ting_1.Button, { style: btnStyle, href: "/linsk1998/ting/master/", target: "_blank", type: "danger" }, "Danger"),
        React.createElement("h2", null, "\u6309\u94AE\u7981\u7528"),
        React.createElement(ting_1.Button, { type: "primary", disabled: true }, "Primary"),
        React.createElement("h2", null, "block\u6309\u94AE"),
        React.createElement(ting_1.Button, { href: "/linsk1998/ting/master/", target: "_blank", type: "primary", block: true, style: { marginBottom: '10px' } }, "Primary"),
        React.createElement(ting_1.Button, { block: true }, "hello"),
        React.createElement("h2", null, "\u6309\u94AE\u5C3A\u5BF8"),
        React.createElement(ting_1.Button, { href: "javascript:void 0", size: "lg" }, "\u5927"),
        React.createElement(ting_1.Button, { href: "javascript:void 0" }, "\u4E2D"),
        React.createElement(ting_1.Button, { href: "javascript:void 0", size: "sm" }, "\u5C0F"),
        React.createElement(ting_1.Button, { href: "javascript:void 0", size: "xs" }, "\u5FAE\u5C0F"),
        React.createElement("h2", null, "\u6309\u94AE\u7EC4"),
        React.createElement(ting_1.ButtonGroup, null,
            React.createElement(ting_1.Button, null, "\u6309\u94AE 1"),
            React.createElement(ting_1.Button, null, "\u6309\u94AE 2"),
            React.createElement(ting_1.Button, null, "\u6309\u94AE 3")),
        React.createElement("h2", null, "\u6309\u94AE\u5DE5\u5177\u680F"),
        React.createElement(ting_1.ButtonToolbar, null,
            React.createElement(ting_1.Button, null, "\u6309\u94AE 1"),
            React.createElement(ting_1.Button, null, "\u6309\u94AE 2"),
            React.createElement(ting_1.ButtonGroup, null,
                React.createElement(ting_1.Button, null, "\u6309\u94AE 1"),
                React.createElement(ting_1.Button, null, "\u6309\u94AE 2"),
                React.createElement(ting_1.Button, null, "\u6309\u94AE 3")),
            React.createElement(ting_1.ButtonGroup, null,
                React.createElement(ting_1.Button, null, "\u6309\u94AE 1"),
                React.createElement(ting_1.Button, null, "\u6309\u94AE 2"),
                React.createElement(ting_1.Button, null, "\u6309\u94AE 3")))), document.getElementById("DEMO"));
});
