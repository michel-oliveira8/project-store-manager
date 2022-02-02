const SalesService = require('../services/salesService');
const { CREATED, OK } = require('../schemas/productsSchemas');

const create = async (req, res) => {
    const sale = req.body;

    const saleId = await SalesService.saledProducts(sale);

    if (saleId.message) return res.status(saleId.code).json({ message: saleId.message });

    res.status(CREATED).json(saleId);
};

const getAll = async (_req, res) => {
    const listSales = await SalesService.getAll();

    res.status(OK).json(listSales);
};

const saleById = async (req, res) => {
    const { id } = req.params;

    const saleId = await SalesService.saleById(id);
    
    if (saleId.message) return res.status(saleId.code).json({ message: saleId.message });

    res.status(OK).json(saleId);
};

module.exports = {
     create,
     getAll,
     saleById,
};