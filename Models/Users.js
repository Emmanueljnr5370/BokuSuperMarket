const mongose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongose.Schema({
    name: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        email: ['admin', 'user'],
        default: 'user'
    },
    hasAtm: {
        type: Boolean,
        default: false
    },

},
{timestamps: true} //Date created and Date Modified or updated
);

// Create Model from schemas
const User = mongose.model('User', userSchema);
