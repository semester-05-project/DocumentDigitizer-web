const tesseract = require('node-tesseract');

const extract = (filePath) => {
	tesseract.process(filePath, function(err, text) {
		if(err) {
			console.error(err);
		} else {
			console.log(text);
		}
	});
}

module.exports = {
	extract
}

