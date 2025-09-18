const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    cathegory: String,
    quantity: Int16Array,
    price: Int16Array,
    place: String,
    image: {
        Type: String,
        default: 'add-product.jpg',
    },
})

module.exports = mongoose.model('Product', productSchema);