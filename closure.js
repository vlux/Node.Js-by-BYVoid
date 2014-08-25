//P151

var closure = function(){
    var count = 0;
    var get = function(){
        count ++;
        return count;
    };
    return get;
};

var counter = closure();
console.log(counter());    //输出1
console.log(counter());    //输出2
console.log(counter());    //输出3
