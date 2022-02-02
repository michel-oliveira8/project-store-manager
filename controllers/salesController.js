const SalesService = require('../services/salesService');
const { CREATED, OK, NOT_FOUND, saleNotFound } = require('../schemas/productsSchemas');

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

const updateSales = async (req, res) => {
    const { id } = req.params;
    const itemUpdated = req.body;

    const update = await SalesService.updateSale(itemUpdated, id);
    console.log(update);

    if (update.affectedRows === 0) return res.status(NOT_FOUND).json({ message: saleNotFound });

    res.status(OK).json({ saleId: id, itemUpdated });
};

module.exports = {
     create,
     getAll,
     saleById,
     updateSales,
};