define(["require", "exports", "react", "ting"], function (require, exports, React, ting_1) {
    "use strict";
    var PageLoader = /** @class */ (function (_super) {
        __extends(PageLoader, _super);
        function PageLoader(props) {
            var _this = _super.call(this, props) || this;
            _this.state = {
                component: null,
                isError: false
            };
            var me = _this;
            new Promise(function (resolve_1, reject_1) { require([_this.props["import"]], resolve_1, reject_1); }).then(function (module) {
                if (me.props["export"]) {
                    me.setState({ component: module[me.props["export"]] });
                }
                else {
                    me.setState({ component: module });
                }
            }, function () {
                me.setState({ isError: true });
            });
            return _this;
        }
        PageLoader.prototype.render = function () {
            if (this.state.isError) {
                return React.createElement("div", { className: "alert alert-danger" }, "\u9875\u9762\u52A0\u8F7D\u5931\u8D25");
            }
            if (this.state.component) {
                return React.createElement(this.state.component, this.props, this.props.children);
            }
            else {
                return React.createElement("div", null, "\u52A0\u8F7D\u4E2D...");
            }
        };
        return PageLoader;
    }(React.Component));
    var PageHeader = /** @class */ (function (_super) {
        __extends(PageHeader, _super);
        function PageHeader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PageHeader.prototype.render = function () {
            return React.createElement("div", { className: "container-fluid" },
                React.createElement("div", { className: "navbar navbar-top pull-front" },
                    React.createElement("div", { className: "navbar-header" },
                        React.createElement("button", { type: "button", className: "navbar-toggle fa fa-lg" }, "\uF0C9"),
                        React.createElement(ting_1.Link, { to: "", className: "navbar-brand" },
                            React.createElement("img", { height: "37", src: "/linsk1998/ting/master/images/logo.png" }),
                            React.createElement("span", { className: "line-middle" }, "Ting Web UI"))),
                    React.createElement("ul", { className: "navbar-nav" },
                        React.createElement("li", null,
                            React.createElement("a", { href: "/linsk1998/ting/master/index.html" }, "CSS\u6837\u5F0F\u5E93")),
                        React.createElement("li", { className: "active" },
                            React.createElement(ting_1.Link, { to: "" }, "React\u7EC4\u4EF6")))));
        };
        return PageHeader;
    }(React.Component));
    var Sidebar = /** @class */ (function (_super) {
        __extends(Sidebar, _super);
        function Sidebar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Sidebar.prototype.render = function () {
            return React.createElement("div", { className: "sidebar sidebar-nav" },
                React.createElement("div", { className: "sidebar-nav-header" },
                    React.createElement("span", { className: "align-middle" }, "\u901A\u7528")),
                React.createElement("div", { className: "sidebar-nav-body" },
                    React.createElement("ul", { className: "nav-list" },
                        React.createElement("li", null,
                            React.createElement(ting_1.Link, { to: "/Button", className: "nav-list-item" },
                                React.createElement("i", { className: "fa fa-fw" }, "\uF096"),
                                " Button ",
                                React.createElement("small", null, "\u6309\u94AE"))),
                        React.createElement("li", null,
                            React.createElement(ting_1.Link, { to: "/Icon", className: "nav-list-item" },
                                React.createElement("i", { className: "fa fa-fw" }, "\uF2B4"),
                                " Icon ",
                                React.createElement("small", null, "\u56FE\u6807"))))),
                React.createElement("div", { className: "sidebar-nav-header" },
                    React.createElement("span", { className: "align-middle" }, "\u5E03\u5C40")),
                React.createElement("div", { className: "sidebar-nav-body" },
                    React.createElement("ul", { className: "nav-list" },
                        React.createElement("li", null,
                            React.createElement(ting_1.Link, { to: "/todo", className: "nav-list-item" },
                                React.createElement("i", { className: "fa fa-fw" }, "\uF0CE"),
                                " Grid ",
                                React.createElement("small", null, "\u6805\u683C"))),
                        React.createElement("li", null,
                            React.createElement(ting_1.Link, { to: "/Layout", className: "nav-list-item" },
                                React.createElement("i", { className: "fa fa-fw" }, "\uF0DB"),
                                " Layout ",
                                React.createElement("small", null, "\u5E03\u5C40"))))),
                React.createElement("div", { className: "sidebar-nav-header" },
                    React.createElement("span", { className: "align-middle" }, "\u5BFC\u822A")),
                React.createElement("div", { className: "sidebar-nav-body" },
                    React.createElement("ul", { className: "nav-list" },
                        React.createElement("li", null,
                            React.createElement(ting_1.Link, { to: "/todo", className: "nav-list-item" },
                                React.createElement("i", { className: "fa fa-fw" }, "\uF141"),
                                " Breadcrumb ",
                                React.createElement("small", null, "\u9762\u5305\u5C51"))),
                        React.createElement("li", null,
                            React.createElement(ting_1.Link, { to: "/todo", className: "nav-list-item" },
                                React.createElement("i", { className: "fa fa-fw" }, "\uF0C9"),
                                " Navbar ",
                                React.createElement("small", null, "\u5BFC\u822A\u6761"))),
                        React.createElement("li", null,
                            React.createElement(ting_1.Link, { to: "/todo", className: "nav-list-item" },
                                React.createElement("i", { className: "fa fa-fw" }, "\uF152"),
                                " Pagination ",
                                React.createElement("small", null, "\u5206\u9875"))),
                        React.createElement("li", null,
                            React.createElement(ting_1.Link, { to: "/todo", className: "nav-list-item" },
                                React.createElement("i", { className: "fa fa-fw" }, "\uF0CB"),
                                " Steps ",
                                React.createElement("small", null, "\u6B65\u9AA4\u6761"))),
                        React.createElement("li", null,
                            React.createElement(ting_1.Link, { to: "/todo", className: "nav-list-item" },
                                React.createElement("i", { className: "fa fa-fw" }, "\uF150"),
                                " Dropdown ",
                                React.createElement("small", null, "\u4E0B\u62C9\u83DC\u5355"))))),
                React.createElement("div", { className: "sidebar-nav-header" },
                    React.createElement("span", { className: "align-middle" }, "\u6570\u636E\u5C55\u793A")),
                React.createElement("div", { className: "sidebar-nav-body" },
                    React.createElement("ul", { className: "nav-list" },
                        React.createElement("li", null,
                            React.createElement(ting_1.Link, { to: "/todo", className: "nav-list-item" },
                                React.createElement("i", { className: "fa fa-fw" }, "\uF00B"),
                                " Tabs ",
                                React.createElement("small", null, "\u6807\u7B7E\u9875"))),
                        React.createElement("li", null,
                            React.createElement(ting_1.Link, { to: "/todo", className: "nav-list-item" },
                                React.createElement("i", { className: "fa fa-fw" }, "\uF27B"),
                                " Popover ",
                                React.createElement("small", null, "\u6C14\u6CE1\u5361\u7247"))))));
        };
        return Sidebar;
    }(React.Component));
    return function () {
        return React.createElement(ting_1.Layout, { full: true },
            React.createElement(ting_1.Header, null,
                React.createElement(PageHeader, null)),
            React.createElement(ting_1.Header, { height: 20 }),
            React.createElement(ting_1.Layout, { className: "container-fluid" },
                React.createElement(ting_1.Sider, { width: 250 },
                    React.createElement(Sidebar, null)),
                React.createElement(ting_1.Sider, { width: 20 }),
                React.createElement(ting_1.Content, { className: "box-pllg" },
                    React.createElement(ting_1.HashRouter, null,
                        React.createElement(ting_1.Route, { exact: true },
                            React.createElement("article", null,
                                React.createElement("h1", null, "ting-react"),
                                React.createElement("p", null, "ting-react\u662F\u4E00\u4E2A\u6781\u9AD8\u517C\u5BB9\u7684React\u7EC4\u4EF6\u5E93"))),
                        React.createElement(ting_1.Route, { path: "/Button", component: PageLoader, "import": "demo/Button" }),
                        React.createElement(ting_1.Route, { path: "/Icon", component: PageLoader, "import": "demo/Icon" }),
                        React.createElement(ting_1.Route, { path: "/Layout", component: PageLoader, "import": "demo/Layout" }),
                        React.createElement(ting_1.Route, { path: "/todo", exact: true },
                            React.createElement("article", null,
                                React.createElement("h1", null, "\u6B64\u9875\u9762\u672A\u5B8C\u6210")))))));
    };
});
