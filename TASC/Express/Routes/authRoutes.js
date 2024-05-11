const { Router } = require('express');
const authController = require('../Controller/authController');
const { checkUser } = require('../middleware/authMiddleware');

const router = Router();

router.get('/signin', checkUser, authController.signin_get);
router.get('/signup', checkUser,  authController.signup_get);
router.post('/signup', checkUser, authController.signup_post);
router.get('/login', checkUser, authController.login_get);
router.post('/login',checkUser,  authController.login_post);
router.get('/logout',checkUser,  authController.logout_get);
router.get('/',checkUser,  authController.index_get);
router.get('/chatting',checkUser,  authController.chatting);


module.exports = router;