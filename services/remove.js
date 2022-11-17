const fs = require('fs');
const PDFDocument = require('pdf-lib').PDFDocument;

const toBuffer = (ab) => {
    const buf = Buffer.alloc(ab.byteLength);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; ++i) {
        buf[i] = view[i];
    }
    return buf;
}

const removePages = async (pagesList, pathToPdf) => {
	const documentAsBytes = await fs.promises.readFile(pathToPdf);

    // Load your PDFDocument
    const pdfDoc = await PDFDocument.load(documentAsBytes)

    const numberOfPages = pdfDoc.getPages().length;

	const newDocument = await PDFDocument.create();

    for (let i = 0; i < numberOfPages; i++) {

        if (! pagesList.includes(i+1)){
			// copy the page at current index
			const [copiedPage] = await newDocument.copyPages(pdfDoc, [i])
			newDocument.addPage(copiedPage);
		}
    }
	const pdfBytes = await newDocument.save();
	return pdfBytes;
}

module.exports = {
	removePages,
	toBuffer,
}