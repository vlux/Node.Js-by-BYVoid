//P96

var users={
    'vlux':{
        name:'Jmcus';
        website:'www.baidu.com';
    }
};

//中间件作用
app.all('/user/:username',function(req,res,next){        //检查用户名是否存在
    if(users[req.params.username])
        next();
    else
        next(new Error(req.params.username + 'does not exits'));
});

app.get('/user/:username',function(req,res){        //用户一定存在，直接展示
    res.send(JSON.stringify(users[req.params.username]));
});

app.put('/user/:username',function(req,res){        //修改用户信息
    res.send('Done');
});
