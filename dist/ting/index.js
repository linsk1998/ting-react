//该模块非amd模块，无法使用requirejs
define("apng-supported", [], function () {
    var apng_supported = false;
    var canvas = document.createElement("canvas");
    if (!canvas.getContext) {
        return false;
    }
    var apngTest = new Image();
    var ctx = canvas.getContext("2d");
    this.delay(function (resolve, reject) {
        apngTest.onload = function () {
            ctx.drawImage(this, 0, 0);
            resolve(ctx.getImageData(0, 0, 1, 1).data[3] === 0);
        };
        apngTest.onerror = function () {
            resolve(false);
        };
        apngTest.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACGFjVEwAAAABAAAAAcMq2TYAAAANSURBVAiZY2BgYPgPAAEEAQB9ssjfAAAAGmZjVEwAAAAAAAAAAQAAAAEAAAAAAAAAAAD6A+gBAbNU+2sAAAARZmRBVAAAAAEImWNgYGBgAAAABQAB6MzFdgAAAABJRU5ErkJggg==";
    });
});
(function () {
    var html5Styles, unknownElements;
    try {
        var a = document.createElement('a');
        a.innerHTML = '<xyz></xyz>';
        //if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles
        html5Styles = ('hidden' in a);
        unknownElements = a.childNodes.length == 1 || (function () {
            // assign a false positive if unable to shiv
            (document.createElement)('a');
            var frag = document.createDocumentFragment();
            return (!('cloneNode' in frag) ||
                !('createDocumentFragment' in frag) ||
                !('createElement' in frag));
        }());
        'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video'
            .split(" ").forEach(function (tag) {
            document.createElement(tag);
        });
    }
    catch (e) {
        // assign a false positive if detection fails => unable to shiv
        html5Styles = true;
        unknownElements = true;
    }
    Sky.support.html5Styles = html5Styles;
    Sky.support.unknownElements = unknownElements;
}());
define("ting/button", ["require", "exports", "react", "react"], function (require, exports, react_1, React) {
    "use strict";
    exports.__esModule = true;
    ;
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        function Button() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Button.prototype.renderAnchor = function (className, rest) {
            return React.createElement("a", __assign({ className: className }, rest), this.props.children);
        };
        Button.prototype.renderButton = function (className, rest) {
            return React.createElement("button", __assign({ type: "button", className: className }, rest), this.props.children);
        };
        Button.prototype.render = function () {
            var _a = this.props, type = _a.type, block = _a.block, size = _a.size, rest = __rest(_a, ["type", "block", "size"]);
            var className = "btn";
            if (type) {
                className += " btn-" + type;
            }
            else {
                className += " btn-default";
            }
            if (block) {
                className += " btn-block";
            }
            if (size) {
                className += " btn-" + size;
            }
            if (this.props.disabled) {
                className += " btn-disabled";
            }
            if (rest.href) {
                return this.renderAnchor(className, rest);
            }
            else {
                return this.renderButton(className, rest);
            }
        };
        return Button;
    }(react_1.Component));
    exports.Button = Button;
    var ButtonGroup = /** @class */ (function (_super) {
        __extends(ButtonGroup, _super);
        function ButtonGroup() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ButtonGroup.prototype.render = function () {
            return React.createElement("div", { className: "btn-group" }, this.props.children);
        };
        return ButtonGroup;
    }(react_1.Component));
    exports.ButtonGroup = ButtonGroup;
    var ButtonToolbar = /** @class */ (function (_super) {
        __extends(ButtonToolbar, _super);
        function ButtonToolbar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ButtonToolbar.prototype.render = function () {
            return React.createElement("div", { className: "btn-toolbar" }, this.props.children);
        };
        return ButtonToolbar;
    }(react_1.Component));
    exports.ButtonToolbar = ButtonToolbar;
});
//该模块非amd模块，无法使用requirejs
define("webp-animation-supported", [], function () {
    var webp_supported = false;
    var canvas = document.createElement("canvas");
    if (!canvas.getContext) {
        return false;
    }
    var webpTest = new Image();
    this.delay(function (resolve, reject) {
        webpTest.onload = function () {
            if (webpTest.width > 0 && webpTest.height > 0) {
                var ctx = canvas.getContext("2d");
                ctx.drawImage(webpTest, 0, 0);
                resolve(ctx.getImageData(0, 0, 1, 1).data[3] !== 0);
            }
            else {
                resolve(false);
            }
        };
        webpTest.onerror = function () {
            resolve(false);
        };
        webpTest.src = "data:image/webp;base64,UklGRpQAAABXRUJQVlA4WAoAAAACAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GMAAAAAAAAAAAAAAAAAAAAGQAAAJWUDggGAAAADABAJ0BKgEAAQACADQlpAADcAD++/1QAEFOTUYwAAAAAAAAAAAAAAAAAAAAZAAAAlZQOCAYAAAAMAEAnQEqAQABAAIANCWkAANwAP77lAAA";
    });
});
define("ting/icon", ["require", "exports", "react", "react", "apng-supported", "webp-animation-supported"], function (require, exports, react_2, React, apng_supported, webp_animation_supported) {
    "use strict";
    exports.__esModule = true;
    ;
    var Icon = /** @class */ (function (_super) {
        __extends(Icon, _super);
        function Icon() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Icon.prototype.renderFont = function (size, children, rest) {
            var style = {};
            if (size) {
                style.width = style.height = style.lineHeight = style.fontSize = size + "px";
            }
            return React.createElement("i", { className: "icon fa", style: style }, children);
        };
        Icon.prototype.renderEmoji = function (size, children, rest) {
            var code = toCodePoint(children);
            var src;
            if ('SVGRect' in window) {
                src = "https://cdn.bootcss.com/twemoji/11.2.0/2/svg/" + code + ".svg";
            }
            else {
                src = "https://cdn.bootcss.com/twemoji/11.2.0/2/72x72/" + code + ".png";
            }
            return React.createElement("img", __assign({ className: "icon", height: size, alt: children, src: src }, rest));
        };
        Icon.prototype.renderImg = function (size, src, rest) {
            return React.createElement("img", __assign({ className: "icon", height: size, src: src }, rest));
        };
        Icon.prototype.renderPng32 = function (size, src, rest) {
            var style = {
                filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + Sky.escapeString(new URL(src, location).href) + '", sizingMethod="scale")'
            };
            style.height = style.width = size + "px";
            return React.createElement("i", __assign({ className: "icon", style: style }, rest));
        };
        Icon.prototype.render = function () {
            var _a = this.props, size = _a.size, children = _a.children, src = _a.src, atsvg = _a.atsvg, svg = _a.svg, apng = _a.apng, awebp = _a.awebp, png = _a.png, hfpsgif = _a.hfpsgif, gif = _a.gif, rest = __rest(_a, ["size", "children", "src", "atsvg", "svg", "apng", "awebp", "png", "hfpsgif", "gif"]);
            if (children) {
                if (typeof children === "string") {
                    if (children.charCodeAt(0) >= 0xf000) {
                        return this.renderFont(size, children, rest);
                    }
                    else {
                        return this.renderEmoji(size, children, rest);
                    }
                }
            }
            else {
                if (src) {
                    return this.renderImg(size, src, rest);
                }
                if (atsvg && ('SVGAnimateTransformElement' in window)) {
                    return this.renderImg(size, atsvg, rest);
                }
                if (svg && ('SVGRect' in window)) {
                    return this.renderImg(size, svg, rest);
                }
                if (apng && apng_supported) {
                    return this.renderImg(size, apng, rest);
                }
                if (awebp && webp_animation_supported) {
                    return this.renderImg(size, awebp, rest);
                }
                if (png) {
                    if (Sky.support.XMLHttpRequest) {
                        return this.renderImg(size, png, rest);
                    }
                    else {
                        return this.renderPng32(size, png, rest);
                    }
                }
                if (hfpsgif && document.addEventListener) {
                    return this.renderImg(size, hfpsgif, rest);
                }
                if (gif) {
                    return this.renderImg(size, gif, rest);
                }
            }
            return null;
        };
        return Icon;
    }(react_2.Component));
    exports.Icon = Icon;
    function toCodePoint(unicodeSurrogates) {
        var r = [], c = 0, p = 0, i = 0;
        while (i < unicodeSurrogates.length) {
            c = unicodeSurrogates.charCodeAt(i++);
            if (p) {
                r.push((65536 + (p - 55296 << 10) + (c - 56320)).toString(16));
                p = 0;
            }
            else if (55296 <= c && c <= 56319) {
                p = c;
            }
            else {
                r.push(c.toString(16));
            }
        }
        return r.join("-");
    }
});
define("ting/router", ["require", "exports", "react", "react"], function (require, exports, react_3, React) {
    "use strict";
    exports.__esModule = true;
    var RouterContext = React.createContext({
        history: "hashHistory",
        location: "",
        currentPath: ""
    });
    var HashRouter = /** @class */ (function (_super) {
        __extends(HashRouter, _super);
        function HashRouter(props, context) {
            var _this = _super.call(this, props, context) || this;
            _this.state = {
                currentPath: currentPath()
            };
            return _this;
        }
        HashRouter.prototype.componentWillUnmount = function () {
            routers["delete"](this);
        };
        HashRouter.prototype.componentWillMount = function () {
            routers.add(this);
        };
        HashRouter.prototype.render = function () {
            var context = {
                history: 'hashHistory',
                location: "",
                currentPath: this.state.currentPath
            };
            return React.createElement(RouterContext.Provider, { value: context }, this.props.children);
        };
        return HashRouter;
    }(react_3.Component));
    exports.HashRouter = HashRouter;
    ;
    var Route = /** @class */ (function (_super) {
        __extends(Route, _super);
        function Route() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Route.prototype.render = function () {
            var me = this;
            return React.createElement(RouterContext.Consumer, null, function (context) {
                var curPath = context.currentPath;
                var mypath = context.location + me.props.path;
                if (me.props.exact && curPath === mypath || (curPath + "/").startsWith(mypath + "/") && !me.props.exact) {
                    if (me.props.component) {
                        return React.createElement(me.props.component, me.props, me.props.children);
                    }
                    return me.props.children;
                }
                return null;
            });
        };
        Route.defaultProps = {
            path: ""
        };
        return Route;
    }(react_3.Component));
    exports.Route = Route;
    var Link = /** @class */ (function (_super) {
        __extends(Link, _super);
        function Link() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Link.prototype.render = function () {
            var _a = this.props, to = _a.to, rest = __rest(_a, ["to"]);
            return React.createElement(RouterContext.Consumer, null, function (context) {
                if ('onhashchange' in window) {
                    return React.createElement("a", __assign({ href: "#" + to }, rest));
                }
                return React.createElement("a", __assign({ href: "#" + to }, rest, { onClick: linkClickHandle }));
            });
        };
        return Link;
    }(react_3.Component));
    exports.Link = Link;
    var routers = new Set();
    function currentPath() {
        var path = location.hash.replace(/^#/, "");
        return path;
    }
    function navigate(path) {
        location.href = "#" + path;
        if (!('onhashchange' in window)) {
            detach(path);
        }
    }
    exports.navigate = navigate;
    function linkClickHandle(e) {
        var target = e.currentTarget;
        detach(target.href.replace(/^[^#]*#/, ""));
    }
    exports.linkClickHandle = linkClickHandle;
    function onhashchange() {
        detach(currentPath());
    }
    if ('onhashchange' in window) {
        Sky.ready().then(onhashchange);
        if (Sky.browser.quirks) {
            var oldHash = location.hash;
            setInterval(function () {
                var hash = location.hash;
                if (oldHash !== hash) {
                    oldHash = hash;
                    detach(currentPath());
                }
            }, 100);
        }
        else {
            Sky.attachEvent(window, 'hashchange', onhashchange);
        }
    }
    function detach(path) {
        routers.forEach(function (router) {
            router.setState({ currentPath: path });
        });
    }
});
define("ting/layout", ["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    exports.__esModule = true;
    ;
    var Layout = /** @class */ (function (_super) {
        __extends(Layout, _super);
        function Layout() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Layout.prototype.render = function () {
            var children = this.props.children;
            if (Array.isArray(children)) {
                var i = children.length;
                while (i-- > 0) {
                    var child = children[i];
                    if (child.type == Header) {
                        return React.createElement(VGroup, __assign({}, this.props), this.props.children);
                    }
                    else if (child.type == Sider) {
                        return React.createElement(HGroup, __assign({}, this.props), this.props.children);
                    }
                }
            }
            return null;
        };
        return Layout;
    }(React.Component));
    exports.Layout = Layout;
    var VGroup = /** @class */ (function (_super) {
        __extends(VGroup, _super);
        function VGroup() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        VGroup.prototype.renderTable = function () {
            var className = this.props.className;
            if (this.props.full) {
                className += " box-full";
            }
            var children = this.props.children;
            if (Array.isArray(children)) {
                var i = children.length;
                while (i-- > 0) {
                    var child = children[i];
                    switch (child.type) {
                        case Layout:
                        case VGroup:
                        case HGroup:
                        case Content:
                            child.props.dirction = 2;
                    }
                }
            }
            switch (this.props.dirction) {
                case 1:
                    return React.createElement("td", { className: className + " layout-cell" },
                        React.createElement("table", { className: "layout-table", width: "100%", height: "100%" },
                            React.createElement("tbody", null, children)));
                case 2:
                    return { children: children };
                default:
                    return React.createElement("table", { className: className + " row-fill layout-table", width: "100%", height: this.props.height },
                        React.createElement("tbody", null, children));
            }
        };
        VGroup.prototype.renderFlex = function () {
            var className = this.props.className + " col-flex";
            if (this.props.full) {
                className += " box-full";
            }
            else {
                className += " flex";
            }
            var children = this.props.children;
            if (Array.isArray(children)) {
                var i = children.length;
                while (i-- > 0) {
                    var child = children[i];
                    switch (child.type) {
                        case Layout:
                        case VGroup:
                        case HGroup:
                        case Content:
                            child.props.dirction = 2;
                    }
                }
            }
            switch (this.props.dirction) {
                case 1:
                    className += " row-center";
                    break;
                case 2:
                    className += " row-fill";
                    break;
            }
            var style = {};
            var height = this.props.height;
            if (height) {
                if (typeof height !== "number")
                    height = height + "px";
                style.height = height;
            }
            return React.createElement("div", { className: className, style: style }, children);
        };
        VGroup.prototype.render = function () {
            if (!Sky.browser.quirks) {
                return this.renderFlex();
            }
            return this.renderTable();
        };
        VGroup.defaultProps = {
            className: ""
        };
        return VGroup;
    }(React.Component));
    exports.VGroup = VGroup;
    var HGroup = /** @class */ (function (_super) {
        __extends(HGroup, _super);
        function HGroup() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HGroup.prototype.renderTable = function () {
            var className = this.props.className;
            if (this.props.full) {
                className += " box-full";
            }
            else {
                className += " flex";
            }
            var children = this.props.children;
            if (Array.isArray(children)) {
                var i = children.length;
                while (i-- > 0) {
                    var child = children[i];
                    switch (child.type) {
                        case Layout:
                        case VGroup:
                        case HGroup:
                        case Content:
                            child.props.dirction = 1;
                    }
                }
            }
            switch (this.props.dirction) {
                case 1:
                    return { children: children };
                case 2:
                    if (!Sky.browser.quirks) {
                        return React.createElement("div", { className: className + " row-fill" },
                            React.createElement("table", { className: "layout-table", width: "100%" },
                                React.createElement("tbody", null,
                                    React.createElement("tr", null, children))));
                    }
                    else {
                        return React.createElement("tr", null,
                            React.createElement("td", { className: className + " layout-cell", height: "100%" },
                                React.createElement("div", { className: "box-full" },
                                    React.createElement("table", { className: "layout-table", width: "100%", height: "100%" },
                                        React.createElement("tbody", null,
                                            React.createElement("tr", null, children))))));
                    }
                default:
                    return React.createElement("table", { className: className + " layout-table", height: this.props.height },
                        React.createElement("tbody", null,
                            React.createElement("tr", null, children)));
            }
        };
        HGroup.prototype.renderFlex = function () {
            var className = this.props.className + " row-flex";
            if (this.props.full) {
                className += " box-full";
            }
            else {
                className += " flex";
            }
            var children = this.props.children;
            if (Array.isArray(children)) {
                var i = children.length;
                while (i-- > 0) {
                    var child = children[i];
                    switch (child.type) {
                        case Layout:
                        case VGroup:
                        case HGroup:
                        case Content:
                            child.props.dirction = 1;
                    }
                }
            }
            switch (this.props.dirction) {
                case 1:
                    className += " col-center";
                    break;
                case 2:
                    className += " row-fill";
                    break;
            }
            var style = {};
            var height = this.props.height;
            if (height) {
                if (typeof height !== "number")
                    height = height + "px";
                style.height = height;
            }
            return React.createElement("div", { className: className, style: style }, children);
        };
        HGroup.prototype.render = function () {
            if ('atob' in window) {
                return this.renderFlex();
            }
            return this.renderTable();
        };
        HGroup.defaultProps = {
            className: ""
        };
        return HGroup;
    }(React.Component));
    exports.HGroup = HGroup;
    var Header = /** @class */ (function (_super) {
        __extends(Header, _super);
        function Header() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Header.prototype.renderTable = function () {
            return React.createElement("tr", null,
                React.createElement("td", { height: this.props.height, className: this.props.className + " layout-cell" }, this.props.children));
        };
        Header.prototype.renderFlex = function () {
            var style;
            if (this.props.height) {
                style = { height: this.props.height + "px" };
            }
            return React.createElement("div", { className: "row-fixed " + this.props.className, style: style }, this.props.children);
        };
        Header.prototype.render = function () {
            if (!Sky.browser.quirks) {
                return this.renderFlex();
            }
            return this.renderTable();
        };
        Header.defaultProps = {
            className: ""
        };
        return Header;
    }(React.Component));
    exports.Header = Header;
    var Sider = /** @class */ (function (_super) {
        __extends(Sider, _super);
        function Sider() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Sider.prototype.renderTableQuirks = function () {
            var width = this.props.width;
            if (!width) {
                width = 0;
            }
            return React.createElement("td", { width: width, vAlign: "top", className: "layout-cell " + this.props.className },
                React.createElement("div", { className: "box-full" }, this.props.children));
        };
        Sider.prototype.renderTable = function () {
            return React.createElement("td", { width: this.props.width, vAlign: "top", className: "layout-cell" }, this.props.children);
        };
        Sider.prototype.renderFlex = function () {
            var style;
            if (this.props.width) {
                style = { width: this.props.width + "px" };
            }
            return React.createElement("div", { className: "col-sider " + this.props.className, style: style }, this.props.children);
        };
        Sider.prototype.render = function () {
            if ('atob' in window) {
                return this.renderFlex();
            }
            if (Sky.browser.quirks) {
                return this.renderTableQuirks();
            }
            return this.renderTable();
        };
        Sider.defaultProps = {
            className: ""
        };
        return Sider;
    }(React.Component));
    exports.Sider = Sider;
    var Content = /** @class */ (function (_super) {
        __extends(Content, _super);
        function Content(props, context) {
            var _this = this;
            if (props.className == null) {
                props.className = "";
            }
            _this = _super.call(this, props, context) || this;
            return _this;
        }
        Content.prototype.renderTable = function () {
            return React.createElement("td", { vAlign: "top", className: this.props.className }, this.props.children);
        };
        Content.prototype.renderTableQuirks = function () {
            var className;
            switch (this.props.dirction) {
                case 1:
                    return React.createElement("td", { vAlign: "top", className: "layout-cell" },
                        React.createElement("div", { className: "box-full " + this.props.className }, this.props.children));
                case 2:
                    return React.createElement("tr", null,
                        React.createElement("td", { vAlign: "top", height: "100%", className: "layout-cell" },
                            React.createElement("div", { className: "box-full " + this.props.className }, this.props.children)));
            }
        };
        Content.prototype.renderFlex = function () {
            var className;
            switch (this.props.dirction) {
                case 1:
                    className = "col-center " + this.props.className;
                    break;
                case 2:
                    className = "row-fill " + this.props.className;
                    break;
            }
            return React.createElement("div", { className: className }, this.props.children);
        };
        Content.prototype.render = function () {
            if ('atob' in window) {
                return this.renderFlex();
            }
            if (Sky.browser.quirks) {
                return this.renderTableQuirks();
            }
            if (this.props.dirction == 1) {
                return this.renderTable();
            }
            return this.renderFlex();
        };
        return Content;
    }(React.Component));
    exports.Content = Content;
    exports.Footer = Header;
});
define("ting", ["require", "exports", "ting/button", "ting/icon", "ting/router", "ting/layout"], function (require, exports, button, icon, loader, layout) {
    "use strict";
    return __assign({}, button, icon, loader, layout);
});
