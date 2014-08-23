//P36

var hello1 = require('./module');
var hello2 = require('./module');
hello1.setname('vlux');
hello2.setname('Jmcus');
hello1.print();

//结果输出hello2的set，覆盖了。
