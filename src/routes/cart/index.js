import express from 'express';
import {
    getCart,
    addProductToCart,
    updateCartItemQuantity,
    removeProductFromCart,
    clearUserCart,
    checkoutUserCart
} from '../../controller/cart/index.js';
import { isProtectedRoute } from '../../middlewares/auth.js';

const router = express.Router();

// All cart routes require authentication
router.use(isProtectedRoute);

// Get user's cart
router.get('/', getCart);

// Add product to cart
router.post('/add', addProductToCart);

// Update cart item quantity
router.put('/update', updateCartItemQuantity);

// Remove product from cart
router.delete('/remove/:cartItemId', removeProductFromCart);

// Clear entire cart
router.delete('/clear', clearUserCart);

// Checkout cart
router.post('/checkout', checkoutUserCart);

export default router;