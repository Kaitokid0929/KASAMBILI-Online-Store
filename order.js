const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');

// Place a new order
router.post('/', async (req, res) => {
    try {
        const product = await Product.findById(req.body.productId);
        if (!product || product.stock < req.body.quantity) {
            return res.status(400).json({ message: 'Product unavailable or insufficient stock' });
        }

        const order = new Order({
            customerName: req.body.customerName,
            product: req.body.productId,
            quantity: req.body.quantity
        });

        product.stock -= req.body.quantity;
        await product.save();
        await order.save();

        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('product');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
