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

module.exports = {
     createDate,
     create,
};