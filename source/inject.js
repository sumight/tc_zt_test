// var middleWindow = window.open('http://test.ly.com/openMiddlePage');
// middleWindow.postMessage(document.body.innerHtml,'*');
var fn = function(){}
var logArray = [];
var errLogArray = [];
var pageUrl = window.location.toString();

sendJsonp('http://test.ly.com/getJquery');
setTimeout(function(){
	sendJsonp('http://test.ly.com/getTestConfig',{url:pageUrl},loadConfig);
},100);


/**
* 载入配置
* @function loadConfig
* @param {Object} configObj
*/
function loadConfig(configObj){
	testTDK(configObj);
	testHrefFormat(configObj);
	// console.log('normal log',JSON.stringify(logArray));
	console.log('err log',JSON.stringify(errLogArray));
}

/**
* 检测超链接格式
* @function testHrefFormat
* @param {Object} configObj 配置对象
*/
function testHrefFormat(configObj){
	var testPoint = '超链接格式';
	if(!configObj.hrefFormat) return;

	jQuery('a').each(function(){
		testStr(
			configObj.hrefFormat,
			jQuery(this).attr('href'),
			testPoint,
			'href:'+jQuery(this).attr('href')
			)
	})
}

/**
* 检测TDK
* @function testTDK
* @param {Object} configObj 配置对象
*/
function testTDK(configObj){
	var testPoint = 'TDK检测'
	if(!configObj.pageMeta) return;
	if(!configObj.pageMeta.title || configObj.pageMeta.title==='') return;
	if(!configObj.pageMeta.description || configObj.pageMeta.description==='') return;
	if(!configObj.pageMeta.keywords || configObj.pageMeta.keywords==='') return;
	
	testStr(
		jQuery('title').first().text(),
		configObj.pageMeta.title,
		testPoint,
		'title检测'
		);
	testStr(
		jQuery('meta[name=description]').first().attr('content'),
		configObj.pageMeta.description,
		testPoint,
		'description检测'
		);
	testStr(
		jQuery('meta[name=keywords]').first().attr('content'),
		configObj.pageMeta.keywords,
		testPoint,
		'keywords检测'
		);
	console.log('testTDK')
}

/**
* 测试一个字符串，也就是最小的可检测单位
* @function testStr
* @param {String|RegEx} criterion 检测标准
* @param {String} target 检测目标
* @param {String} testPoint 测试点
* @param {String} description 描述
* @param {Object} logItem 日志条目 可选，如果传入了日志条目，测试的结果将添加到改日志条目之上 
*/
function testStr(criterion, target, testPoint, description, logItem){
	if(typeof criterion === 'string'){
		var result = (criterion === target);
	}else{
		var result = (criterion.test(target));
	}
	if(!!logItem){
		logItem.result = logItem.reslult&&result;
		!result && (logItem.description += (';error:'+description));
	}else{
		var logItem = createLogItem(testPoint,description,result);
		/* global logArray */
		logArray.push(logItem);
	}
	if(result === false){
		var errorLogItem = createLogItem(testPoint,description,result);
		/* global errLogArray */
		errLogArray.push(errorLogItem);	
	}
}

/**
* 创建一个log条目
* @function createLogItem
* @param {String} testPoint 测试点
* @param {String} description	描述
* @param {Boolean} testResult 测试结果
* @returns {Object} 返回一个日志条目
*/
function createLogItem(testPoint, description, testResult){
	var logItem = {}
	logItem.date = new Date();
	/* global pageUrl */
	logItem.url = pageUrl;
	logItem.testPoint = testPoint;
	logItem.description = description;
	logItem.testResult = testResult;
	return logItem;
}



/**
* 发送jsonp请求
* @function sendJsonp
* @param {String} url 请求的url
* @param {Object} arguObj 请求参数
* @param {Function} handle 处理函数
* @param {Boolean} defer 是否延迟加载
*/
function sendJsonp(url, arguObj, handle, defer){
	if(!!handle)
		/* global fn */
		fn = handle;
	// 
	var tag = null;
	var script = document.createElement('script');
	// 去除最后的 /
	(url[url.length-1]=='/') && (url=url.substr(0,url.length-1));
	for(key in arguObj){
		// 在url的最后加上？，只加一次
		tag = tag||(url+='?');
		url+=key+'='+arguObj[key]+'&';
	}
	// 去除多余的&
	!!tag&&(url=url.substr(0,url.length-1));

	script.src = url;

	defer&& (script.defer = 'true');

	document.body.appendChild(script);
}