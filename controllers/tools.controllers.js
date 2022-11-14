const merger = require('../services/merger');
const fs = require('fs');
const uuidv4 = require('uuid');

const waitTime = 1 * 60 * 1000; // one minute
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

module.exports = {
	mergePdfs
}






