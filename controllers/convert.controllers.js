const converter = require('../services/converter');
const path = require('path');
const fs = require('fs');
const uuidv4 = require('uuid');

const waitTime = 60 * 60 * 1000; // one hour
const deleteFile = async (filePath, waitTime) => {
	setTimeout(() => {
		fs.unlink(filePath, err => {
			if (err) {
				console.log(err);
			} else {
				console.log('succesfully deleted from the downloads folder')
			}
		})
	}, waitTime);
}

const handleDocxToPdf = async (req, res) => {

	const fileName = req.body.fileName;

    const filePath = 'documents/' + fileName;
    const resultPath = 'documents/'+ uuidv4() +'resultDocxFile.pdf';
    const api = 'https://api.pspdfkit.com/build';
	const docType = "document";

    try{
        // let stream = await converter.convert(filePath, resultPath, api, docType);
        console.log("successfully converted file: " + fileName);

        const resultFilePath = path.resolve(resultPath); 

		stream.on('finish', () => {
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
		});

		deleteFile(resultFilePath, waitTime);
		deleteFile(filePath, waitTime);
        
    }
    catch(error){
        console.log(error);
    }
}

const handleXlsxToPdf = async (req, res) => {

    const fileName = req.body.fileName;

    const filePath = 'documents/' + fileName;
    const resultPath = 'documents/'+ uuidv4() +'resultXlsxFile.pdf';
    const api = 'https://api.pspdfkit.com/build';
	const docType = "document";

    try{
        let stream = await converter.convert(filePath, resultPath, api, docType);
        console.log("successfully converted file: " + fileName);

        const resultFilePath = path.resolve(resultPath);
		stream.on('finish', () => {
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
		});

		deleteFile(resultFilePath, waitTime);
		deleteFile(filePath, waitTime);
        
    }
    catch(error){
        console.log(error);
    }
}

const handlePptxToPdf = async (req, res) => {
	const fileName = req.body.fileName;

    const filePath = 'documents/' + fileName;
    const resultPath = 'documents/'+ uuidv4() +'resultPptxFile.pdf';
    const api = 'https://api.pspdfkit.com/build';
	const docType = "document";

    try{
        let stream = await converter.convert(filePath, resultPath, api, docType);
        console.log("successfully converted file: " + fileName);

        const resultFilePath = path.resolve(resultPath);
		stream.on('finish', () => {
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
		});

		deleteFile(resultFilePath, waitTime);
		deleteFile(filePath, waitTime);
        
    }
    catch(error){
        console.log(error);
    }
}

const handlePngToPdf = async (req, res) => {
	const fileName = req.body.fileName;

    const filePath = 'documents/' + fileName;
    const resultPath = 'documents/'+ uuidv4() +'resultPngFile.pdf';
    const api = 'https://api.pspdfkit.com/build';
	const docType = "image";

    try{
        let stream = await converter.convert(filePath, resultPath, api, docType);
        console.log("successfully converted file: " + fileName);

        const resultFilePath = path.resolve(resultPath);
		stream.on('finish', () => {
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
		});

		deleteFile(resultFilePath, waitTime);
		deleteFile(filePath, waitTime);
        
    }
    catch(error){
        console.log(error);
    }
}

const handlePdfToJpg = async (req, res) => {
	const fileName = req.body.fileName;

    const filePath = 'documents/' + fileName;
    const resultPath = 'documents/'+ uuidv4() +'resultJpgFile.zip';
    const api = 'https://api.pspdfkit.com/build';
	const docType = "document";
	const output = {
		type: "image",
		pages: {"start": 0, "end": -1},
		format: "jpg",
		dpi: 500
	}

    try{
        let stream = await converter.convert(filePath, resultPath, api, docType, output);
        console.log("successfully converted file: " + fileName);

        const resultFilePath = path.resolve(resultPath);

		stream.on('finish', () => {
			fs.readFile(resultFilePath, function(err, data){
                if (err){
                    console.log(err);
                    res.send(400, err);
                }
                else{
                    res.contentType("image/jpg");
                    res.send(data);
                }
            });
		});

		deleteFile(resultFilePath, waitTime);
		deleteFile(filePath, waitTime);
        
    }
    catch(error){
        console.log(error);
    }
}

const handlePdfToPng = async (req, res) => {
	const fileName = req.body.fileName;

    const filePath = 'documents/' + fileName;
    const resultPath = 'documents/'+ uuidv4() +'resultPngFile.zip';
    const api = 'https://api.pspdfkit.com/build';
	const docType = "document";
	const output = {
		type: "image",
		pages: {"start": 0, "end": -1},
		format: "png",
		dpi: 500
	}

    try{
        let stream = await converter.convert(filePath, resultPath, api, docType, output);
        console.log("successfully converted file: " + fileName);

        const resultFilePath = path.resolve(resultPath);

		stream.on('finish', () => {
			fs.readFile(resultFilePath, function(err, data){
                if (err){
                    console.log(err);
                    res.send(400, err);
                }
                else{
                    res.contentType("image/png");
                    res.send(data);
                }
            });
		});

		deleteFile(resultFilePath, waitTime);
		deleteFile(filePath, waitTime);
        
    }
    catch(error){
        console.log(error);
    }
}

const handlePdfToWebp = async (req, res) => {
	const fileName = req.body.fileName;

    const filePath = 'documents/' + fileName;
    const resultPath = 'documents/'+ uuidv4() +'resultWebpFile.zip';
    const api = 'https://api.pspdfkit.com/build';
	const docType = "document";
	const output = {
		type: "image",
		pages: {"start": 0, "end": -1},
		format: "webp",
		dpi: 500
	}

    try{
        let stream = await converter.convert(filePath, resultPath, api, docType, output);
        console.log("successfully converted file: " + fileName);

        const resultFilePath = path.resolve(resultPath);

		stream.on('finish', () => {
			fs.readFile(resultFilePath, function(err, data){
                if (err){
                    console.log(err);
                    res.send(400, err);
                }
                else{
                    res.contentType("image/webp");
                    res.send(data);
                }
            });
		});

		deleteFile(resultFilePath, waitTime);
		deleteFile(filePath, waitTime);
        
    }
    catch(error){
        console.log(error);
    }
}

const handleJpgToPdf = async (req, res) => {
	const fileName = req.body.fileName;

    const filePath = 'documents/' + fileName;
    const resultPath = 'documents/resultJpgFile.pdf';
    const api = 'https://api.pspdfkit.com/build';
	const docType = "image";

    try{
        let stream = await converter.convert(filePath, resultPath, api, docType);
        console.log("successfully converted file: " + fileName);

        const resultFilePath = path.resolve(resultPath);
		stream.on('finish', () => {
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
		});

		deleteFile(resultFilePath, waitTime);
		deleteFile(filePath, waitTime);
        
    }
    catch(error){
        console.log(error);
    }
}


module.exports = {
    handleDocxToPdf,
    handleXlsxToPdf,
	handlePptxToPdf,
	handlePngToPdf,
	handlePdfToJpg,
	handlePdfToPng,
	handlePdfToWebp,
	handleJpgToPdf
}