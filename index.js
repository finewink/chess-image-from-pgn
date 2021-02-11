/* function generateImages(pgn){
    var ChessImageGenerator = require('chess-image-generator');
    //var imageGenerator = new ChessImageGenerator();

    pgn = `
    1. e4 e5 2. Bc4 Nc6 3. Nf3 h6 4. d3 Bc5 5. O-O Nf6 6. Nc3 O-O 7. Be3 Bxe3 8. fxe3 d6 9. d4 Bg4 10. h3 Bh5 11. g4 Nxg4 12. hxg4 Bxg4 13. Qe1 Kh8 14. Nh2 Bh3 15. Rf3 Qg5+ 16. Rg3 Qh5 17. Be2 Qh4 18. Nf3 Qh5 19. Kf2 f5 20. Nxe5 Qh4 21. Ng6+ Kh7 22. Nxh4 fxe4+ 23. Kg1 g5 24. Rxh3 gxh4 25. Rxh4 Rg8+ 26. Rg4 Rxg4+ 27. Bxg4 Rg8 28. Qh4 Nd8 29. Kf2 Rf8+ 30. Ke2 Nf7 31. Rf1 Kg7 32. Rf6 1-0
    `

    const pgnArray = pgn.split(" ");
    let count = 0;

    for(var i = 0 ; i < pgnArray.length ; i++){
        console.log(pgnArray[i].indexOf(".")  + ' ' + i + '=' +pgnArray[i]);
        if(pgnArray[i].indexOf(".") == -1){
            var imageGenerator = new ChessImageGenerator({size:360});
            var newArray = pgnArray.slice(0, i + 1);
            console.log(count + '=' + newArray.join(" "));
            imageGenerator.loadPGN(newArray.join(" ")).then(imageGenerator.generatePNG("c:\\node\\chessimage\\" + count + ".png")).then(console.log(`log PGN = ` + newArray.join(" ")));
            count++;

        }
    }
} */

/* var welcome = require("./welcome");
var welcomeContent = welcome.webContent;
var enterConverter = require("./enter.js");
var enterContent = enterConverter.webContent;
var imageCreator = require("./imageCreator");
var imageContent = imageCreator.webContent;
 */

/* var menu = require('./menu');
 */
const express = require('express');
const ejs = require('ejs');
const util = require('util');
const path = require('path');
const app = express();
const router = express.Router();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,  '/static')));

var rootRouter = require('./src/controller/root');
var imageRouter = require('./src/controller/image');
var enterRouter = require('./src/controller/enter');

app.use('/', rootRouter);
app.use('/image', imageRouter);
app.use('/enter', enterRouter);
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
//console.log(require('./imageCreator').generateChessImages);

console.log('App start');
  
router.get('/', function (req, res) {
    res.render('image', {});
});
/* 
app.get('/func/image', function(req, res){
    //console.log('router received');
    const ImageCreator = require('./imageCreator');
    var creator = new ImageCreator();
    //console.log('req=' + util.inspect(req));
    console.log('req.query=' + util.inspect(req.query));

    //res.send({result:imageCreatorJs.generateChessImages(req.query.pgn, req.query.filepath)});
    creator.generateChessImages(req.query.pgn).then(obj => {
        //console.log(util.inspect(buf));
        var code = obj.code;
        
        
        if(code == 200){
            var filename = obj.filename;
            var zip = obj.filecontent;
            res.setHeader('Content-Disposition', 'attchment; filename=' + filename + '.zip');
            res.set('Content-type', 'application/zip');            
            
            zip.generateNodeStream({type:'nodebuffer', streamFiles:true}).pipe(res.status(200)).on('finish', function(){
                console.log(filename + '.zip successfully written');
                res.sendStatus(200);
            }); 
            
        }
        else{
            res.sendStatus(500).send(obj);
            //res.send(obj);
        }
        
        //console.log(util.inspect(res));
    });
    //res.end(imageCreatorJs.generateChessImages(req.query.pgn, req.query.filepath));
});

app.get('/enter', function(req, res){
    res.render('enter', {});
});

app.get('/image', function(req, res){
    res.render('image', {});
});
 */
  
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  
  console.log('Server is working : PORT - ',port);
});

module.exports = router;
