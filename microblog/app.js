var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoStore = require('connect-mongo');
var setting = require('../setting');

var routes = require('./routes/index');
var users = require('./routes/users');
var hello = require('./routes/hello');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());                    //Cookie解析中间件
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({            //提供会话支持
    secret: new MongoStore({
        db:setting.db            //设置store参数为MongoStore实例，把会话信息存储到数据库中
    })
}));

app.use('/', routes);
app.use('/users', users);
app.use('/hello', hello);            //新加


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
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

app.listen(23333);
console.log('Ops.Successful!');


module.exports = app;
