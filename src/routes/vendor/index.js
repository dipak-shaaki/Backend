import express from 'express';
import { productController, getProductsController, updateProductController, deleteProductController } from '../../controller/products/index.js';

const router = express.Router();

// Create a product
router.post('/products', productController);

// Get all products for vendor
router.get('/products', getProductsController);

// Update a product by ID
router.put('/products/:id', updateProductController);

// Delete a product by ID
router.delete('/products/:id', deleteProductController);

export default router;