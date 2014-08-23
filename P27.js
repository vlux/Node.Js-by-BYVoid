var http=require('http');
http.createServer(function(req,res){    //res.req如果打反了就跪了
  res.writeHead(200,{'Content-Type':'text/html'});
  res.write('<h1>Hello Node.js</h1>');
  res.end('<h2>I\'m Jmcus</h2>');
}).listen(23333);
console.log("Ops.Successful!");
