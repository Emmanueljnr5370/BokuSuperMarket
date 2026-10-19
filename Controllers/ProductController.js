const Product = require("../Models/Products.js");
const upload = require('../Middleware/upload');
const sendEmail = require('../Middleware/emailsender');

//Create a New Product
exports.createProduct = async (req, res) => {
    try {

        //check if all required fields are provided
        if (!req.body.name || !req.body.size || !req.body.description || !req.body.price || !req.body.quantity || !req.body.color) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        const { name, size, description, price, quantity, color } = req.body;
        const product = new Product({name, size, description, price, quantity, color });


        await product.save();

        //generate otp
        const otp = Math.floor(100000 + Math.random() * 900000); // generate a 6 digit otp 

        //send email notification to the admin that a product has been created
        const subject = 'New Product Created';
        const text = `A new product has been created here is your otp: ${otp}\nName: ${name}\nSize: ${size}\nDescription: ${description}\nPrice: ${price}\nQuantity: ${quantity}\nColor: ${color}`;

        await sendEmail('emmanueltom5371@gmail.com', subject, text);

        // Send response
        res.status(201).json({ message: 'Product Created Successfully', product });
    } catch (error) {
        res.status(500).json({message: 'Error creating product', error: error.message });
    }
};

//Create a product with image upload
exports.createProductWithImage = async (req, res) => {
    try {
        //check if all required fields are provided
        if (!req.body.name || !req.body.size || !req.body.description || !req.body.price || !req.body.quantity || !req.body.color) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const { name, size, description, price, quantity, color } = req.body;

        //check if file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload an image' });
        }

        const product = new Product({
            name,
            size,
            description,
            price,
            quantity,
            color,
            image: req.file.path //save the image path to the database
        });

        await product.save();
        res.status(201).json({ message: 'Product Created Successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error Creating Product', error: error.message });
    }
};

// Get all products
exports.getAllproducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ message: 'Products Retrieved Successfully', products});
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error: error.message});
    }
};

// Get one product by ID
exports.getProductBYId = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res. status(200).json({ message: 'Product Retrieved Successfully', product});
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product', error: error.message});
    }
};

//update a product
exports.updateProduct = async (req, res) => {
    try {
        const  { id } = req.params; //where id is the product id to be updated
        const { name, size, description, price, quantity, color } = req.body;
        const product = await Product.findByIdAndUpdate(id, {name, size, description, price, quantity, color}, { new: true}); 
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        res.status(200).json({ message: 'Product Updated successfully', product});
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

// ==========================================
// DELETE A PRODUCT
// ==========================================
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        res.status(200).json({
            message: 'Product Deleted Successfully',
            product
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error deleting product',
            error: error.message
        });
    }
};