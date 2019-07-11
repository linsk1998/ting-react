
var fs=require("fs");
var out=[
	"/*包含常用polyfill、常用工具函数（如ajax等）、AMD模块加载*/",
	"/*此版本不包含DOM查询、DOM批量操作和DOM事件封装*/"
];
out.push(fs.readFileSync(__dirname+"/../skyjs/js/overload.js", 'utf-8'));
out.push(fs.readFileSync(__dirname+"/../skyjs/js/support.js", 'utf-8'));
out.push(fs.readFileSync(__dirname+"/../skyjs/js/data.js", 'utf-8'));
out.push(fs.readFileSync(__dirname+"/../skyjs/js/date.js", 'utf-8'));
out.push(fs.readFileSync(__dirname+"/../skyjs/js/enum-object.js", 'utf-8'));
out.push(fs.readFileSync(__dirname+"/../skyjs/js/inherits-object.js", 'utf-8'));
out.push(fs.readFileSync(__dirname+"/../skyjs/js/function.js", 'utf-8'));
out.push(fs.readFileSync(__dirname+"/../skyjs/js/collection.js", 'utf-8'));
out.push(fs.readFileSync(__dirname+'/../url-polyfill/URLSearchParams.js', 'utf-8'));
out.push(fs.readFileSync(__dirname+'/../url-polyfill/URL.js', 'utf-8'));
out.push(fs.readFileSync(__dirname+"/../skyjs/js/JSON.js", 'utf-8'));
out.push(fs.readFileSync(__dirname+"/../skyjs/js/setImmediate.js", 'utf-8'));
out.push(fs.readFileSync(__dirname+"/../skyjs/js/promise.js", 'utf-8'));
out.push(fs.readFileSync(__dirname+"/../skyjs/js/request.js", 'utf-8'));
out.push(fs.readFileSync(__dirname+"/../skyjs/js/document.js", 'utf-8'));
out.push(fs.readFileSync(__dirname+"/../skyjs/js/currentScript.js", 'utf-8'));
out.push(fs.readFileSync(__dirname+"/../skyjs/js/console.js", 'utf-8'));
out.push(fs.readFileSync(__dirname+"/../skyjs/js/utils-script.js", 'utf-8'));
out.push(fs.readFileSync(__dirname+"/../skyjs/js/utils-ready.js", 'utf-8'));
out.push(fs.readFileSync(__dirname+"/../skyjs/js/utils-array.js", 'utf-8'));
out.push(fs.readFileSync(__dirname+"/../skyjs/js/utils-string.js", 'utf-8'));
out.push(fs.readFileSync(__dirname+"/../skyjs/js/utils-string.js", 'utf-8'));
out.push(fs.readFileSync(__dirname+"/../skyjs/js/utils-object.js", 'utf-8'));
out.push(fs.readFileSync(__dirname+"/../skyjs/js/utils-form.js", 'utf-8'));
out.push(fs.readFileSync(__dirname+'/../sky-loader/loader.js', 'utf-8'));

fs.writeFileSync(__dirname+'/lib/sky-core.js', out.join("\n"), 'utf-8');