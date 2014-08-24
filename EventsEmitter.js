//P64

var events = require('events');
var emitter = new events.EventEmitter();

emitter.on('wait_event',function(a,b){
  console.log('listener1',a,b);
});
emitter.on('wait_event',function(arg1,arg2){
  console.log('listener2',arg1,arg2);
});

emitter.emit('wait_event','Vlux',1994);    //字符串需要加''
