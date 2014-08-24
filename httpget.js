//P76

var http = require('http');

http.get({host:''},function(res){
    res.setEncoding('utf-8');
    res.on('data',function(data){
        console.log(data);
    });
});
