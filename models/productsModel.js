const connection = require('./connection');

const getByName = async (name) => {
    const [[product]] = await connection
    .execute('SELECT * FROM products WHERE name= ?',
    [name]);
    return product;
};

const create = async (name, quantity) => {
    const [result] = await connection
    .execute('INSERT INTO products (name,quantity) VALUES (?,?)', [name, quantity]);

    return {
        id: result.insertId,
    };    
};

const getAll = async () => {
    const [result] = await connection
    .execute('SELECT * FROM products');

    return result;
};

const getById = async (id) => {
    const [[product]] = await connection
    .execute('SELECT * FROM products WHERE id= ?',
    [id]);
    return product;
};

const updateProducts = async (name, quantity, id) => {
    const [product] = await connection
    .execute('UPDATE products SET name = ?, quantity = ? WHERE id = ?', [name, quantity, id]);
    return product;
};

const deleteProducts = async (id) => {
    const [product] = await connection.execute('DELETE FROM products WHERE id=?', [id]);
    return product;
};

module.exports = {
    getByName,
    create,
    getAll,
    getById,
    updateProducts,
    deleteProducts,
};