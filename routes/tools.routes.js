let express = require('express'),
    multer = require('multer'),
    uuidv4 = require('uuid/v4'),
    path = require('path'),
    router = express.Router();

// controllers
const toolsController = require('../controllers/tools.controllers');

const DIR = './documents';

const getStorage = (directory) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, directory);
        },
        filename: (req, file, cb) => {
            const fileName = uuidv4() + file.originalname.toLowerCase().split(' ').join('-');
			req.body['fileName'] = fileName;
            cb(null, fileName);
        }
    });

    return storage;
}

let uploadPdf = multer({
	storage: getStorage(DIR),
	fileFilter: (req, file, cb) => {
        // Allowed extensions
        const fileTypes = /pdf/;
        // Check extension
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

        if (file.mimetype === 'application/pdf' && extName){
            cb(null, true);
        }
        else{
            cb(null, false);
            return cb(new Error('Only .pdf format is allowed'));
        }
    }
});

router.post('/merge', uploadPdf.array('files'), toolsController.mergePdfs);

module.exports = router; 
