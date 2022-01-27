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

module.exports = {
    getByName,
    create,
};