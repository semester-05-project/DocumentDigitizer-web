let express = require('express'),
    multer = require('multer'),
    uuidv4 = require('uuid/v4'),
    path = require('path'),
    router = express.Router();

// controllers
const convertController = require('../controllers/convert.controllers');

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

let uploadDocument = multer({
    storage: getStorage(DIR),
    fileFilter: (req, file, cb) => {
        // Allowed extensions
        const fileTypes = /.docx|.doc|.xlsx|.xls|.pptx|.ppt/;
        // Check extension
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
		console.log(path.extname(file.originalname).toLowerCase(), extName);

        if (extName){
            cb(null, true);
        }
        else{
            cb(null, false);
            return cb(new Error('File format not allowed'));
        }
    }
});

let uploadXlsx = multer({
    storage: getStorage(DIR),
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

let uploadPptx = multer({
	storage: getStorage(DIR),
	fileFilter: (req, file, cb) => {
        // Allowed extensions
        const fileTypes = /pptx/;
        // Check extension
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

        if (file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' && extName){
            cb(null, true);
        }
        else{
            cb(null, false);
            return cb(new Error('Only .pptx format is allowed'));
        }
    }
});

let uploadPng = multer({
	storage: getStorage(DIR),
	fileFilter: (req, file, cb) => {
		console.log(file);
        // Allowed extensions
        const fileTypes = /png/;
        // Check extension
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

        if (file.mimetype === 'image/png' && extName){
            cb(null, true);
        }
        else{
            cb(null, false);
            return cb(new Error('Only .png format is allowed'));
        }
    }
});

let uploadJpg = multer({
	storage: getStorage(DIR),
	fileFilter: (req, file, cb) => {
        // Allowed extensions
        const fileTypes = /jpg/;
        // Check extension
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

        if (file.mimetype === 'image/jpeg' && extName){
            cb(null, true);
        }
        else{
            cb(null, false);
            return cb(new Error('Only .jpg format is allowed'));
        }
    }
});

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

// router.post('/docxToPdfUpload', uploadDocx.single("docx"), convertController.handleDocxToPdf);
// router.post('/xlsxToPdfUpload', uploadXlsx.single("xlsx"), convertController.handleXlsxToPdf);
// router.post('/pptxToPdfUpload', uploadPptx.single("pptx"), convertController.handlePptxToPdf);
// router.post('/pngToPdfUpload', uploadPng.single("png"), convertController.handlePngToPdf);

// router.post('/pdfToJpgUpload', uploadPdf.single("pdf"), convertController.handlePdfToJpg);
// router.post('/pdfToPngUpload', uploadPdf.single("pdf"), convertController.handlePdfToPng);
// router.post('/pdfToWebpUpload', uploadPdf.single("pdf"), convertController.handlePdfToWebp);
// router.post('/jpgToPdfUpload', uploadJpg.single("jpg"), convertController.handlePngToPdf);

router.post('/convertDocument', uploadDocument.single("file"), convertController.handleDocumentConvertor);

module.exports = router;

