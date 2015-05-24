var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url');

var testDir = null;
var server = http.createServer(function(req,res){
	req.pathname = url.parse(req.url).pathname;
	req.query = url.parse(req.url,true).query;
	req.setEncoding('utf8');
    req.on("data",function(chunk){
        if(req.body === undefined)
            req.body = ""
        req.body += chunk
    })
    req.on('end',function(){
    	console.log(req.pathname);
		// 获取注入脚本
		if(req.pathname === '/getInjectScript'){
			res.writeHeader(200, {'Content-Type':'text/javascript;charset=utf-8'});
			var fileString = fs.readFileSync(path.join(__dirname,'source','inject.js'));
			res.end(fileString);
		}
		// 获取测试配置信息
		if(req.pathname === '/getTestConfig'){
			// var cfgFileName = req.query.url.replace(/\//g,':');
			res.writeHeader(200, {'Content-Type':'text/javascript;charset=utf-8'});
			if(!testDir) return;
			/* global testDir */
			var fileString = fs.readFileSync(path.join(testDir,'config.json'));
			var jsonpStr = 'fn('+fileString+')';
			res.end(jsonpStr);
		}
		// 提交测试日志
		if(req.pathname === '/commitLog'){
			res.end('commitLog');
		}
		if(req.pathname === '/openMiddlePage'){
			res.end('middle');
		}
		// 提交测试日志
		if(req.pathname === '/getJquery'){
			res.writeHeader(200, {'Content-Type':'text/javascript;charset=utf-8'});
			var fileString = fs.readFileSync(path.join(__dirname,'source','jquery.js'));
			res.end(fileString);
		}    	
    })

	
	
});
server.listen(80);