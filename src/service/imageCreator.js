const { isDeepStrictEqual } = require('util');

function ImageCreator (){
}

ImageCreator.prototype = {
    resolve(results){
        return results;
    },
    reject(results){
        return results;
    },
    pgnTransform(before){        
        let after = [];
        
        let bracketStart = 0;
        let bracketEnd = 0;        

        //괄호 안 내용 없애기
        for(let i = 0 ; i < before.length ; i++){
            if(before.charAt(i) == '('){
                after.push(before.slice(bracketEnd, i).split());
                bracketStart = i;
            }
            if(before.charAt(i) == ')'){
                bracketEnd = i + 1;
            }
        }
        after.push(before.slice(bracketEnd, before.length).split());

        before = after.join('');
        after = [];
        //console.log('after remove () =' + before);

        bracketStart = 0;
        bracketEnd = 0;   

        //괄호 안 내용 없애기
        for(let i = 0 ; i < before.length ; i++){
            if(before.charAt(i) == '['){
                after.push(before.slice(bracketEnd, i).split());
                bracketStart = i;
            }
            if(before.charAt(i) == ']'){
                bracketEnd = i + 1;
            }
        }
        after.push(before.slice(bracketEnd, before.length).split());

        before = after.join('');
        after = [];
        //console.log('after remove [] =' + before);

        bracketStart = 0;
        bracketEnd = 0;   

        //괄호 안 내용 없애기
        for(let i = 0 ; i < before.length ; i++){
            if(before.charAt(i) == '{'){
                after.push(before.slice(bracketEnd, i).split());
                bracketStart = i;
            }
            if(before.charAt(i) == '}'){
                bracketEnd = i + 1;
            }
        }
        after.push(before.slice(bracketEnd, before.length).split());

        before = after.join('');
        //console.log('after remove {} =' + before);
        //let reBracket = /[(].*(?:(?![(]))[)]/g;
        //let afterstr = before.replaceAll(reBracket, '');

        let afterstr = after.join('');
        return afterstr.trim();
        /* after = [];

        let re = /[0-9]+[.]+[ ]/g;
        afterstr = afterstr.replace(re, '\n'+'$&');
    
        return afterstr;    */     
    },
    getFileName(pgnArray, i, count, currentMove){
        var paddedCount = '';
        if(count < 10){
            paddedCount = '00' + count;
        }
        else if(count < 100){
            paddedCount = '0' + count;
        }
        else{
            paddedCount = count + '';
        }
        var name = '';
        if(pgnArray.length >= 2){
            //console.log('pgnArray[i - 1].indexOf("." > -1) = ' + pgnArray[i - 1].indexOf('.' > -1));
            //console.log(`pgnArray[i] = ${pgnArray[i]}, pgnArray[i-1] = ${pgnArray[i-1]} , pgnArray[i-2] = ${pgnArray[i-2]}`);
            //console.log(`pgnArray[i - 1].indexOf('.' > -1)=${pgnArray[i - 1] && pgnArray[i - 1].indexOf('.') > -1}`);
            //console.log(`pgnArray[i - 2].indexOf('.' > -1)=${pgnArray[i - 2] && pgnArray[i - 2].indexOf('.') > -1}`);
            if(pgnArray[i - 1] && pgnArray[i - 1].indexOf('.') > -1){
                //console.log('move for white');
                name = `${paddedCount}_${currentMove} ${pgnArray[i]}`;
            }
            else if(pgnArray[i - 2] && pgnArray[i - 2].indexOf('.') > -1){
                //console.log('move for black');
                name = `${paddedCount}_${currentMove}.. ${pgnArray[i]}`;
            }
            else{
                name = `${paddedCount}_${currentMove} ${pgnArray[i]}`;
            }
        }
        else{
            name = `${paddedCount}_${currentMove} ${pgnArray[i]}`;
        }
        return name;
    },
    async generateChessImages(pgn, size, orientation){ 
        try{
            //console.log(pgn);
            //console.log(filepath);
            var ChessImageGenerator = require('chess-image-generator');
            var fs = require('fs');
            const { Chess } = require('chess.js');

            var fileSize = size | Number(size.trim()) | 360;
            var ori = Number(orientation) | 0;
            
            var creator = new ImageCreator();

            pgn = creator.pgnTransform(pgn);
            //console.log(`creator.pgnTransform(pgn)=${pgn}`);
            //var path = require('path');
            //var normalized = path.normalize(filepath);
            //console.log('normalized=' + normalized);
            //var imageGenerator = new ChessImageGenerator();

            /* fs.promises.access(normalized)
                .then(() => {
                    console.log('path exists');
                })
                .catch(() => {
                    console.log('path does not exists. I make directory.');
                    fs.mkdirSync(normalized);
                }); */

            //console.log('generateImages');
            /* pgn = `
            1. e4 e5 2. Bc4 Nc6 3. Nf3 h6 4. d3 Bc5 5. O-O Nf6 6. Nc3 O-O 7. Be3 Bxe3 8. fxe3 d6 9. d4 Bg4 10. h3 Bh5 11. g4 Nxg4 12. hxg4 Bxg4 13. Qe1 Kh8 14. Nh2 Bh3 15. Rf3 Qg5+ 16. Rg3 Qh5 17. Be2 Qh4 18. Nf3 Qh5 19. Kf2 f5 20. Nxe5 Qh4 21. Ng6+ Kh7 22. Nxh4 fxe4+ 23. Kg1 g5 24. Rxh3 gxh4 25. Rxh4 Rg8+ 26. Rg4 Rxg4+ 27. Bxg4 Rg8 28. Qh4 Nd8 29. Kf2 Rf8+ 30. Ke2 Nf7 31. Rf1 Kg7 32. Rf6 1-0
            ` */
            //console.log('pgn = ' + typeof pgn);
            var pgnArray = pgn.split(/\s+/);
            //console.log(pgnArray);
            let count = 0;
            
            var bufferArray = [];
            var JSZip = require('jszip');
            var zip = new JSZip();
            
            var currentMove = '';
            for(var i = 0 ; i < pgnArray.length ; i++){
                //console.log(pgnArray[i].indexOf(".")  + ' ' + i + '=' +pgnArray[i]);
                if(pgnArray[i].indexOf(".") == -1){
                    var imageGenerator = new ChessImageGenerator({size:360});
                    var newArray = pgnArray.slice(0, i + 1);
                    //console.log(count + '=' + newArray.join(" "));
                    //var normalPath = path.resolve(path.join(normalized, count + '', ".png"));
                    //console.log(normalPath);
                    /* imageGenerator.loadPGN(newArray.join(" ")) */
                    /*     .then(imageGenerator.generateBuffer().then(buf => { */
                    /*         //console.log(count + '\n' + buf); */
                    /*         console.log('create buffer=' + count); */
                    /*         zip.file(count + '.png', buf); */
                    /*          */
                    /*     })) */
                    /*     .then(console.log('then create buffer=' + count));        */         
                    /* imageGenerator.loadPGN(newArray.join(" "))
                        .then(imageGenerator.generateBuffer()(filepath + '\\' + count + ".png"))
                        .then(console.log(`log PGN = ` + newArray.join(" "))); */
                    /* let runPy = new Promise(function(success, nosuccess) {

                        const spawn = require("child_process").execSync;
                        const pythonProcess = spawn('python3',["/chessimage.py", newArray.join(" ")]);
                        pythonProcess.stdout.on('data', (data) => {
                            console.log(data);
                        });
                    });
 */
                    var { PythonShell } = require('python-shell');
                    var RunPythonScript = async function(scriptPath, args, pythonFile){
                        let options = {
                          mode: 'text',
                          pythonPath: 'python3',
                          pythonOptions: [], 
                          scriptPath: scriptPath,
                          args: args,
                        };
                      
                        return new Promise((resolve,reject) =>{
                            try{
                                PythonShell.run(pythonFile, options, function(err, results) {
                                if (err) {console.log(err);}
                                // results is an array consisting of messages collected during execution
                                //console.log('results', results);                              
                                resolve(results);          
                                }); 
                            }
                            catch{
                                //console.log('error running python code')
                                reject();
                            }
                        })
                    }

                    var results = await RunPythonScript('.', [newArray.join(" "), size, ori], 'chessimage.py');
                    //console.log(results);

                    //const { convert } = require('convert-svg-to-png');
                    const {svg2png} = require('svg-png-converter');
                    let buf = await svg2png({ 
                        input: results.join('').trim(), 
                        encoding: 'buffer', 
                        format: 'png',
                        width: size,
                        height: size,
                        multiplier: 1,
                        quality: 1
                      })
                    //const buf = await convert(results.join(''));
                    
                    /* runPy.then(function(fromRunpy) {
                        console.log(fromRunpy.toString());
                        //res.end(fromRunpy);
                    }); */

                    //+origin
                    //await imageGenerator.loadPGN(newArray.join(" "));
                    
                    //var buf = await imageGenerator.generateBuffer();
                    //-origin
                    var creator = new ImageCreator();
                    zip.file(creator.getFileName(pgnArray, i, count, currentMove) + '.png', buf); 
                    console.log('zip.file=' + creator.getFileName(pgnArray, i, count, currentMove));
                    
                    count++;

                }
                else{
                    currentMove = pgnArray[i];
                }
            }

            var FileSaver = require('file-saver');

            //let zipFileName = 'a.zip';
        // let returnBuffer = null;
            //var blob = await zip.generateAsync({type:"nodebuffer", compression:"DEFLATE"});
            /* zip.generateAsync({type:"nodebuffer", streamFiles:true}).then(function (blob) {
                
                //FileSaver.saveAs(blob, zipFileName);
                console.log('saved file');
                returnBuffer = blob;
                return blob;
            });  */    

            //return returnBuffer;

            /* zip.loadAsync(blob).then(function(contents){
                Object.keys(contents.files).forEach(function(filename) {
                    zip.file(filename).async('nodebuffer').then(function(content) {
                        var dest = path + filename;
                        fs.writeFileSync(dest, content);
                    }); 
                    console.log('in the ZIP=' + filename);
                });
            })  */
            
            //zip.generateAsync({type:'nodebuffer',streamFiles:true})
            //var binaryVal = Buffer.from(blob, 'utf-8');
            //var base64Val = binaryVal.toString('base64');
            //FileSaver.saveAs((await zip.generateAsync({type:'nodebuffer', streamFiles:true})).toString('base64'), "3.zip");


            var crypto = require('crypto');
            var sha1 = crypto.createHash('md5');
            sha1.update(pgn);
            var outname = sha1.digest('hex');
            
            //await zip.generateNodeStream({type:'nodebuffer', streamFiles:true}).pipe(fs.createWriteStream(outname + '.zip')).on('finish', function(){console.log(outname + ".zip finished")});

            return {code:200, filename:outname, filecontent:zip}; // (await zip.generateAsync({type:'nodebuffer', streamFiles:true})).toString('base64');
            //return require('base64-arraybuffer').encode(blob);
        }catch(error){
            console.log(error);
            return {code:500}
        }
    }
}

module.exports = ImageCreator;
