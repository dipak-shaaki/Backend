import {
    getUserCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    checkoutCart
} from '../../service/cart/index.js';
import { httpError } from '../../utils/httpError.js';

// Get user's cart
const getCart = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const cart = await getUserCart(userId);

        res.status(200).json({
            success: true,
            data: cart
        });
    } catch (error) {
        next(httpError(error.message, 500));
    }
};

// Add product to cart
const addProductToCart = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { productId, quantity = 1 } = req.body;

        if (!productId) {
            return next(httpError('Product ID is required', 400));
        }

        if (quantity < 1) {
            return next(httpError('Quantity must be at least 1', 400));
        }

        const cart = await addToCart(userId, productId, quantity);

        res.status(200).json({
            success: true,
            message: 'Product added to cart successfully',
            data: cart
        });
    } catch (error) {
        next(httpError(error.message, 400));
    }
};

// Update cart item quantity
const updateCartItemQuantity = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { cartItemId, quantity } = req.body;

        if (!cartItemId) {
            return next(httpError('Cart item ID is required', 400));
        }

        if (!quantity || quantity < 1) {
            return next(httpError('Valid quantity is required', 400));
        }

        const cart = await updateCartItem(userId, cartItemId, quantity);

        res.status(200).json({
            success: true,
            message: 'Cart item updated successfully',
            data: cart
        });
    } catch (error) {
        next(httpError(error.message, 400));
    }
};

// Remove product from cart
const removeProductFromCart = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { cartItemId } = req.params;

        if (!cartItemId) {
            return next(httpError('Cart item ID is required', 400));
        }

        const cart = await removeFromCart(userId, cartItemId);

        res.status(200).json({
            success: true,
            message: 'Product removed from cart successfully',
            data: cart
        });
    } catch (error) {
        next(httpError(error.message, 400));
    }
};

// Clear entire cart
const clearUserCart = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const cart = await clearCart(userId);

        res.status(200).json({
            success: true,
            message: 'Cart cleared successfully',
            data: cart
        });
    } catch (error) {
        next(httpError(error.message, 500));
    }
};

// Checkout cart
const checkoutUserCart = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const checkoutData = req.body;

        const result = await checkoutCart(userId, checkoutData);

        res.status(201).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(httpError(error.message, 400));
    }
};

export {
    getCart,
    addProductToCart,
    updateCartItemQuantity,
    removeProductFromCart,
    clearUserCart,
    checkoutUserCart
};