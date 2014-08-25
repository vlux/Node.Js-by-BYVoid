//P136

var fs = require('fs');
var files =['a.txt','b.txt','c.txt'];

for (var i = 0;i< files.length ;++i)
    fs.readFile(files[i],'utf-8',function(err,contents){
        console.log(files);
        console.log(i);
        console.log(files[i]);
    });


// //输出结果i都是3.但是文件内容都输出了
// 原因：fs.readFile的回调函数中访问到的i都是循环退出以后的，因此不能分辨。
// 而files[i]作为fs.readFile的第一个参数在循环中就传递了，所以文件可以被定位到，而且可以显示到文件的内容
