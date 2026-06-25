const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Place a new order (called when user validates cart)
router.post('/add', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).send({ msg: 'Order placed successfully', order: newOrder });
    } catch (error) {
        res.status(500).send({ msg: 'Error placing order', error: error.message });
    }
});

// Get all orders (admin view)
router.get('/all', async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'fullname email phone')
            .sort({ createdAt: -1 });
        res.status(200).send({ msg: 'All orders', orders });
    } catch (error) {
        res.status(500).send({ msg: 'Error fetching orders', error: error.message });
    }
});

// Get orders for a specific user
router.get('/user/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 });
        res.status(200).send({ msg: 'User orders', orders });
    } catch (error) {
        res.status(500).send({ msg: 'Error fetching user orders', error: error.message });
    }
});

// Confirm an order
router.put('/confirm/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: 'confirmed' },
            { new: true }
        ).populate('user', 'fullname email');
        if (!order) return res.status(404).send({ msg: 'Order not found' });
        res.status(200).send({ msg: 'Order confirmed', order });
    } catch (error) {
        res.status(500).send({ msg: 'Error confirming order', error: error.message });
    }
});

// Mark order as in delivery
router.put('/deliver/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: 'in_delivery' },
            { new: true }
        ).populate('user', 'fullname email');
        if (!order) return res.status(404).send({ msg: 'Order not found' });
        res.status(200).send({ msg: 'Order marked as in delivery', order });
    } catch (error) {
        res.status(500).send({ msg: 'Error updating order', error: error.message });
    }
});

// Mark order as delivered
router.put('/delivered/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: 'delivered' },
            { new: true }
        ).populate('user', 'fullname email');
        if (!order) return res.status(404).send({ msg: 'Order not found' });
        res.status(200).send({ msg: 'Order delivered', order });
    } catch (error) {
        res.status(500).send({ msg: 'Error updating order', error: error.message });
    }
});

// Delete an order
router.delete('/:id', async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).send({ msg: 'Order deleted' });
    } catch (error) {
        res.status(500).send({ msg: 'Error deleting order', error: error.message });
    }
});

module.exports = router;
