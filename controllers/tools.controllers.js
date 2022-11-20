const merger = require('../services/merger');
const ocr = require('../services/ocr');
const split = require('../services/split');
const remove = require('../services/remove');
const add = require('../services/add');

const fs = require('fs');
const uuidv4 = require('uuid');
const path = require('path');
const PDFDocument = require('pdf-lib').PDFDocument;

const waitTime = 1 * 60 * 1000; // one minute default

const deleteFile = async (filePath, waitTime) => {
	setTimeout(() => {
		fs.unlink(filePath, err => {
			if (err) {
				console.error(err);
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
				console.err(err);
			} else {
				console.log('succesfully deleted from the downloads folder')
			}
		});
	}

	const path = await merger.merge(bufferArray, `mergedFile.pdf`);

	fs.readFile(path, function(err, data){
		if (err){
			console.error(err);
			res.status(400).send(err.message);
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
	const pageCount = parseInt(req.body.pageCount);
	
	const absPath = path.resolve(file.path);
	const folderName = path.parse(file.filename).name;

	let outputStream = await split.splitPdf(absPath, folderName, pageCount);

	const outputFilePath = `documents/${folderName}.zip`

	outputStream.on('finish', () => {
		let data = fs.readFileSync(outputFilePath);
		res.send(data);
	});

	deleteFile(file.path, waitTime);
	deleteFile(outputFilePath, waitTime);
}

const addFiles = async (req, res) => {
	const index = parseInt(req.body.index);
	const blankIndex = parseInt(req.body.blankIndex);

	const pathtoSourcePdf = req.files[0].path;
	const pathToPagesPdf = req.files[1].path;

	const buffer = await add.addPages(pathtoSourcePdf, pathToPagesPdf, index, blankIndex);

	res.send(buffer);
}

const uploadPdfAndGetData = async (req, res) => {
	const documentAsBytes = await fs.promises.readFile(req.file.path);
    const pdfDoc = await PDFDocument.load(documentAsBytes);
	const numberOfPages = pdfDoc.getPages().length;
	res.send({ pages: numberOfPages, name: req.file.filename });
}

const getPdfData = async (req, res) => {
	const documentAsBytes = await fs.promises.readFile(req.file.path);
    const pdfDoc = await PDFDocument.load(documentAsBytes);
	const numberOfPages = pdfDoc.getPages().length;
	res.send({ pages: numberOfPages, name: req.file.filename });

	deleteFile(req.file.path, waitTime);
}

const getBuffer = async (req, res) => {
	const filename = req.body.name;
	let buffer = fs.readFileSync(`documents/${filename}`);
	res.send(buffer); 

	deleteFile(`documents/${filename}`, waitTime);
}

const removePages = async (req, res) => {
	const pathToPdf = req.file.path;
	const checkedPages = req.body.pages;
	// const pagesList = req.body.pages.map((num) => {
	// 	return parseInt(num);
	// });
	let pages = [];
	for (let i = 0; i < checkedPages.length; i++) {
		const page = checkedPages[i];
		pages.push(parseInt(page));
	}

	const buffer = await remove.removePages(pages, pathToPdf);

	const pdfDoc = await PDFDocument.load(buffer);
	const numberOfPages = pdfDoc.getPages().length;

	// console.log(numberOfPages);

	res.send(remove.toBuffer(buffer));

	deleteFile(pathToPdf, waitTime);

}

module.exports = {
	mergePdfs,
	ocrDocs,
	splitFiles,
	uploadPdfAndGetData, getPdfData,
	getBuffer,
	removePages,
	addFiles,
}






