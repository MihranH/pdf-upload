const multer  = require('multer')
const fs = require('fs');
const router = require('express').Router();
const UploadController = require('../controllers/UploadController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

router.post('/', multer({ storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const folder = './files';
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
      }
      cb(null, folder);
    },
    filename: function (req, file, cb) {
      // using current time as we are never sure that two users do not upload a file with the same name 
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  
})}).fields([
    { name: 'file', maxCount: 1 }
    ]), AuthMiddleware.checkAuth, (req, res) => UploadController.upload(req, res));

router.get('/', AuthMiddleware.checkAuth, (req, res) => UploadController.getUserUploads(req, res));

module.exports = router;