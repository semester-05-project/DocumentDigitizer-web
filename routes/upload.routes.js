let express = require('express'),
    multer = require('multer'),
    uuidv4 = require('uuid/v4'),
    router = express.Router();

// controllers
const docToPdfController = require('../controllers/docToPdf.controllers');

const DIR = './documents';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        // const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, 'document.doc');
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == 'application/msword'){
            cb(null, true);
        }
        else{
            cb(null, false);
            return cb(new Error('Only .doc format is allowed'));
        }
    }
});

router.post('/docToPdfUpload', upload.single("doc"), docToPdfController.handleDocToPdf);

module.exports = router;

