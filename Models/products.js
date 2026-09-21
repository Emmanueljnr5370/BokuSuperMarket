const mongoose = require('mongoose');

const  productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    timestamps: true // Date created and Date uptdated at
});
          
//Create model from scehema
const Product = mongoose.model('Prouct', 'productSchema')