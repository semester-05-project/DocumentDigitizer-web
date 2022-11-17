const merger = require('../services/merger');
const ocr = require('../services/ocr');
const split = require('../services/split');
const remove = require('../services/remove');

const fs = require('fs');
const uuidv4 = require('uuid');
const path = require('path');
const PDFDocument = require('pdf-lib').PDFDocument;

const waitTime = 1 * 60 * 1000; // one minute
const deleteFile = async (filePath, waitTime) => {
	setTimeout(() => {
		fs.unlink(filePath, err => {
			if (err) {
				console.log(err);
			} else {
				console.log('succesfully deleted from the documents folder')
			}
		})
	}, waitTime);
}

const mergePdfs = async (req, res) => {
	const num_of_files = req.files.length;
	
	let bufferArray = [];
	for (let i = 0; i < num_of_files; i += 1){
		let file = req.files[i].path;
		let buffer = fs.readFileSync(file);
		bufferArray.push(buffer);
		fs.unlink(file, err => {
			if (err) {
				console.log(err);
			} else {
				console.log('succesfully deleted from the downloads folder')
			}
		});
	}
	// const file1 = req.files[0].path;
	// const file2 = req.files[1].path;

	// let buffer1 = fs.readFileSync(file1);
	// let buffer2 = fs.readFileSync(file2);

	const path = await merger.merge(bufferArray, `mergedFile.pdf`);

	fs.readFile(path, function(err, data){
		if (err){
			console.log(err);
			res.send(400, err);
		}
		else{
			res.contentType("application/pdf");
			res.send(data);
		}
	});

	deleteFile(path, waitTime);
}

const ocrDocs = async (req, res) => {
	const path = `documents/${req.body.fileName}`;
	
	let data = await ocr.ocr_with_tesseract(path);
	console.log(data);
	res.send(data);

	deleteFile(path, waitTime);
}

const splitFiles = async (req, res) => {
	const file = req.file;
	const absPath = path.resolve(file.path);
	const folderName = path.parse(file.filename).name;

	let outputStream = await split.splitPdf(absPath, folderName);

	const outputFilePath = `documents/${folderName}.zip`

	outputStream.on('finish', () => {
		let data = fs.readFileSync(outputFilePath);
		// console.log(data);
		res.send(data);
	});

	deleteFile(file.path, waitTime);
	deleteFile(outputFilePath, waitTime);
}

const uploadPdfAndGetData = async (req, res) => {
	const documentAsBytes = await fs.promises.readFile(req.file.path);
    const pdfDoc = await PDFDocument.load(documentAsBytes);
	const numberOfPages = pdfDoc.getPages().length;
	res.send({ pages: numberOfPages, name: req.file.filename });
}

const getBuffer = async (req, res) => {
	const filename = req.body.name;
	let buffer = fs.readFileSync(`documents/${filename}`);
	res.send(buffer); 
}

const removePages = async (req, res) => {
	const pathToPdf = `documents/${req.body.fileName}`;
	const pagesList = req.body.pages.map((num) => {
		return parseInt(num);
	});

	const buffer = await remove.removePages(pagesList, pathToPdf);

	const pdfDoc = await PDFDocument.load(buffer);
	const numberOfPages = pdfDoc.getPages().length;

	// console.log(numberOfPages);

	res.send(remove.toBuffer(buffer));

}

module.exports = {
	mergePdfs,
	ocrDocs,
	splitFiles,
	uploadPdfAndGetData,
	getBuffer,
	removePages,
}






