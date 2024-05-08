const { Router } = require('express');
const authController = require('../Controller/authController');

const router = Router();

router.get('/signin', authController.signin_get);
router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);

module.exports = router;