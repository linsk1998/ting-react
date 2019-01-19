
var fs=require("fs");
var out=[
	"/*包含常用polyfill、常用工具函数（如ajax等）、AMD模块加载*/",
	"/*此版本不包含DOM查询、DOM批量操作和DOM事件封装*/"
];
out.push(fs.readFileSync(__dirname+"/../skyjs/js/overload.js", 'utf-8'));
out.push(fs.readFileSync(__dirname+"/../skyjs/js/core.js", 'utf-8'));
out.push(fs.readFileSync(__dirname+"/../skyjs/js/extend.js", 'utf-8'));
out.push(fs.readFileSync(__dirname+"/../skyjs/js/promise.js", 'utf-8'));
out.push(fs.readFileSync(__dirname+"/../skyjs/js/browser.js", 'utf-8'));
out.push(fs.readFileSync(__dirname+"/../skyjs/js/storage.js", 'utf-8'));
out.push(fs.readFileSync(__dirname+"/../skyjs/js/network.js", 'utf-8'));
out.push(fs.readFileSync(__dirname+"/../skyjs/js/script.js", 'utf-8'));
out.push(fs.readFileSync(__dirname+"/../skyjs/js/utils.js", 'utf-8'));
out.push(fs.readFileSync(__dirname+"/../skyjs/js/dom.js", 'utf-8'));
out.push(fs.readFileSync(__dirname+'/../url-polyfill/URLSearchParams.js', 'utf-8'));
out.push(fs.readFileSync(__dirname+'/../url-polyfill/URL.js', 'utf-8'));
out.push(fs.readFileSync(__dirname+'/../sky-loader/loader.js', 'utf-8'));

fs.writeFileSync(__dirname+'/lib/sky-core.js', out.join("\n"), 'utf-8');