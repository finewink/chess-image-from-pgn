var express = require('express');
var router = express.Router();

// for /image

router.get("/", function(req, res, next){
    res.render('image', {});
});

router.get('/download', function(req, res){
    try{

    
        //console.log('download start');
        //console.log('router received');
        const ImageCreator = require('../service/imageCreator');
        const util = require('util');
        const urlencoder = require('urlencode');

        var creator = new ImageCreator();
        //console.log(typeof creator);
        //console.log('req.query=' + util.inspect(req.query));
        console.log('RECV>' + urlencoder.decode(req.query.size));
        console.log('RECV>' + urlencoder.decode(req.query.pgn));

        creator.generateChessImages(urlencoder.decode(req.query.pgn), req.query.size, req.query.orientation).then(obj => {
            var code = obj.code;
                    
            if(code == 200){
                var filename = obj.filename;
                var zip = obj.filecontent;
                res.setHeader('Content-Disposition', 'attchment; filename=' + filename + '.zip');
                res.set('Content-type', 'application/zip');            
                /* zip.generateAsync({type:'nodebuffer'}).then(function(buf){
                    let buffer = Buffer.from(buf);
                    let arraybuffer = Uint8Array.from(buffer).buffer;
                    console.log(util.inspect(arraybuffer));
                    console.log(typeof arraybuffer);
                    res.send(arraybuffer);
                }); */
                zip.generateNodeStream({type:'nodebuffer', streamFiles:true}).pipe(res.status(200)).on('finish', function(){
                    console.log(filename + '.zip successfully written');
                    //res.sendStatus(200);
                    //res.cookie();
                });
                
            }
            else{
                res.status(500).send(obj);
            }
            
        });
        //res.end(imageCreatorJs.generateChessImages(req.query.pgn, req.query.filepath));
    }catch(err){
        console.log(err);
    }
});

module.exports = router;