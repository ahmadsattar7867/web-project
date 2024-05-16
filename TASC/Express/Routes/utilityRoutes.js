const { Router } = require('express');
const utilityController = require('../Controller/utilityController');
const { checkUser } = require('../middleware/authMiddleware');
const { handleDownload } = require('../middleware/filesMiddleWare');

const router = Router();

router.post('/forgotPass', checkUser, utilityController.forgotPass);
router.post('/sendalert',checkUser,  utilityController.sendalert);
router.get('/alerts',checkUser,  utilityController.alerts);
router.get('/user', checkUser,  utilityController.user);
router.post('/removeUser',checkUser,   utilityController.removeUser);
router.get('/share',checkUser,   utilityController.share);
router.post('/upload',checkUser,   utilityController.upload);

// router.get('/file/:id',handleDownload,   utilityController.files);
// router.post('/file/:id',handleDownload,   utilityController.files);


module.exports = router;