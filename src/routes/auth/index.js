const express = require('express');
const { signupController, loginController } = require('../../controller/auth')
const router = express.Router();  //creating a mini app

router.post('/signup', signupController)
router.post('/login', loginController)

module.exports = router;

