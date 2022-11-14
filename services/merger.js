const pdfLib = require('pdf-lib');
const uuidv4 = require('uuid');
const fs = require('fs');

const merge = async (pdfBufferArray, outputFilePath) => {
	const pdfDocument = pdfLib.PDFDocument;

	const mergedPdf = await pdfDocument.create();

	for (const pdfBytes of pdfBufferArray) {
		const pdf = await pdfDocument.load(pdfBytes); 
		const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
		copiedPages.forEach((page) => {
			mergedPdf.addPage(page); 
		}); 
	} 

	const buf = await mergedPdf.save();        // Uint8Array

	let path = 'documents/' + uuidv4() + outputFilePath; 
	
	fs.open(path, 'w', function (err, fd) {
		fs.write(fd, buf, 0, buf.length, null, function (err) {
			fs.close(fd, function () {
				console.log('merged the file successfully');
			}); 
		}); 
	});

	return path;
}


module.exports = {
	merge
}

 