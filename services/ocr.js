const { createWorker } = require('tesseract.js');
const path = require('path');

const ocr_with_tesseract = async (path) => {
	// let data = "";
	const worker = createWorker({
		logger: m => console.log(m)
	});
	
	await worker.load();
	await worker.loadLanguage('eng');
	await worker.initialize('eng');
	const { data: { text } } = await worker.recognize(path);
	// console.log(text);
	await worker.terminate();
	return text;
}

module.exports = {
	ocr_with_tesseract
}

