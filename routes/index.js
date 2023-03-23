var express = require('express');
var multer = require('multer');
var router = express.Router();
const path = require('path');
const mime = require('mime-types');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/', function (req, res, next) {
    let storage = multer.diskStorage({
        destination: function (req, res, next) {
            next(null, '../upload' )
        },
        filename: function (req, file, cb) {
            const ext = path.extname(file.originalname);
            const fileMime = mime.lookup(file.originalname);
            if (!fileMime.startsWith('image/')) {
                return res.send('Chỉ tải được file ảnh');
            }else{
                if (fileMime!=='image/jpeg') {
                    const newName = path.basename(file.originalname, ext) + '.jpeg'; 
                    cb(null, newName);
                }else{
                    cb(null, file.originalname);   
                }
             
            }
        }
    })

    var upload = multer({
        storage: storage, limits: {
            fileSize: 1024 * 1024
        }
    }).array('file', 10)

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.send('File có kích thước lớn hơn 1M');
        }
        if (err) {
            console.log(err);
            res.send('Upload failed');
        } else {
            console.log('File uploaded successfully');
            res.send('Upload successful');
        }
    })

})
module.exports = router;
