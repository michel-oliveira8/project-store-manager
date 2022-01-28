const ProductService = require('../services/productsService');
const { code, errors } = require('../schemas/productsSchemas');

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

    if (productId.message) return res.status(productId.code).json({ message: productId.message });

    res.status(code.OK).json(productId);
};

const updateProducts = async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const productUpdate = await ProductService.updateProducts(name, quantity, id);

    if (productUpdate.message) {
        return res.status(code.NOT_FOUND)
        .json({ message: errors.notFound }); 
}

    res.status(code.OK).json({ name, quantity });
};

const deleteProducts = async (req, res) => {
    const { id } = req.params;

    const productDeleted = await ProductService.deleteProducts(id);

    if (productDeleted.message) {
        return res.status(code.NOT_FOUND)
        .json({ message: errors.notFound });
    }

    res.status(code.OK).json(productDeleted);
};

module.exports = {
    create,
    getAll,
    getById,
    updateProducts,
    deleteProducts,
};