const salesModel = require('../models/salesModel');
const { NOT_FOUND, saleNotFound } = require('../schemas/productsSchemas');

const saledProducts = async (sales) => {
    const sale = await salesModel.createDate();
    const getSaleId = sales.map(async ({ product_id, quantity }) => {
        await salesModel.create(
            sale,
            product_id,
            quantity,
        );
    });
    await Promise.all(getSaleId);

    return {
         id: sale,
         itemsSold: sales,
        };
};

const getAll = async () => {
    const listSales = await salesModel.getAll();

    return listSales;
};

const saleById = async (id) => {
    const saleId = await salesModel.getById(id);
    if (saleId.length === 0) {
        return {
            code: NOT_FOUND,
            message: saleNotFound,
        };
    }
    return saleId;
};

const updateSale = async ([{ product_id, quantity }], id) => {
    const update = await salesModel.updateSale(product_id, quantity, id);

    return update;
};

module.exports = {
     saledProducts,
     getAll,
     saleById,
     updateSale,
     
};