import express from 'express';
import { signupController, loginController } from '../../controller/auth/index.js'
const router = express.Router();  //creating a mini app

router.post('/signup', signupController)
router.post('/login', loginController)

export default router;

