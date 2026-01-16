import Cart from '../../model/cart.js';
import Products from '../../model/products.js';

// Get user's cart with summary
const getUserCart = async (userId) => {
    const cartItems = await Cart.findAll({
        where: { userId },
        order: [['createdAt', 'DESC']]
    });

    const summary = {
        totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: cartItems.reduce((sum, item) => sum + item.totalPrice, 0),
        itemCount: cartItems.length
    };

    return { items: cartItems, summary };
};

// Add product to cart
const addToCart = async (userId, productId, quantity = 1) => {
    const product = await Products.findByPk(productId);
    if (!product) throw new Error('Product not found');
    if (product.inStock !== null && product.inStock < quantity) throw new Error('Insufficient stock');

    let cartItem = await Cart.findOne({ where: { userId, productId } });

    if (cartItem) {
        cartItem.quantity += quantity;
        cartItem.totalPrice = cartItem.quantity * cartItem.productPrice;
        await cartItem.save();
    } else {
        cartItem = await Cart.create({
            userId, productId, vendorId: product.vendorsId,
            productName: product.name, productPrice: product.price,
            productImage: product.image, quantity,
            totalPrice: quantity * product.price
        });
    }

    return getUserCart(userId);
};

// Update cart item quantity
const updateCartItem = async (userId, cartItemId, quantity) => {
    if (quantity < 1) throw new Error('Quantity must be at least 1');

    const cartItem = await Cart.findOne({ where: { id: cartItemId, userId } });
    if (!cartItem) throw new Error('Cart item not found');

    const product = await Products.findByPk(cartItem.productId);
    if (product.inStock !== null && product.inStock < quantity) throw new Error('Insufficient stock');

    cartItem.quantity = quantity;
    cartItem.totalPrice = quantity * cartItem.productPrice;
    await cartItem.save();

    return getUserCart(userId);
};

// Remove item from cart
const removeFromCart = async (userId, cartItemId) => {
    const cartItem = await Cart.findOne({ where: { id: cartItemId, userId } });
    if (!cartItem) throw new Error('Cart item not found');

    await cartItem.destroy();
    return getUserCart(userId);
};

// Clear entire cart
const clearCart = async (userId) => {
    await Cart.destroy({ where: { userId } });
    return getUserCart(userId);
};

// Checkout cart
const checkoutCart = async (userId) => {
    const cart = await getUserCart(userId);
    if (cart.items.length === 0) throw new Error('Cart is empty');

    await Cart.destroy({ where: { userId } });
    return { success: true, message: 'Checkout successful', orderSummary: cart.summary };
};

export { getUserCart, addToCart, updateCartItem, removeFromCart, clearCart, checkoutCart };