const fs = require('fs');
const archiver = require('archiver');
const PDFDocument = require('pdf-lib').PDFDocument;

function toBuffer(ab) {
    const buf = Buffer.alloc(ab.byteLength);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; ++i) {
        buf[i] = view[i];
    }
    return buf;
}

const splitPdf = async (pathToPdf, folderName, pageCount) => {
	const outputFile = `documents/${folderName}.zip`;
	const outputStream = fs.createWriteStream(outputFile);

	const archive = archiver('zip', {
		zlib: { level: 9 }
	});
	archive.pipe(outputStream);

    const documentAsBytes = await fs.promises.readFile(pathToPdf);

    // Load your PDFDocument
    const pdfDoc = await PDFDocument.load(documentAsBytes);

    const numberOfPages = pdfDoc.getPages().length;

	let pdfBytesArray = {};

	let fileCount = 1;
    for (let i = 0; i < numberOfPages; i += pageCount) {

        // Create a new "sub" document
        const subDocument = await PDFDocument.create();

		for (let j = i; j < pageCount; j++){
			const [copiedPage] = await subDocument.copyPages(pdfDoc, [j]);
			subDocument.addPage(copiedPage);
		}
        
        const pdfBytes = await subDocument.save();

		pdfBytesArray[`file-${i+1}`] = pdfBytes;
		archive.append(toBuffer(pdfBytes), { name: `file-${fileCount}.pdf` });
		fileCount++;
		
        // await writePdfBytesToFile(`documents/${folderName}/file-${i + 1}.pdf`, pdfBytes);
    }
	archive.finalize(); 
	// console.log(archive._state.source);
	return outputStream;
}

function writePdfBytesToFile(fileName, pdfBytes) {
    return fs.promises.writeFile(fileName, pdfBytes);
}

// (async () => {
//     await splitPdf("./path-to-your-file.pdf");
// })();

module.exports = {
	splitPdf,
}



