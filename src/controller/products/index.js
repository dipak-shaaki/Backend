import createProduct from "../../service/products/index.js";
import { httpError } from "../../utils/httpError.js";

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

export { productController };
