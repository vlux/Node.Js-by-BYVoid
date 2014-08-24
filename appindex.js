//P112


module.exports = function(app){
    app.get('/',function(req,res){
        res.render('index',{
            title:'首页';
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
};
