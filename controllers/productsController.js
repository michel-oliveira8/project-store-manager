const ProductService = require('../services/productsService');
const { code } = require('../schemas/productsSchemas');

const create = async (req, res) => {
    const { name, quantity } = req.body;

    const product = await ProductService.create(name, quantity);

    if (product.message) return res.status(product.code).json({ message: product.message });

    res.status(code.CREATED).json({ id: product.id, name, quantity });
};

const getAll = async (_req, res) => {
    const listProduct = await ProductService.getAll();

    res.status(code.OK).json(listProduct);
};

const getById = async (req, res) => {
    const { id } = req.params;

    const productId = await ProductService.getById(id);
    console.log(productId);

    if (productId.message) return res.status(productId.code).json({ message: productId.message });

    res.status(code.OK).json(productId);
};

module.exports = {
    create,
    getAll,
    getById,
};