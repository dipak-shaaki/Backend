import express from 'express';
import { loginController, signUpController } from '../../controller/auth/index.js';
const router=express.Router();

router.post('/signup',signUpController)
router.post('/login',loginController)
export default router
