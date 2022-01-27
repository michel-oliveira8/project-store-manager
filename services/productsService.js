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

module.exports = {
    create,
};