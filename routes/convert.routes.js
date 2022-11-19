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
        const fileTypes = /.docx|.doc|.xlsx|.xls|.pptx|.ppt|.png|.jpeg|.webp|.pdf/;
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

router.post('/docxToPdfUpload', uploadDocument.single("docx"), convertController.handleDocxToPdf);
router.post('/docToPdfUpload', uploadDocument.single("doc"), convertController.handleDocToPdf);
router.post('/xlsxToPdfUpload', uploadDocument.single("xlsx"), convertController.handleXlsxToPdf);
router.post('/xlsToPdfUpload', uploadDocument.single("xls"), convertController.handleXlsToPdf);
router.post('/pptxToPdfUpload', uploadDocument.single("pptx"), convertController.handlePptxToPdf);
router.post('/pptToPdfUpload', uploadDocument.single("ppt"), convertController.handlePptToPdf);

router.post('/pngToPdfUpload', uploadDocument.single("png"), convertController.handlePngToPdf);
router.post('/jpgToPdfUpload', uploadDocument.single("jpg"), convertController.handleJpgToPdf);

router.post('/pdfToJpgUpload', uploadDocument.single("pdf"), convertController.handlePdfToJpg);
router.post('/pdfToPngUpload', uploadDocument.single("pdf"), convertController.handlePdfToPng);
router.post('/pdfToWebpUpload', uploadDocument.single("pdf"), convertController.handlePdfToWebp);

router.post('/convertDocument', uploadDocument.single("file"), convertController.handleDocumentConvertor);

module.exports = router;

