const converter = require('../services/converter');
const path = require('path');
const fs = require('fs');

const handleDocxToPdf = async (req, res) => {

    const filePath = 'documents/docxFile.docx';
    const resultPath = 'documents/resultDocxFile.pdf';
    const api = 'https://api.pspdfkit.com/build';

    try{
        await converter.convert(filePath, resultPath, api, "document");
        console.log("successfully converted file");

        const resultFilePath = path.resolve(resultPath);

        // waiting one second for the result file to be fully overwritten by the new result
        setTimeout(() => {
            console.log("waited for 1 second...");
            console.log(fs.existsSync(resultPath));
            fs.readFile(resultFilePath, function(err, data){
                if (err){
                    console.log(err);
                    res.send(400, err);
                }
                else{
                    res.contentType("application/pdf");
                    res.send(data);
                }
            });
        }, 1000);
        
    }
    catch(error){
        console.log(error);
    }
}

const handleXlsxToPdf = async (req, res) => {

    const filePath = 'documents/xlsxFile.xlsx';
    const resultPath = 'documents/resultXlsxFile.pdf';
    const api = 'https://api.pspdfkit.com/build';

    try{
        await converter.convert(filePath, resultPath, api, "document");
        console.log("successfully converted file");

        const resultFilePath = path.resolve(resultPath);

        // waiting one second for the result file to be fully overwritten by the new result
        setTimeout(() => {
            console.log("waited for 1 second...");
            console.log(fs.existsSync(resultPath));
            fs.readFile(resultFilePath, function(err, data){
                if (err){
                    console.log(err);
                    res.send(400, err);
                }
                else{
                    res.contentType("application/pdf");
                    res.send(data);
                }
            });
        }, 1000);
        
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    handleDocxToPdf,
    handleXlsxToPdf,
}