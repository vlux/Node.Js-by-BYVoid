var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });        //调用模板解析引擎，翻译名为index的模板，并传入一个对象作为参数，这个对象只有一个属性，即title:'Express'
});

module.exports = router;
