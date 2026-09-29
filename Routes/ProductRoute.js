const express = require('express');
//Import Authentication middleware
const { protect } = require('../Middleware/auth');

//import authorization middleware
const { authorize } = require('../Middleware/role');

const router = express.Router(); //

//import the product controller
const productController = require('../Controllers/ProductController');

// define the routes
router.post('/createproduct', protect, authorize('superadmin'), productController.createProduct);
router.get("/getallproduct", protect, authorize('storekeeper'), productController.getAllproducts);
router.get('/getproductbyid/:id', protect, productController.getProductBYId);
router.put('/updateproduct/:id', protect, productController.updateProduct);
router.delete('/deleteproduct/:id', protect, productController.deleteProduct);

//export the router to be used in other files
module.exports = router;