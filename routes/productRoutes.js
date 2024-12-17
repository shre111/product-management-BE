const express = require('express');
const ProductController = require('../controllers/productController');

const router = express.Router();
const productController = new ProductController();

router.post('/product', (req, res) => productController.createProduct(req, res));
router.get('/products', (req, res) => productController.getProducts(req, res));
router.get('/products/:id', (req, res) => productController.getProductById(req, res));
router.put('/products/:id', (req, res) => productController.updateProduct(req, res));
router.delete('/products/:id', (req, res) => productController.deleteProduct(req, res));

module.exports = router;