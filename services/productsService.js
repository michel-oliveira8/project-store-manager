const ProductsModel = require('../models/productsModel');
const { code, errors } = require('../schemas/productsSchemas');

const create = async (name, quantity) => {
    const repeatProduct = await ProductsModel.getByName(name);
    if (repeatProduct) {
        return {
            code: code.CONFLICT,
            message: errors.existProduct,
        };
    }
    return ProductsModel.create(name, quantity);
};

const getAll = async () => {
    const listProducts = await ProductsModel.getAll();

    return listProducts;
};

const getById = async (id) => {
    const repeatId = await ProductsModel.getById(id);
    if (!repeatId) {
        return {
            code: code.NOT_FOUND,
            message: errors.notFound,
        };
    }
    return ProductsModel.getById(id);
};

const updateProducts = async (name, quantity, id) => {
    const productUpdate = await ProductsModel.updateProducts(name, quantity, id);
    if (productUpdate.affectedRows === 0) {
        return {
            code: code.NOT_FOUND,
            message: errors.notFound,
        }; 
    }

    return productUpdate;
};

module.exports = {
    create,
    getAll,
    getById,
    updateProducts,
};