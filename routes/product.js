const express = require('express');
const productService = require('../services/productService');

const router = express.Router();

// Membuat Produk Baru
router.post('/', (req, res) => {
    const { name, price } = req.body;

    productService.createProduct(name, price, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send(`Product added with ID: ${result.insertId}`);
    });
});

// Mendapatkan Semua Produk
router.get('/', (req, res) => {
    productService.getAllProducts((err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(results);
    });
});

// Mendapatkan Produk Berdasarkan ID
router.get('/:id', (req, res) => {
    const { id } = req.params;

    productService.getProductById(id, (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) return res.status(404).send('Product not found');
        res.status(200).json(result[0]);
    });
});

// Mengupdate Produk Berdasarkan ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;

    productService.updateProduct(id, name, price, (err) => {
        if (err) return res.status(500).send(err);
        res.status(200).send('Product updated successfully');
    });
});

// Menghapus Produk Berdasarkan ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    productService.deleteProduct(id, (err) => {
        if (err) return res.status(500).send(err);
        res.status(200).send('Product deleted successfully');
    });
});

module.exports = router;