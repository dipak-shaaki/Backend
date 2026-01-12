import Products from '../../model/products.js';

const createProduct = async (productData, vendorId) => {
    try {
        const product = await Products.create({ ...productData, vendorsId: vendorId });
        return product.toJSON();
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

export { createProduct };