import Products from '../../model/products/';

const createProduct = async (productData, vendorId) => {
    try {
        const product = await Products.create({
          ...productData,
          vendorId
        }); 
        
        return product;
    } catch (error) {
        throw new Error('Error creating product: ' + error.message);
    }
};

export { createProduct };