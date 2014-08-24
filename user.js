//P115

var mongodb = require('./db');

function User(user){
    this.name = user.name;
    this.password = user.password;
};
module.exports = User;

User.prototype.save = function save(callback){
    //存入Mongodb的文档
    var user ={
        name : this.name;
        password : this.password;
    };

    mongodb.open(function(err,db){
        if(err)
            return callback(err);
        db.collection('users',function(err,collection){            //读取 users 集合
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.ensureIndex('name',{unique: true});        //为 name 属性添加索引
            collection.insert(user,{safe:true},function(err,user){    //写入user 文档
                mongodb.close();
                callback(err,user);
            });
        });
    });
};

User.get = function get(username,callback){
    mongodb.open(function(err,db){
        if(err)
            return callback(err);
        db.collection('users',function(err,collection){        //读取 users 集合
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.findOne({name:username},function(err,doc){        //查找name属性为username的文档
                mongodb.close();
                if(doc){                                //封装文档为User对象
                    var user = new User(doc);
                    callback(err,user);
                }
                else
                    callback(err,null);
            });
        });
    });
};
