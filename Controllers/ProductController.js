const Product = require('../Models/Products');

//Create a New Product
exports.createProduct = async (req, res) => {
    try {
        const { name, size, description, price, quantity, color } = req.body;
        const product = new Product({name, size, description, price, quantity, color });
        await product.save();
        res.status(201).json({ message: 'Product Created Successfully', product });
    } catch (error) {
        res.status(500).json({message: 'Error creating product', erroe: error.message });
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