var http = require('http'),
	querystring = require('querystring');

var data = {  
    __LASTFOCUS:'',
    __EVENTTARGET:'',
    __EVENTARGUMENT:'',
    __VIEWSTATE:'',
    __EVENTVALIDATION:'/wEWhgECw8ba1AUCyuO//gcCyuO//gcCvbbhRAKMsNW8CQL2/o9eAq/29MQKAsqalKcDAqPk7+kJArqSl7IKArqSl7IKAtOSlbYNAuf49YgNAqiDyrUNAsn+lf0IAqfg7JAJAsibvawNAq+evMkKApau7bACAs+v1JEHAubS/acLAqjW7NUMAoOpkq0KAu/am64NAoj+5NoFAsDbyYAKApeL45sDAtOa2eUMAsqf+ocLAuCi4MoNAoGLoSYC/v+J7AEC/sjTygIC7tzugA0CidWfjgoCr8jEegKYyNb0DQLWg8v/DwKvqbKkDgKEiM3QCALl7+/gCAK7m97KCwKrl/2YDwK7kfKzCgKXzJnrBQKVm/DiDgKg8sW5AQLkwYyOAgK9x9HUCAKoqJrABQL51/emBAKsvePCCQKVxtOuBQKm9K/xCgKAy/yyAQLRyKqKAwKBh/fLAgKym+TxAgKPmKqJAgKskYTFDQLrz9nPDQLXpufJBAKX5bncDQKbnNnhDwLC9sm2BgKmjM+gBwKcx9PUBgKoq8myDgKK8eOqAwLn0+aJAgLooJmdDwK92ZDVCAKk0YKcDQK5vOvpAQLguOy8DQKd2vWzAQKa7sqJAwLZ3uC5CAKt/43WBwLrp9vvDAKoy8n3AQL358f4AgLu4pmJDwLPpdioCAL7tajRCQL78OfbCwKA7ay1AQLUgeGSBQKt6Z7PDwLY4ZuaBwK8iOjGBAKb9fjhBgLf5bneCgKIrtPMDALDvqnyBwKalKb+BgK4vvqgDAKM0ISADgKx9LUSArO04ZkGArbHxA0C0pecQQL/+N21DgL6z4jVBALluv3tCgKStPS+DwKBxttaAuWWgxYCyPnC4g4Cxo6aqQMChPaT/AcCytGGrA4CubK+mAQCjL2UhggC//uO1g8Cl5/rhA0CirGBlw8C+ZTD2wwCzcmPkwkC5Yql/AYCvNuXxwwCqIW9iwgCxNLpuwEClOq7ygYC7rDVvQoCv8+65A4C6/+B3gIC6/+x3gICn/iGswQCtK384QYC3NGxnQwCwpDuKwLLncGkCgLCi9reAw==',
    ddlNameSpace:'ProductQueryContext',
    txtNameSpace:'TongCheng.SOA.Interface.InterVacationQuery.Context',
    ddlMethods:'QueryActivityProductList@QueryActivityProductList@1',
    PageIndex:'1',
    PageSize:'1000',
    ActivityList:'1194',
    PeriodID:'1837',
    Platform:'',
    SellType:'',
    IsOrderbyTime:'false',
    StartDate:'',
    EndDate:'',
    Attribute:'',
    SelectGroup:'false',
    DepartCityId:'',
    GoaldCityId:'',
    ViewGoaldCityId:'',
    LeavelCityId:'',
    OrderBy:'',
    DaysLeast:'',
    DaysMost:'',
    PriceLeast:'',
    PriceMost:'',
    DepartAreaId:'',
    LineIdList:'',
    PublicPlatId:'',
    PageId:'',
    RefId:'',
    LoginKey:'',
    UserId:'',
    UserIp:'',
    CreateDate:'',
    ModuleId:'',
    JoinOtherProject:'',
    QueryType:'',
    btnSubmit:'提交'
};  

data = querystring.stringify(data); 

var opt = {  
    method: "POST",  
    host: "61.155.159.91",  
    port: 8208,  
    path: "/InterVacation/Query/Debug.aspx",  
    headers: {  
        "Content-Type": 'application/x-www-form-urlencoded',  
        "Content-Length": data.length  
    }  
};

var req = http.request(opt, function (res) {
	if(res.statusCode !== 200){
		console.log('error')
		console.log(res.statusCode)
	}
	var body = '';
	res.setEncoding('utf8');
	res.on('data', function(chunk){
        body += chunk;
    }); 
    res.on('end',function(chunk){
    	console.log(body);
    })
});

req.write(data);  
req.end(); 