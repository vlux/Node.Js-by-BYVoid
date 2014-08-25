//P112


//req.session.user不会有安全问题，因为这个变量只有服务端才能访问到
//req.flash 通过它保存的变量只会在用户当前和下一次的请求中被访问，之后会被清楚，通过它我们可以很方便地实现页面的通知和错误信息显示功能


var crypto = require('crypto');
var User = require('user.js');

module.exports = function(app){
    app.get('/',function(req,res){
        res.render('index',{
            title:'首页'
        });
    });

    app.get('/',function(req,res){
        res.render('reg',{
            title:'用户注册',
        });
    });

    app.post('/reg',checkNotLogin);
    app.post('/reg',function(req,res){
        if(req.body['password-repeat'] != req.body['password']){
            req.flash('error','两次输入口令不一致');
            return res.redirect('/reg');
        }

        //生成口令的散列值
        var md5 = crypto.createHash('md5');
        var password = md5.update(req.body.password).digest('base64');

        var newUser = User({
            name : req.body.username,
            password : password,
        });

        //检查用户是否已经存在
        User.get(newUser.name,function(err,user){        //通过用户名获取已知用户
            if(user)
                err = 'User already exists';
            if(err)
            {
                req.flash('error',err);
                return res.redirect('/reg');
            }
            //如果不存在则新增用户
            newUser.save(function(err){            //将用户对象的修改写入数据库
                if(err)
                {
                    req.flash('error',err);
                    return res.redirect('/reg');
                }
                req.session.user = newUser;        //向回话对象写入了当前用户的信息。我们在后面用来判断用户是否已经登录
                req.flash('success','注册成功');
                res.redirect('/');                    //重定向
            });
        });
    });

    app.dynamicHelpers({            //动态视图助手，通过它我们才能在视图中访问绘画中的用户数据。
        user: function(req,res){
            return req.session.user;
        },
        //增加错误和成功的响应函数
        error: function(req,res){
            var err = req.flash('error');
            if(err.length)
                return err;
            else
                return null;
        }.
        success: function(req,res){
            var succ = req.flash('success');
            if(succ.length)
                return succ;
            else
                return null;
        },
    });

    app.get('/login',checkNotLogin);
    app.get('/login',function(req,res){
        res.render('login',{
            title:'用户登入',
        });
    });

    app.post('/login',checkNotLogin);
    app.post('/login',function(req,res){

        //生成口令的散列值
        var md5 = crypto.createHash('md5');
        var password = md5.update(req.body.password).digest('base64');

        User.get(req.body.username,function(err,user){
            if(!user){
                req.flash('error','用户不存在');
                return res.redirect('/login');
            }
            if(user.password != password){
                req.flash('error','用户口令错误');
                return res.redirect('/login');
            }
            req.session.user = user;
            req.flash('success','登入成功');
            res.redirect('/');
        });
    });

    app.get('/logout',checkLogin);
    app.get('/logout',function(req,res){
        req.session.user = null;
        req.flash('ssuccess','登出成功');
        res.redirect('/');
    });

    app.post('/post',checkLogin);
    app.post('/post',function(req,res){
        var currentUser = req.session.user;
        var post = new Post(currentUser.name,req.body.post);        //req.body.post获取用户发表的内容
        post.save(function(err){
            if(err){
                req.flash('error',err);
                return res.redirect('/');
            }
            req.flash('success','发布成功');
            res.redirect('/u/'+currentUser.name);        //重定向到用户界面
        });
    });

    app.get('/u/:user',function(req,res){
        User.get(req.params.user,function(err,user){        //先检查用户是否存在
            if(!user){
                req.flash('error','用户不存在');
                return res.redirect('/');
            }
            Post.get(user.name,function(err,posts){
                if(err){
                    req.flash('error',err);
                    return res.redirect('/');
                }
                res.render('user',{        //传递给user视图
                    title:user.name,
                    posts:posts,
                });
            });
        });
    });

    app.get('/',function(req,res){
        Post.get(null,function(err,posts){
            if(err)
                posts=[];
            res.render('index',{
                title:'首页',
                posts:posts,
            });
        });
    });

    //同一路径绑定多个响应函数的方法，通过调用next()转移控制权，这种方法叫路由中间件
    //把用户登入状态检查放到路由中间件中，在每个路径前增加路由中间件，即可实现页面权限控制
    function checkNotLogin(req,res,next){
        if(!req.session.user){
            req.flash('error','未登入');
            return res.redirect('/login');
        }
        next();
    }

    function checkLogin(req,res,next){
        if(req.session.user){
            req.flash('error','已登入');
            return res.redirect('/');
        }
        next();
    }


};
