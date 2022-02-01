const ProductService = require('../services/productsService');
const { OK, CREATED, NOT_FOUND, notFound } = require('../schemas/productsSchemas');

const create = async (req, res) => {
    const { name, quantity } = req.body;

    const product = await ProductService.create(name, quantity);

    if (product.message) return res.status(product.code).json({ message: product.message });

    res.status(CREATED).json({ id: product.id, name, quantity });
};

const getAll = async (_req, res) => {
    const listProduct = await ProductService.getAll();

    res.status(OK).json(listProduct);
};

const getById = async (req, res) => {
    const { id } = req.params;

    const productId = await ProductService.getById(id);

    if (productId.message) return res.status(productId.code).json({ message: productId.message });

    res.status(OK).json(productId);
};

const updateProducts = async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const productUpdate = await ProductService.updateProducts(name, quantity, id);

    if (productUpdate.message) {
        return res.status(NOT_FOUND)
        .json({ message: notFound }); 
}

    res.status(OK).json({ name, quantity });
};

const deleteProducts = async (req, res) => {
    const { id } = req.params;

    const productDeleted = await ProductService.deleteProducts(id);

    if (productDeleted.message) {
        return res.status(NOT_FOUND)
        .json({ message: notFound });
    }

    res.status(OK).json(productDeleted);
};

module.exports = {
    create,
    getAll,
    getById,
    updateProducts,
    deleteProducts,
};