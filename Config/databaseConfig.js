const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${onn.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};
mongodb: module.exports = connectDB;
