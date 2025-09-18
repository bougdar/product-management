const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    category: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    price: { type: Number, required: true },
    place: String,
    image: {
        type: String,
        default: '/iamges/add-product.jpg',
    },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
