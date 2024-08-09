const db = require('../db');

const createProduct = (name, price, callback) => {
    const sql = 'INSERT INTO products (name, price) VALUES (?, ?)';
    db.query(sql, [name, price], callback);
};

const getAllProducts = (callback) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, callback);
};

const getProductById = (id, callback) => {
    const sql = 'SELECT * FROM products WHERE id = ?';
    db.query(sql, [id], callback);
};

const updateProduct = (id, name, price, callback) => {
    const sql = 'UPDATE products SET name = ?, price = ? WHERE id = ?';
    db.query(sql, [name, price, id], callback);
};

const deleteProduct = (id, callback) => {
    const sql = 'DELETE FROM products WHERE id = ?';
    db.query(sql, [id], callback);
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};