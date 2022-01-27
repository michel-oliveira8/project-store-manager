const ProductService = require('../services/productsService');
const { code } = require('../schemas/productsSchemas');

const create = async (req, res) => {
    const { name, quantity } = req.body;

    const product = await ProductService.create(name, quantity);

    if (product.message) return res.status(product.code).json({ message: product.message });

    res.status(code.CREATED).json({ id: product.id, name, quantity });
};

module.exports = {
    create,
};