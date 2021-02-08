var express = require('express');
var router = express.Router();

// for /image

router.get("/", function(req, res, next){
    res.render('image', {});
});

router.get('/download', function(req, res){
    console.log('download start');
    //console.log('router received');
    const ImageCreator = require('../service/imageCreator');
    const util = require('util');

    var creator = new ImageCreator();
    //console.log(typeof creator);
    console.log('req.query=' + util.inspect(req.query));

    creator.generateChessImages(req.query.pgn).then(obj => {
        var code = obj.code;
                
        if(code == 200){
            var filename = obj.filename;
            var zip = obj.filecontent;
            res.setHeader('Content-Disposition', 'attchment; filename=' + filename + '.zip');
            res.set('Content-type', 'application/zip');            
            
            zip.generateNodeStream({type:'nodebuffer', streamFiles:true}).pipe(res.status(200)).on('finish', function(){
                console.log(filename + '.zip successfully written');
                //res.sendStatus(200);
            }); 
            
        }
        else{
            res.status(500).send(obj);
        }
        
    });
    //res.end(imageCreatorJs.generateChessImages(req.query.pgn, req.query.filepath));
});

module.exports = router;