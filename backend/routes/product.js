const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Add Product
router.post('/add', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).send({ msg: 'Product added successfully', newProduct });
    } catch (error) {
        res.status(500).send({ msg: 'Error adding product', error: error.message });
    }
});

// Get All Products
router.get('/all', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send({ msg: 'All products', products });
    } catch (error) {
        res.status(500).send({ msg: 'Error fetching products', error: error.message });
    }
});

// Get Products by Category
router.get('/category/:category', async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category });
        res.status(200).send({ msg: 'Products by category', products });
    } catch (error) {
        res.status(500).send({ msg: 'Error fetching products', error: error.message });
    }
});

// Get One Product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send({ msg: 'Product not found' });
        res.status(200).send({ msg: 'Product found', product });
    } catch (error) {
        res.status(500).send({ msg: 'Error fetching product', error: error.message });
    }
});

// Update Product
router.put('/:id', async (req, res) => {
    try {
        req.body.updatedAt = Date.now();
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send({ msg: 'Product updated', updatedProduct });
    } catch (error) {
        res.status(500).send({ msg: 'Error updating product', error: error.message });
    }
});

// Delete Product
router.delete('/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).send({ msg: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).send({ msg: 'Error deleting product', error: error.message });
    }
});

// Search Products by name
router.get('/search/:name', async (req, res) => {
    try {
        const products = await Product.find({ name: { $regex: req.params.name, $options: 'i' } });
        res.status(200).send({ msg: 'Search results', products });
    } catch (error) {
        res.status(500).send({ msg: 'Error searching products', error: error.message });
    }
});

module.exports = router;
