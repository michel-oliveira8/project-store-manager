const ProductsSchema = require('../schemas/productsSchemas');

const validateProducts = (req, res, next) => {
    const { name, quantity } = req.body;

    const validations = ProductsSchema.validateProducts(name, quantity);

    if (validations.message) {
 return res.status(validations.code).json({ message: validations.message });
    }
    next();
};

const validateSales = (req, res, next) => {
    const [{ product_id, quantity }] = req.body;

    const validations = ProductsSchema.validateSales(product_id, quantity);

    if (validations.message) {
 return res.status(validations.code).json({ message: validations.message });
    }
    next();
};

module.exports = { 
    validateProducts,
    validateSales,
};