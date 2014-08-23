//P32

function callback(err,data){
  if(err)
    console.error(err);
  else
    console.log(data);
}

var fs=require('fs');
fs.readFile('file.txt','utf-8',callback);
console.log('end');
