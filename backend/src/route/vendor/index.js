import express from 'express'
import { createProductController, deleteProductController, getProductControllerForVendor, getSingleProductControllerForVendor, updateProductController } from '../../controller/products/index.js'
const router=express.Router()
router.post('/products',createProductController)
router.get('/products',getProductControllerForVendor)
router.get('/products/:id',getSingleProductControllerForVendor)
router.patch('/products/:id',updateProductController)
router.delete('/products/:id',deleteProductController)

export default router