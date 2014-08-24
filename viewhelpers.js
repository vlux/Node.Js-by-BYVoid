//P101

var util = require('util');

app.helpers({
    inspect:function(obj){
        return util.inspect(obj,true);
    }
});

app.dynamicHelpers({
    headers: function(req,res){
        return req.headers;
    }
});

app.get('/helper',function(req,res){
    res.render('helper',{
        title:'Helpers'
    });
});
