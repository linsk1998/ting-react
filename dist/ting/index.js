//该模块非amd模块，无法使用requirejs
define("apng-supported", [], function () {
    var apng_supported = false;
    var canvas = document.createElement("canvas");
    if (canvas.getContext) {
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
    }
    else {
        return false;
    }
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
    if (canvas.getContext) {
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
    }
    else {
        return false;
    }
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
    var routers = new Set();
    ;
    var Route = /** @class */ (function (_super) {
        __extends(Route, _super);
        function Route(props, context) {
            var _this = this;
            if (props.location == void 0) {
                props.location = "";
            }
            if (props.path == void 0) {
                props.path = "";
            }
            _this = _super.call(this, props, context) || this;
            _this.checkChild(_this.props.children, props.location + props.path);
            _this.isLoading = false;
            return _this;
        }
        Route.prototype.componentWillUnmount = function () {
            routers["delete"](this);
        };
        Route.prototype.componentWillMount = function () {
            routers.add(this);
        };
        Route.prototype.render = function () {
            var curPath;
            if (this.state && this.state.currentPath != void 0) {
                curPath = this.state.currentPath;
            }
            else {
                curPath = currentPath();
            }
            var mypath = this.props.location + this.props.path;
            if ((curPath + "/").startsWith(mypath + "/")) {
                if (this.props.component) {
                    return React.createElement(this.props.component, this.props, this.props.children);
                }
                else if (this.state && this.state.component) {
                    return React.createElement(this.state.component, this.props, this.props.children);
                }
                else if (this.props.require && !this.isLoading) {
                    this.isLoading = true;
                    var me = this;
                    window.require([this.props.require], function (module) {
                        me.setState({ component: module });
                    });
                }
                return this.props.children;
            }
            return null;
        };
        Route.prototype.checkChild = function (children, location) {
            children.forEach && children.forEach(function (child) {
                if (child.props) {
                    if (child.type === Route) {
                        child.props.location = location;
                    }
                    else {
                        this.checkChild(child.props.children, location);
                    }
                }
            }, this);
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
            if ('onhashchange' in window) {
                return React.createElement("a", __assign({ href: "#" + to }, rest));
            }
            return React.createElement("a", __assign({ href: "#" + to }, rest, { onClick: linkClickHandle }));
        };
        return Link;
    }(react_3.Component));
    exports.Link = Link;
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
    if ('onhashchange' in window) {
        window.onload = window.onhashchange = function () {
            detach(currentPath());
        };
    }
    function detach(path) {
        routers.forEach(function (router) {
            router.setState({ currentPath: path });
        });
    }
    new Promise(function (resolve_1, reject_1) { require(['ting'], resolve_1, reject_1); }).then(function (moment) {
        console.log(moment);
    });
});
define("ting", ["require", "exports", "ting/button", "ting/icon", "ting/router"], function (require, exports, button, icon, loader) {
    "use strict";
    return __assign({}, button, icon, loader);
});
