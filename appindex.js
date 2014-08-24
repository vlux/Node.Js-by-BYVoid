//P112


module.exports = function(app){
    app.get('/',function(req,res){
        res.render('index',{
            title:'首页',
        })
    });

    app.get('/',function(req,res){
        res.render('reg',{
            title:'用户注册',
        });
    });

    app.post('/reg',function(req,res){
        if(req.body['password-repeat'] != req.body['password']){
            req.flash('error','两次输入口令不一致');
            //req.flash 通过它保存的变量只会在用户当前和下一次的请求中被访问，之后会被清楚，通过它我们可以很方便地实现页面的通知和错误信息显示功能
            return res.redirect('/reg');
        }

        //生成口令的散列值
        var md5 = crypto.createHash('md5');
        var password = md5.update(req.body.password).digest('base64');

        var newUser = User({
            name : req.body.username,
            password : password,
        });

        User.get(newUser.name,function(err,user){        //通过用户名获取已知用户
            if(user)
                err = 'User already exists';
            if(err)
            {
                req.flash('error',err);
                return res.redirect('/reg');
            }
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

    app.get('/login',function(req,res){
        res.render('login',{
            title:'用户登入',
        });
    });

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

    app.get('/logout',function(req,res){
        req.session.user = null;                       //不会有安全问题，因为这个变量只有服务端才能访问到
        req.flash('ssuccess','登出成功');
        res.redirect('/');
    });

};
