const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    product_type:{
        type: String
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product;