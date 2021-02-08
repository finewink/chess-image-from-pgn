var express = require('express');
var router = express.Router();

// for /enter

router.get("/", function(req, res, next){
    res.render('enter', {});
});

module.exports = router;