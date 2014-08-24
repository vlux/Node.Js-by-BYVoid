var express = require('express');
var router = express.Router();

/* GET helo listing. */
router.get('/',function(req,res){
    res.send('U are Successful!');
});

module.exports = router;
