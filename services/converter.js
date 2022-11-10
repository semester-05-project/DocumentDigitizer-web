const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
var toPdf = require("office-to-pdf");

// docType => document, image etc.
const convert = async (filePath, resultPath, api, docType, output={}) => {

    // https://api.pspdfkit.com/build

    const formData = new FormData();
    formData.append('instructions', JSON.stringify({
    parts: [
        {
        file: docType
        }
    ],
	output: output
    }));
    formData.append(docType, fs.createReadStream(filePath));

    try{
        const res = await axios.post(api, formData, {
            headers: formData.getHeaders({
                'Authorization': 'Bearer pdf_live_05N8YBp2PdZOcco4IHWsbJsuLNZ9L2PxpGVIqkzoSpS'
            }),
            responseType: "stream"
        })
        return res.data.pipe(fs.createWriteStream(resultPath));
    }
    catch(err){
        const error = await streamToString(err.response);
        console.log(error);
    }
}

    
function streamToString(stream) {
	const chunks = []
	return new Promise((resolve, reject) => {
		stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)))
		stream.on("error", (err) => reject(err))
		stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")))
	});
}

const convertToPdf = (fileName, resultFileName) => {

	const readFilePath = path.resolve(`documents/${fileName}`);
	var wordBuffer = fs.readFileSync(readFilePath);

	toPdf(wordBuffer).then(
		(pdfBuffer) => {
		  	fs.writeFileSync(`documents/results/${resultFileName}`, pdfBuffer);
		}, (err) => {
		  	console.log(err);
		}
	);
}

module.exports = {
    convert,
	convertToPdf
}