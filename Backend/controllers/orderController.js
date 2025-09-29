const Product = require('../models/product.model');
const Order = require('../models/order.model');

exports.createOrder = async (req, res) => {
    try {
        const { productId, customerName, quantity, type } = req.body;

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        if (product.quantity < quantity) {
            return res.status(400).json({ message: 'Not enough product in stock' });
        }

        product.quantity -= quantity;
        await product.save();

        const order = new Order({
            product: productId,
            customerName,
            quantity,
            type
        });

        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('product');
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('product');
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const { customerName, quantity, type } = req.body;

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { customerName, quantity, type },
            { new: true }
        );

        if (!order) return res.status(404).json({ message: 'Order not found' });

        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
