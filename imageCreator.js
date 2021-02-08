const { isDeepStrictEqual } = require('util');

function ImageCreator (){
}

ImageCreator.prototype = {

    generate(){
        const pgn = $('#pgn').val();

        const result = generateImages(pgn);

        $('#result').innerHTML = result;
    },
    /* 
    function isIE() {
        return (navigator.appName === 'Netscape' && navigator.userAgent.search('Trident') !== -1) ||
            navigator.userAgent.toLowerCase().indexOf("msie") !== -1;
    }

    function saveToFile_IE(fileName, content) {
        var blob = new Blob([content], { type: "text/plain", endings: "native" });
        window.navigator.msSaveBlob(blob, fileName);
        //window.navigator.msSaveOrOpenBlob(blob, fileName);
    }

    function saveToFile_Chrome(fileName, content) {
        var blob = new Blob([content], { type: 'text/plain' });
        objURL = window.URL.createObjectURL(blob);
                
        // 이전에 생성된 메모리 해제
        if (window.__Xr_objURL_forCreatingFile__) {
            window.URL.revokeObjectURL(window.__Xr_objURL_forCreatingFile__);
        }
        window.__Xr_objURL_forCreatingFile__ = objURL;
        var a = document.createElement('a');
        a.download = fileName;
        a.href = objURL;
        a.click();
    }
    */

    async generateChessImages(pgn){
        try{
            console.log(pgn);
            //console.log(filepath);
            var ChessImageGenerator = require('chess-image-generator');
            var fs = require('fs');
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

            const pgnArray = pgn.split(" ");
            let count = 0;
            
            const bufferArray = [];
            var JSZip = require('jszip');
            var zip = new JSZip();

            for(var i = 0 ; i < pgnArray.length ; i++){
                //console.log(pgnArray[i].indexOf(".")  + ' ' + i + '=' +pgnArray[i]);
                if(pgnArray[i].indexOf(".") == -1){
                    var imageGenerator = new ChessImageGenerator({size:360});
                    var newArray = pgnArray.slice(0, i + 1);
                    console.log(count + '=' + newArray.join(" "));
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
                    await imageGenerator.loadPGN(newArray.join(" "));
                    var buf = await imageGenerator.generateBuffer();
                    zip.file(count + '.png', buf); 
                    
                    count++;

                }
            }

            var FileSaver = require('file-saver');


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
