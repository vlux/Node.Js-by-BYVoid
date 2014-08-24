//P73


var http = require('http');
var querystring = require('querystring');
var util = require('util');

http.createServer(function(req,res){
    var post = '';

    req.on('data',function(chunk){        //通过req的data事件监听函数，每当接收到请求体的数据，累加到post变量中
        post += chunk;
    });

    req.on('end',function(){            //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回
        post = querystring.parse(post);
        res.end(util.inspect(post));
    });
}).listen(23333);
