//P37

function Hello(){
    var name;

    this.setname=function(Name){
      name=Name;
    };
    this.print=function(){
      console.log('Hello '+name);
    };
};

module.exports=Hello;    //在外部引用该模块时，其接口对象就是要输出的Hello对象本身，而不是下面的exports

//exports.Hello=Hello
