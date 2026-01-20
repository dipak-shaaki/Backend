import { createCart, deleteCart, findSingleCart, updateCart } from "../../services/cart/index.js"
import { Cart } from "../../model/cart.js"
import { Product } from "../../model/products.js"
import { httpError } from "../../utils/httpError.js"

const upsertCartController = async (req, res) => {
    const cartData = req.body

    const cart = await findSingleCart(
        cartData.cartId
            ? { id: cartData.cartId, status: 'pending' }
            : { item_id: cartData.item_id, user_id: req.user.id, status: 'pending' }
    )

    if (!cart) {
        const newCart = await createCart({ item_id: cartData.item_id, user_id: req.user.id })
        return res.status(200).json({ success: true, message: 'Cart created Successfully', data: newCart })
    }

    const isDeleting = cartData.dec && cart.no_of_item === 1
    if (isDeleting) {
        await deleteCart({ id: cart.id })
        return res.status(200).json({ success: true, message: 'Cart item deleted successfully' })
    }

    await updateCart(cart.id, { no_of_item: cartData.dec ? cart.no_of_item - 1 : cart.no_of_item + 1 })
    return res.status(200).json({ success: true, message: 'Cart updated Successfully' })
}

const getCartController = async (req, res, next) => {
    try {
        const carts = await Cart.findAll({
            where: { user_id: req.user.id, status: 'pending' },
            include: [{ model: Product, attributes: ['id', 'name', 'description', 'price', 'image', 'instock', 'categories'] }]
        })

        if (!carts || carts.length === 0) {
            return res.status(200).json({ success: true, message: 'Cart is empty', data: [] })
        }

        // Map cart items with product details
        const cartItems = carts.map(cart => ({
            id: cart.id,
            no_of_item: cart.no_of_item,
            name: cart.Product?.name || 'Unknown Product',
            description: cart.Product?.description || '',
            price: cart.Product?.price || 0,
            image: cart.Product?.image,
            instock: cart.Product?.instock,
            categories: cart.Product?.categories
        }))

        res.status(200).json({ success: true, message: 'Cart fetched successfully', data: cartItems })
    } catch (error) {
        console.error('Error fetching cart:', error)
        return next(httpError('Failed to fetch cart', 500))
    }
}

const deleteCartItemController = async (req, res, next) => {
    try {
        const { id } = req.params

        const cart = await findSingleCart({ id, user_id: req.user.id })
        if (!cart) {
            return next(httpError('Cart item not found', 404))
        }

        await deleteCart({ id })
        res.status(200).json({ success: true, message: 'Cart item deleted successfully' })
    } catch (error) {
        console.error('Error deleting cart item:', error)
        return next(httpError('Failed to delete cart item', 500))
    }
}

export { upsertCartController, getCartController, deleteCartItemController }