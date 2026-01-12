import express from 'express';
import { productController } from '../../controller/products/index.js';


const router = express.Router();  //creating a mini app

router.post('/products', productController)

export default router;