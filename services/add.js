const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdf-lib').PDFDocument;

function toBuffer(ab) {
    const buf = Buffer.alloc(ab.byteLength);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; ++i) {
        buf[i] = view[i];
    }
    return buf;
}

const addPages = async (pathtoSourcePdf, pathToPagesPdf, index, blankIndex) => {

	// source pdf
	const documentAsBytes = await fs.promises.readFile(pathtoSourcePdf);
	const pdfDoc = await PDFDocument.load(documentAsBytes);
	const numberOfPages = pdfDoc.getPages().length;

	// pdf with pages to add
	const pagesAsBytes = await fs.promises.readFile(pathToPagesPdf);
	const pagesPdfDoc = await PDFDocument.load(pagesAsBytes);
	const pages = pagesPdfDoc.getPages().length;

	const subDocument = await PDFDocument.create();

	for (let i = 0; i < numberOfPages; i++) {

		if (index !== 0 && index === i+1){
			for (let j = 0; j < pages; j++){
				const [copiedPage] = await subDocument.copyPages(pagesPdfDoc, [j]);
				subDocument.addPage(copiedPage);
			}
		}

		if (blankIndex !== 0 && blankIndex === i+1){
			console.log("here");
			subDocument.addPage();
		}

        const [copiedPage] = await subDocument.copyPages(pdfDoc, [i])
        subDocument.addPage(copiedPage);
    }

	const pdfBytes = await subDocument.save();

	return toBuffer(pdfBytes);

}

module.exports = {
	addPages
}

