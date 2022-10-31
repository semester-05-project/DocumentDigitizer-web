let express = require('express'),
    multer = require('multer'),
    uuidv4 = require('uuid/v4'),
    path = require('path'),
    router = express.Router();

// controllers
const convertController = require('../controllers/convert.controllers');

const DIR = './documents';

const getStorage = (directory, fileName) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, directory);
        },
        filename: (req, file, cb) => {
            // const fileName = file.originalname.toLowerCase().split(' ').join('-');
            cb(null, fileName);
        }
    });

    return storage;
}


let uploadDocx = multer({
    storage: getStorage(DIR, 'docxFile.docx'),
    fileFilter: (req, file, cb) => {
        // Allowed extensions
        const fileTypes = /docx/;
        // Check extension
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

        if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && extName){
            cb(null, true);
        }
        else{
            cb(null, false);
            return cb(new Error('Only .docx format is allowed'));
        }
    }
});

let uploadXlsx = multer({
    storage: getStorage(DIR, 'xlsxFile.xlsx'),
    fileFilter: (req, file, cb) => {
        // Allowed extensions
        const fileTypes = /xlsx/;
        // Check extension
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

        if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && extName){
            cb(null, true);
        }
        else{
            cb(null, false);
            return cb(new Error('Only .xlsx format is allowed'));
        }
    }
});

router.post('/docxToPdfUpload', uploadDocx.single("docx"), convertController.handleDocxToPdf);
router.post('/xlsxToPdfUpload', uploadXlsx.single("xlsx"), convertController.handleXlsxToPdf);

module.exports = router;

