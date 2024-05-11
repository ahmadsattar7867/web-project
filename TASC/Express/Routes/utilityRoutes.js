const { Router } = require('express');
const utilityController = require('../Controller/utilityController');
const { checkUser } = require('../middleware/authMiddleware');


const router = Router();

router.post('/forgotPass', checkUser, utilityController.forgotPass);



module.exports = router;