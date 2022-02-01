const ProductsModel = require('../models/productsModel');
const { NOT_FOUND, CONFLICT, existProduct, notFound } = require('../schemas/productsSchemas');

const create = async (name, quantity) => {
    const repeatProduct = await ProductsModel.getByName(name);
    if (repeatProduct) {
        return {
            code: CONFLICT,
            message: existProduct,
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
            code: NOT_FOUND,
            message: notFound,
        };
    }
    return ProductsModel.getById(id);
};

const updateProducts = async (name, quantity, id) => {
    const productUpdate = await ProductsModel.updateProducts(name, quantity, id);
    if (productUpdate.affectedRows === 0) {
        return {
            code: NOT_FOUND,
            message: notFound,
        }; 
    }

    return productUpdate;
};

const deleteProducts = async (id) => {
    const deleteById = await getById(id);
    const productDeleted = await ProductsModel.deleteProducts(id);
    if (productDeleted.affectedRows === 0) {
        return {
            code: NOT_FOUND,
            message: notFound,
        };
    }
    return deleteById;
};

module.exports = {
    create,
    getAll,
    getById,
    updateProducts,
    deleteProducts,
};