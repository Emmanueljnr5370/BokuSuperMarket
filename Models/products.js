const mongose = require('mongoose');

const  productSchema = new mongose.Schema({
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
    color: {
        type: Number
    }
},

{timestamps: true} // Date created and Date uptdated at

);
          
//Create model from scehema
const Product = mongose.model('Product', productSchema)

module.exports = Product; //export the models to used in other files