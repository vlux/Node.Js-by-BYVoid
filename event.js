//P33

var EventEmitter=require('events').EventEmitter;
var event=new EventEmitter();

event.on('this_event',function(){    //event对象注册了事件；的一个监听器
  console.log('this_event happened');
});

setTimeout(function(){
  event.emit('this_event');
},1500);
