const SalesService = require('../services/salesService');
const { CREATED } = require('../schemas/productsSchemas');

const create = async (req, res) => {
    const sale = req.body;

    const saleId = await SalesService.saledProducts(sale);

    if (saleId.message) return res.status(saleId.code).json({ message: saleId.message });

    res.status(CREATED).json(saleId);
};

module.exports = {
     create,
};