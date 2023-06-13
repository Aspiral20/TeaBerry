const express = require("express");
const ProductController = require("../../controllers/product-controller");
const Router = express.Router;
const router = new Router();

// Admin & Front
router.get('/', ProductController.getProducts);

// Admin
router.post('/remove', ProductController.removeProducts);
router.post('/count_statuses', ProductController.getStatusCountProducts);
router.get('/statuses', ProductController.getAllStatusCountProducts);

// Front
router.get('/:sort', ProductController.getProducts);
router.post('/', ProductController.getProducts);
router.post('/filter', ProductController.filterProducts);

module.exports = router