const connection = require('./connection');

const createDate = async () => {
    const [sale] = await connection
    .execute('INSERT INTO sales(date) VALUES (CURRENT_TIMESTAMP())');
    // Referencia: https://www.w3schools.com/sql/func_mysql_current_timestamp.asp
    return sale.insertId;
};

const create = async (saleId, productId, quantity) => {
    const getSaleId = await connection.execute(
        'INSERT INTO sales_products(sale_id, product_id, quantity) VALUES (?,?,?)',
         [saleId, productId, quantity],
    );
    return {
        id: getSaleId.insertId,
    };
};

const getAll = async () => {
    const [result] = await connection
    .execute(
        'SELECT sp.sale_id as saleId, s.date, sp.product_id, sp.quantity from sales as s'
        + ' inner join sales_products as sp on sp.sale_id = s.id',
);
    return result;
};

const getById = async (id) => {
  const [sale] = await connection
  .execute(
    'SELECT s.date, sp.product_id, sp.quantity from sales as s'
        + ' inner join sales_products as sp on sp.sale_id = ? and s.id = ?',
        [id, id],
  );
  return sale;
};

const updateSale = async (productId, quantity, id) => {
    const [update] = await connection
    .execute(
        'UPDATE sales_products SET product_id = ?, quantity = ? where sale_id = ?',
        [productId, quantity, id],
    );
    return update;
};

module.exports = {
     createDate,
     create,
     getAll,
     getById,
     updateSale,
};