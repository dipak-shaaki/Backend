
import { createProduct } from '../../service/product/index.js';
import { httpError } from '../../utils/httpError.js';

const productController = async (req, res, next) => {
    const { name, description, price, categories, image, inStock } = req.body;

    if (!name || !categories || !price) {
        return next(httpError('Name, categories, and price are required.', 400));
    }

    const vendorId = req.user.id;

    try {
        const product = await createProduct({ name, description, price, categories, image, inStock }, vendorId);
        res.status(201).json({ success: true, message: 'Product created successfully', data: product });
    } catch (error) {
        console.error('Error in productController:', error);
        next(httpError('Failed to create product', 500));
    }
};

export { productController };