const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    customerName: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    type: {
        type: String,
        enum: ['in delivery', 'delivered', 'pending','return broken','return scam'],
        default: 'in delivery'
    }

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);