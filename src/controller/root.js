var express = require('express');
var router = express.Router();

// for /

router.get("/", function(req, res, next){
    res.render('image', {});
});

module.exports = router;