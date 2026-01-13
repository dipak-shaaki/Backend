import Products from '../../model/products.js';

const createProduct = async (productData, vendorsId) => {
    try {
        const product = await Products.create({
            ...productData,
            vendorsId
        });

        return product;
    } catch (error) {
        throw new Error('Error creating product: ' + error.message);
    }
};

// Get all products for a specific vendor with pagination
const getProductsByVendor = async (vendorsId, limit = 10, offset = 0) => {
    try {
    
        const totalCount = await Products.count({
            where: { vendorsId }
        });

        // Get paginated products
        const products = await Products.findAll({
            where: { vendorsId },
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']] 
        });

        return {
            products,
            totalCount
        };
    } catch (error) {
        throw new Error('Error fetching products: ' + error.message);
    }
};

// Update a product
const updateProduct = async (productId, vendorsId, updateData) => {
    try {
        const product = await Products.findOne({
            where: { id: productId, vendorsId }
        });

        if (!product) {
            throw new Error('Product not found or unauthorized');
        }

        const updatedProduct = await product.update(updateData);
        return updatedProduct;
    } catch (error) {
        throw new Error('Error updating product: ' + error.message);
    }
};

// Delete a product 
const deleteProduct = async (productId, vendorsId) => {
    try {
        const product = await Products.findOne({
            where: { id: productId, vendorsId }
        });

        if (!product) {
            throw new Error('Product not found or unauthorized');
        }

        await product.destroy();
        return { message: 'Product deleted successfully' };
    } catch (error) {
        throw new Error('Error deleting product: ' + error.message);
    }
};

export { createProduct, getProductsByVendor, updateProduct, deleteProduct };