import Products from '../../model/products.js';

const createProduct = async (productData, vendorsid) => {
    try {
        const product = await Products.create({
            ...productData,
            vendorsid
        });

        return product;
    } catch (error) {
        throw new Error('Error creating product: ' + error.message);
    }
};

export default createProduct ;