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
define("support/svg-img-plugin", [], function () {
    return {
        load: function (path, require, resolve) {
            var supported = false;
            if ('SVGRect' in window) {
                var imgTest = new Image();
                imgTest.onload = function () {
                    resolve(true);
                };
                imgTest.onerror = function () {
                    resolve(false);
                };
                imgTest.src = "data:image/svg+xml;base64,JTNDc3ZnJTIweG1sbnMlM0QlMjJodHRwJTNBLy93d3cudzMub3JnLzIwMDAvc3ZnJTIyJTIwd2lkdGglM0QlMjI5JTIyJTIwaGVpZ2h0JTNEJTIyOSUyMiUzRSUzQ2NpcmNsZSUyMHIlM0QlMjI0JTIyLyUzRSUzQy9zdmclM0U=";
            }
            resolve(false);
        }
    };
});
define("support/svg-img", ["require", "exports", "support/svg-img-plugin!"], function (require, exports, svg_img_plugin_1) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = svg_img_plugin_1["default"];
});
define("ting/icon", ["require", "exports", "react", "react", "support/apng-supported", "support/webp-animation-supported", "support/svg-img"], function (require, exports, react_1, React, apng_supported_1, webp_animation_supported_1, svg_img_1) {
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
            console.log(children);
            var code = toCodePoint(children);
            var src;
            if (svg_img_1["default"]) {
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
        Icon.prototype.renderSVG = function (size, src, rest) {
            return React.createElement("embed", __assign({ className: "icon", width: size, height: size, src: src }, rest, { type: "image/svg+xml" }));
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
                    return this.renderSVG(size, svg, rest);
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
    }(react_1.Component));
    exports.Icon = Icon;
    function toCodePoint(unicodeSurrogates) {
        console.log(unicodeSurrogates.length);
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
define("ting/utils", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function bindComponentEvent(component, callback) {
        return function (e) {
            callback.call(this, e, component);
        };
    }
    exports.bindComponentEvent = bindComponentEvent;
});
define("ting/button", ["require", "exports", "ting/icon", "ting/utils", "react", "react"], function (require, exports, icon_1, utils_1, react_2, React) {
    "use strict";
    exports.__esModule = true;
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        function Button(props, context) {
            var _this = _super.call(this, props, context) || this;
            _this.state = Sky.pick(props, ['href', 'theme', 'disabled', 'block', 'size']);
            return _this;
        }
        Button.prototype.renderAnchor = function (className, rest) {
            var children = this.props.children;
            if (!rest.href) {
                rest.href = "javascript:void 0";
            }
            if (this.props.icon) {
                className += " btn-multiple";
                children = btnIconChildren(this.props.icon, this.state.size, children);
            }
            return React.createElement("a", __assign({ className: className }, rest), children);
        };
        Button.prototype.renderButton = function (className, rest) {
            var children = this.props.children;
            if (this.props.icon) {
                className += " btn-multiple";
                children = btnIconChildren(this.props.icon, this.state.size, children);
            }
            return React.createElement("button", __assign({ type: "button", className: className }, rest), children);
        };
        Button.prototype.render = function () {
            var attrs = Sky.omit(this.props, ['block', 'size', 'theme']);
            attrs.href = this.state.href;
            attrs.disabled = this.state.disabled;
            var _a = this.state, href = _a.href, theme = _a.theme, disabled = _a.disabled, block = _a.block, size = _a.size;
            var className = "btn";
            if (theme) {
                className += " btn-" + theme;
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
            if (disabled) {
                className += " btn-disabled";
            }
            for (var key in attrs) {
                if (key.startsWith("on")) {
                    attrs[key] = utils_1.bindComponentEvent(this, attrs[key]);
                }
            }
            switch (attrs.type) {
                case "button":
                case "submit":
                    return this.renderButton(className, attrs);
                default:
                    return this.renderAnchor(className, attrs);
            }
        };
        return Button;
    }(react_2.Component));
    exports.Button = Button;
    function btnIconChildren(icon, btnSize, children) {
        var size;
        switch (btnSize) {
            case "lg":
                size = 20;
                break;
            case "sm":
                size = 14;
            case "xs":
                size = 12;
            default:
                size = 16;
        }
        return React.createElement(React.Fragment, null,
            React.createElement(icon_1.Icon, { size: size }, icon),
            React.createElement("span", { className: "btn-label" }, children));
    }
    var ButtonGroup = /** @class */ (function (_super) {
        __extends(ButtonGroup, _super);
        function ButtonGroup() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ButtonGroup.prototype.render = function () {
            return React.createElement("div", { className: "btn-group" }, this.props.children);
        };
        return ButtonGroup;
    }(react_2.Component));
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
    }(react_2.Component));
    exports.ButtonToolbar = ButtonToolbar;
});
define("ting/router", ["require", "exports", "react", "react", "anu"], function (require, exports, react_3, React, anu) {
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
            anu.eventSystem.addEvent(window, 'hashchange', onhashchange);
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
define("ting/grid", ["require", "exports", "react", "react"], function (require, exports, react_4, React) {
    "use strict";
    exports.__esModule = true;
    var style = document.head.style;
    var supportFlexWrap = "flexWrap" in style || "msFlexWrap" in style || "webkitFlexGrow" in style;
    var Row = /** @class */ (function (_super) {
        __extends(Row, _super);
        function Row(props, context) {
            var _this = _super.call(this, props, context) || this;
            _this.cols = NaN;
            return _this;
        }
        Row.prototype.render = function () {
            if (supportFlexWrap) {
                return this.renderFlex();
            }
            else if (Sky.browser.quirks) {
                return this.renderQuirks();
            }
            return this.renderQuirks();
        };
        Row.prototype.renderFlex = function () {
            var style = {};
            if (this.props.gutter) {
                style.marginLeft = -this.props.gutter + "px";
            }
            var children = this.props.children;
            if (Array.isArray(children)) {
                if (isNaN(this.props.cols)) {
                    this.cols = children.reduce(sumCol, 0);
                }
                else {
                    this.cols = this.props.cols;
                }
                children = children.map(childrenToFlex, this);
            }
            return React.createElement("div", { className: "flex flex-row flex-wrap", style: style }, children);
        };
        Row.prototype.renderInlineBlock = function () {
            var gutter = this.props.gutter;
            var children = this.props.children;
            var rowStyle = null;
            if (gutter) {
                rowStyle = {
                    marginLeft: -gutter + "px"
                };
            }
            var rows = [];
            if (Array.isArray(children)) {
                if (isNaN(this.props.cols)) {
                    this.cols = children.reduce(sumCol, 0);
                }
                else {
                    this.cols = this.props.cols;
                }
                var colEle, cols = [];
                var rowEle = React.createElement("div", { className: "row-nowrap", style: rowStyle }, cols);
                rows.push(rowEle);
                var i, curCount = 0;
                for (i = 0; i < children.length; i++) {
                    var child = children[i];
                    var span = child.props.span;
                    curCount = curCount + span;
                    var colStyle = {};
                    if (gutter) {
                        colStyle.borderLeftWidth = this.props.gutter + "px";
                    }
                    colStyle.width = span / this.cols * 100 + "%";
                    colEle = React.createElement("div", { className: "col-inline", style: colStyle }, child);
                    cols.push(colEle);
                    if (curCount + span > this.cols) {
                        curCount = 0;
                        cols = new Array();
                        rowEle = React.createElement("div", { className: "row-nowrap", style: rowStyle }, cols);
                        rows.push(rowEle);
                    }
                }
            }
            return React.createElement(React.Fragment, null, rows);
        };
        Row.prototype.renderQuirks = function () {
            var gutter = this.props.gutter;
            var children = this.props.children;
            var rows = [];
            if (Array.isArray(children)) {
                if (isNaN(this.props.cols)) {
                    this.cols = children.reduce(sumCol, 0);
                }
                else {
                    this.cols = this.props.cols;
                }
                var colEle, cols = [];
                var rowEle = React.createElement("div", { className: "row-nowrap" }, cols);
                rows.push(rowEle);
                var i, curCount = 0;
                if (gutter) {
                    var leftWidths = new Array(this.cols), rightWidths = new Array(this.cols);
                    var avg = gutter * (this.cols - 1) / this.cols;
                    leftWidths[0] = 0;
                    for (i = 0; i < this.cols; i++) {
                        if (i > 0) {
                            leftWidths[i] = timeRound(gutter - rightWidths[i - 1], i);
                        }
                        rightWidths[i] = timeRound(avg - leftWidths[i], i);
                    }
                }
                for (i = 0; i < children.length; i++) {
                    var child = children[i];
                    var span = child.props.span;
                    var colStyle = {};
                    if (gutter) {
                        colStyle.borderLeftWidth = leftWidths[curCount] + "px";
                        colStyle.borderRightWidth = rightWidths[curCount - 1 + span] + "px";
                    }
                    curCount = curCount + span;
                    colStyle.width = span / this.cols * 100 + "%";
                    colEle = React.createElement("div", { className: "col-inline", style: colStyle }, child);
                    cols.push(colEle);
                    if (curCount + span > this.cols) {
                        curCount = 0;
                        cols = new Array();
                        rowEle = React.createElement("div", { className: "row-nowrap" }, cols);
                        rows.push(rowEle);
                    }
                }
            }
            return React.createElement(React.Fragment, null, rows);
        };
        Row.prototype.renderTable = function () {
            var children = [], els = this.props.children;
            var gutter = this.props.gutter;
            if (Array.isArray(els)) {
                if (isNaN(this.props.cols)) {
                    this.cols = els.reduce(sumCol, 0);
                }
                else {
                    this.cols = this.props.cols;
                }
                var i;
                var ths = [], thEle;
                for (i = 0; i < this.cols; i++) {
                    thEle = React.createElement("th", { width: 100 / this.cols + "%" });
                    ths.push(thEle);
                    if (gutter && i < this.cols - 1) {
                        thEle = React.createElement("th", { width: 0, className: "placeholder-h" }, React.createElement("div", { style: { width: gutter + 'px' } }));
                        ths.push(thEle);
                    }
                }
                children.push(React.createElement("thead", null, ths));
                var trs = [], tds = [], tdEle = null;
                var trEle = React.createElement("tr", null, tds);
                trs.push(trEle);
                var curCount = 0;
                for (i = 0; i < els.length; i++) {
                    var child = els[i];
                    var span = child.props.span;
                    curCount = curCount + span;
                    tdEle = React.createElement("td", { colSpan: span + (gutter ? span - 1 : 0), vAlign: 'top' }, child);
                    tds.push(tdEle);
                    if (curCount + span > this.cols) {
                        curCount = 0;
                        tds = new Array();
                        trEle = React.createElement("tr", null, tds);
                        trs.push(trEle);
                    }
                    else if (gutter && curCount < this.cols) {
                        tdEle = React.createElement("td", null, "1");
                        tds.push(tdEle);
                    }
                }
                children.push(React.createElement("tbody", null, trs));
            }
            var tableProps = {
                width: "100%",
                border: 0, cellSpacing: 0, cellPadding: 0,
                className: "layout-table"
            };
            return React.createElement("table", tableProps, children);
        };
        Row.defaultProps = {
            gutter: 0,
            cols: NaN
        };
        return Row;
    }(react_4.Component));
    exports.Row = Row;
    function timeRound(n, i) {
        if (i % 2) {
            return Math.round(n);
        }
        return -Math.round(-n);
    }
    function sumCol(accumulator, curr, idx, arr) {
        return accumulator + curr.props.span;
    }
    function childrenToFlex(child) {
        var style = {};
        if (this.props.gutter) {
            style.borderLeft = this.props.gutter + "px dotted transparent";
        }
        style.width = child.props.span / this.cols * 100 + "%";
        //if(child.props.span){
        //style.MozBoxFlex=style.WebkitBoxFlex=style.msFlex=style.flexGrow=child.props.span;
        //}
        return React.createElement("div", { className: "col-sider", style: style }, child);
    }
    function childrenToTable(child) {
        var style = {};
        if (this.props.gutter) {
            style.borderLeft = this.props.gutter + "px solid transparent";
        }
        style.width = child.props.span / this.cols * 100 + "%";
        //if(child.props.span){
        //style.MozBoxFlex=style.WebkitBoxFlex=style.msFlex=style.flexGrow=child.props.span;
        //}
        return React.createElement("div", { className: "col-sider", style: style }, child);
    }
    var Col = /** @class */ (function (_super) {
        __extends(Col, _super);
        function Col() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Col.prototype.render = function () {
            return this.props.children;
        };
        Col.defaultProps = {
            span: 1
        };
        return Col;
    }(React.Component));
    exports.Col = Col;
});
define("ting", ["require", "exports", "ting/button", "ting/icon", "ting/router", "ting/layout", "ting/grid"], function (require, exports, button_1, icon_2, router_1, layout_1, grid_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    exports.__esModule = true;
    __export(button_1);
    __export(icon_2);
    __export(router_1);
    __export(layout_1);
    __export(grid_1);
});
