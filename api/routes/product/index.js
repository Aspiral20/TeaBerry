const express = require("express");
const ProductController = require("../../controllers/product-controller");
const Router = express.Router;
const router = new Router();

const AllProductsRouter = require('./all')

router.use('/all', AllProductsRouter)

// Admin & Front
router.post('/search', ProductController.searchProducts);
router.get('/:id', ProductController.getProduct);

// Admin
router.post('/add', ProductController.addProduct);
router.post('/update/:id', ProductController.updateProduct);
router.post('/remove/:id', ProductController.removeProduct);

module.exports = router