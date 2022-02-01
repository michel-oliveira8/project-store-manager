const salesModel = require('../models/salesModel');

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

module.exports = { saledProducts };