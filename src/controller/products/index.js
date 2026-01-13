import { createProduct, getProductsByVendor, updateProduct, deleteProduct } from "../../service/products/index.js";
import { httpError } from "../../utils/httpError.js";

// Create a new product
const productController = async (req, res, next) => {
    try {
        const { name, description, price, categories, image } = req.body;

        // validation
        if (!name || !price) {
            return next(httpError("Name and price are required", 400));
        }

        const product = await createProduct(
            { name, description, price, categories, image },
            req.user.id
        );

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product
        });
    } catch (error) {
        next(error); // centralized error handler
    }
};

// Get all products for a vendor
const getProductsController = async (req, res, next) => {
    try {
        const products = await getProductsByVendor(req.user.id);

        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: products
        });
    } catch (error) {
        next(error);
    }
};

// Update a product
const updateProductController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        
        if (Object.keys(updateData).length === 0) {
            return next(httpError("Provide at least one field to update", 400));
        }

        const product = await updateProduct(id, req.user.id, updateData);

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product
        });
    } catch (error) {
        if (error.message.includes('not found')) {
            return next(httpError(error.message, 404));
        }
        next(error);
    }
};

// Delete a product
const deleteProductController = async (req, res, next) => {
    try {
        const { id } = req.params;

        await deleteProduct(id, req.user.id);

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        if (error.message.includes('not found')) {
            return next(httpError(error.message, 404));
        }
        next(error);
    }
};

export { productController, getProductsController, updateProductController, deleteProductController };
