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
define("support/apng-supported-plugin", [], function () {
    return {
        load: function (path, require, resolve) {
            var apng_supported = false;
            var canvas = document.createElement("canvas");
            if (!canvas.getContext) {
                resolve(false);
                return;
            }
            var apngTest = new Image();
            var ctx = canvas.getContext("2d");
            apngTest.onload = function () {
                ctx.drawImage(this, 0, 0);
                resolve(ctx.getImageData(0, 0, 1, 1).data[3] === 0);
            };
            apngTest.onerror = function () {
                resolve(false);
            };
            apngTest.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACGFjVEwAAAABAAAAAcMq2TYAAAANSURBVAiZY2BgYPgPAAEEAQB9ssjfAAAAGmZjVEwAAAAAAAAAAQAAAAEAAAAAAAAAAAD6A+gBAbNU+2sAAAARZmRBVAAAAAEImWNgYGBgAAAABQAB6MzFdgAAAABJRU5ErkJggg==";
        }
    };
});
define("support/apng-supported", ["require", "exports", "support/apng-supported-plugin!"], function (require, exports, apng_supported_plugin_1) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = apng_supported_plugin_1["default"];
});
define("support/webp-animation-supported-plugin", [], function () {
    return {
        load: function (path, require, resolve) {
            var webp_supported = false;
            var canvas = document.createElement("canvas");
            if (!canvas.getContext) {
                resolve(false);
                return;
            }
            var webpTest = new Image();
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
        }
    };
});
define("support/webp-animation-supported", ["require", "exports", "support/webp-animation-supported-plugin!"], function (require, exports, webp_animation_supported_plugin_1) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = webp_animation_supported_plugin_1["default"];
});
define("ting/icon", ["require", "exports", "react", "react", "support/apng-supported", "support/webp-animation-supported"], function (require, exports, react_2, React, apng_supported_1, webp_animation_supported_1) {
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
                if (apng && apng_supported_1["default"]) {
                    return this.renderImg(size, apng, rest);
                }
                if (awebp && webp_animation_supported_1["default"]) {
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
    var style = document.head.style;
    exports.supportFlex = "order" in style || "msFlexOrder" in style || "webkitBoxOrdinalGroup" in style; // || "MozBoxOrdinalGroup" in style;
    exports.isQuirks = Sky.browser.quirks;
    ;
    ;
    ;
    ;
    var Layout = /** @class */ (function (_super) {
        __extends(Layout, _super);
        function Layout() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Layout.prototype.render = function () {
            var children = this.props.children;
            if (Array.isArray(children)) {
                var dir;
                var i = children.length;
                while (i-- > 0) {
                    var child = children[i];
                    if (child.type == Header || child.type == exports.Footer) {
                        dir = 2 /* V */;
                        return React.createElement(VGroup, __assign({}, this.props), this.props.children);
                    }
                    else if (child.type == Sider) {
                        dir = 1 /* H */;
                        return React.createElement(HGroup, __assign({}, this.props), this.props.children);
                    }
                }
            }
            return React.createElement("div", null, children);
        };
        Layout.defaultProps = {
            className: ""
        };
        return Layout;
    }(React.Component));
    exports.Layout = Layout;
    var VGroup = /** @class */ (function (_super) {
        __extends(VGroup, _super);
        function VGroup() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        VGroup.prototype.render = function () {
            if (this.props.height != "auto") {
                if (exports.supportFlex) {
                    return this.renderFlex();
                }
                else if (exports.isQuirks) {
                    return this.renderTableQuirks();
                }
            }
            return this.renderDiv();
        };
        VGroup.prototype.renderFlex = function () {
            var className = this.props.className + " col-flex";
            var children = this.props.children;
            if (Array.isArray(children)) {
                children = children.map(childrenToFlexV, this);
            }
            var style = {};
            var height = this.props.height;
            if (height) {
                if (isNaN(height)) {
                    style.height = height;
                }
                else {
                    style.height = height + "px";
                }
            }
            else {
                className += " layout-full";
            }
            return React.createElement("div", { className: className, style: style }, children);
        };
        VGroup.prototype.renderTableQuirks = function () {
            var children = this.props.children;
            var height = this.props.height;
            if (!height) {
                height = "100%";
            }
            var tableProps = {
                width: "100%", height: height,
                border: 0, cellSpacing: 0, cellPadding: 0,
                className: this.props.className
            };
            if (Array.isArray(children)) {
                return React.createElement("table", tableProps, React.createElement("tbody", null, children.map(childrenToTrQuirks, this)));
            }
            else {
                return React.createElement("div", null, children);
            }
        };
        VGroup.prototype.renderDiv = function () {
            var className = this.props.className;
            var children = this.props.children;
            if (Array.isArray(children)) {
                children = children.map(childrenToDivV, this);
            }
            var style = {};
            var height = this.props.height;
            if (height) {
                if (isNaN(height)) {
                    style.height = height;
                }
                else {
                    style.height = height + "px";
                }
            }
            return React.createElement("div", { className: className, style: style }, children);
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
        HGroup.prototype.render = function () {
            if (exports.supportFlex) {
                return this.renderFlex();
            }
            else if (exports.isQuirks) {
                if (this.props.height != "auto") {
                    return this.renderTableQuirks();
                }
            }
            return this.renderTable();
        };
        HGroup.prototype.renderFlex = function () {
            var className = this.props.className + " row-flex";
            var children = this.props.children;
            if (Array.isArray(children)) {
                children = children.map(childrenToFlexH, this);
            }
            var height = this.props.height;
            var style = {};
            if (height) {
                if (isNaN(height)) {
                    style.height = height;
                }
                else {
                    style.height = height + "px";
                }
            }
            else {
                className += " layout-full";
            }
            return React.createElement("div", { className: className, style: style }, children);
        };
        HGroup.prototype.renderTableQuirks = function () {
            var children = this.props.children;
            var height = this.props.height;
            if (!height) {
                height = "100%";
            }
            var tableProps = {
                width: "100%", height: height,
                border: 0, cellSpacing: 0, cellPadding: 0,
                className: "layout-table"
            };
            if (Array.isArray(children)) {
                return React.createElement("table", tableProps, React.createElement("tbody", null, React.createElement("tr", null, children.map(childrenToTdQuirks, this))));
            }
            else {
                return React.createElement("div", null, children);
            }
        };
        HGroup.prototype.renderTable = function () {
            var children = this.props.children;
            var tableProps = {
                width: "100%", height: this.props.height,
                border: 0, cellSpacing: 0, cellPadding: 0,
                className: "layout-table"
            };
            if (Array.isArray(children)) {
                return React.createElement("table", tableProps, React.createElement("tbody", null, React.createElement("tr", null, children.map(childrenToTd, this))));
            }
            else {
                return React.createElement("div", null, children);
            }
        };
        HGroup.defaultProps = {
            className: ""
        };
        return HGroup;
    }(React.Component));
    exports.HGroup = HGroup;
    function childrenToTrQuirks(child) {
        switch (child.type) {
            case Layout:
            case Content:
                return React.createElement("tr", null,
                    React.createElement("td", { height: "100%" },
                        React.createElement("div", { className: child.props.className + " layout-vfull" }, child)));
            default:
                var className = child.props.className;
                if (child.props.height) {
                    className += " layout-vfull";
                }
                return React.createElement("tr", null,
                    React.createElement("td", { height: child.props.height },
                        React.createElement("div", { className: className }, child)));
        }
    }
    function childrenToTdQuirks(child) {
        switch (child.type) {
            case Layout:
                return React.createElement("td", { vAlign: "top", width: "100%" }, child);
            case Content:
                return React.createElement("td", { vAlign: "top", width: "100%" },
                    React.createElement("div", { className: child.props.className + " layout-vfull" }, child));
            default:
                var style;
                if (child.props.width) {
                    style = {};
                    if (isNaN(child.props.width)) {
                        style.width = child.props.width;
                    }
                    else {
                        style.width = child.props.width + "px";
                    }
                }
                return React.createElement("td", { vAlign: "top" },
                    React.createElement("div", { style: style, className: child.props.className + " layout-vfull" }, child));
        }
    }
    function childrenToTd(child) {
        switch (child.type) {
            case Layout:
                if (this.props.height == "auto") {
                    child.props.height = "auto";
                }
                return React.createElement("td", { vAlign: "top", width: "100%" }, child);
            case Content:
                return React.createElement("td", { vAlign: "top", width: "100%", className: child.props.className }, child);
            default:
                var style;
                var className = child.props.className;
                if (child.props.width) {
                    style = {};
                    if (isNaN(child.props.width)) {
                        style.width = child.props.width;
                    }
                    else {
                        style.width = child.props.width + "px";
                    }
                }
                return React.createElement("td", { vAlign: "top", className: className },
                    React.createElement("div", { style: style, className: "layout-vfull" }, child));
        }
    }
    function childrenToDivV(child) {
        switch (child.type) {
            case Layout:
                if (this.props.height == "auto") {
                    child.props.height = "auto";
                }
            case Content:
                return React.createElement("div", { className: child.props.className }, child);
            default:
                var style;
                if (child.props.height) {
                    style = { height: child.props.height + "px" };
                }
                return React.createElement("div", { className: child.props.className, style: style }, child);
        }
    }
    function childrenToFlexV(child) {
        switch (child.type) {
            case Layout:
                child.props.className += " row-fill";
                return child;
            case Content:
                return React.createElement("div", { className: child.props.className + " row-fill" }, child);
            default:
                var style;
                if (child.props.height) {
                    style = { height: child.props.height + "px" };
                }
                return React.createElement("div", { className: child.props.className + " row-fixed", style: style }, child);
        }
    }
    function childrenToFlexH(child) {
        switch (child.type) {
            case Layout:
                if (this.props.height == "auto") {
                    child.props.height = "auto";
                }
                child.props.className += " col-center";
                return child;
            case Content:
                return React.createElement("div", { className: child.props.className + " col-center" }, child);
            default:
                var style;
                if (child.props.width) {
                    style = { width: child.props.width + "px" };
                }
                return React.createElement("div", { className: child.props.className + " col-sider", style: style }, child);
        }
    }
    var Header = /** @class */ (function (_super) {
        __extends(Header, _super);
        function Header() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Header.prototype.render = function () {
            return this.props.children;
        };
        Header.defaultProps = {
            className: ""
        };
        return Header;
    }(React.Component));
    exports.Header = Header;
    exports.Footer = Header;
    var Sider = /** @class */ (function (_super) {
        __extends(Sider, _super);
        function Sider() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Sider.prototype.render = function () {
            return this.props.children;
        };
        Sider.defaultProps = {
            className: ""
        };
        return Sider;
    }(React.Component));
    exports.Sider = Sider;
    var Content = /** @class */ (function (_super) {
        __extends(Content, _super);
        function Content() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Content.prototype.render = function () {
            return this.props.children;
        };
        Content.defaultProps = {
            className: ""
        };
        return Content;
    }(React.Component));
    exports.Content = Content;
});
define("ting", ["require", "exports", "ting/button", "ting/icon", "ting/router", "ting/layout"], function (require, exports, button, icon, loader, layout) {
    "use strict";
    return __assign({}, button, icon, loader, layout);
});
