define(["require", "exports", "react", "ting"], function (require, exports, React, ting_1) {
    "use strict";
    var btnStyle = { marginRight: "10px" };
    return function () { return React.createElement("article", null,
        React.createElement("h2", null, "\u666E\u901A\u6309\u94AE"),
        React.createElement(ting_1.Button, { style: btnStyle, theme: "primary", type: "button", onClick: function (e, btn) { alert("你点击了按钮"); btn.setState({ disabled: true }); } }, "Primary"),
        React.createElement(ting_1.Button, { style: btnStyle, type: "button" }, "Default"),
        React.createElement(ting_1.Button, { style: btnStyle, theme: "success", type: "button" }, "Success"),
        React.createElement(ting_1.Button, { style: btnStyle, theme: "info", type: "button" }, "Info"),
        React.createElement(ting_1.Button, { style: btnStyle, theme: "warning", type: "button" }, "Warning"),
        React.createElement(ting_1.Button, { style: btnStyle, theme: "danger", type: "button" }, "Danger"),
        React.createElement("h2", null, "\u8D85\u7EA7\u94FE\u63A5"),
        React.createElement(ting_1.Button, { style: btnStyle, theme: "primary", title: "\u8D85\u7EA7\u94FE\u63A5" }, "Primary"),
        React.createElement(ting_1.Button, { style: btnStyle }, "Default"),
        React.createElement(ting_1.Button, { style: btnStyle, theme: "success" }, "Success"),
        React.createElement(ting_1.Button, { style: btnStyle, href: "/linsk1998/ting/master/", target: "_blank", theme: "info" }, "Info"),
        React.createElement(ting_1.Button, { style: btnStyle, href: "/linsk1998/ting/master/", target: "_blank", theme: "warning" }, "Warning"),
        React.createElement(ting_1.Button, { style: btnStyle, href: "/linsk1998/ting/master/", target: "_blank", theme: "danger" }, "Danger"),
        React.createElement("h2", null, "\u6309\u94AE\u7981\u7528"),
        React.createElement(ting_1.Button, { theme: "primary", disabled: true }, "Primary"),
        React.createElement("h2", null, "block\u6309\u94AE"),
        React.createElement(ting_1.Button, { href: "/linsk1998/ting/master/", target: "_blank", theme: "primary", block: true, style: { marginBottom: '10px' } }, "Primary"),
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
                React.createElement(ting_1.Button, null, "\u6309\u94AE 3"))),
        React.createElement("h2", null, "\u7ED3\u5408 Icon"),
        React.createElement(ting_1.ButtonToolbar, null,
            React.createElement(ting_1.Button, { icon: "\uF013" }, "\u8BBE\u7F6E"),
            React.createElement(ting_1.Button, { icon: "\uD83D\uDD0D", type: "button" }, "\u6309\u94AE"))); };
});
