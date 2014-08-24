//P75

var http = require('http');
var querystring = require('querystring');

var contents = querystring.stringify({
        name:'vlux';
        email:'vluxyue@gmail.com';
        address:'...';
});

var options={
    host:'',
    path:'',
    method:'POST',
    headers:{
        'Content-Type':'',
        'Content-Length':contents.length;
    }
};

var req = http.request(options,function(res){
        res.setEncoding('utf-8');
        res.on('data',function(data){
            console.log(data);
        });
});

req.write(contents);
req.end();        //Don't forget!!!! 否则服务器将不会收到信息
