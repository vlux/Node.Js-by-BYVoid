var express = require('express');
var router = express.Router();

/* GET hello listing. */
router.get('/hello', function(req, res){
    res.send('hello');
});

module.exports = router;
