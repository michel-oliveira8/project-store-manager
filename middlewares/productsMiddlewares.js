const ProductsSchema = require('../schemas/productsSchemas');

const validateProducts = (req, res, next) => {
    const { name, quantity } = req.body;

    const validations = ProductsSchema.validate(name, quantity);

    if (validations.message) {
 return res.status(validations.code).json({ message: validations.message });
    }
    next();
};

module.exports = { 
    validateProducts,
};