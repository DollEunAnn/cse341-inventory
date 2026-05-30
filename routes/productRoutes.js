const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const productValidation = require('../middleware/productValidation');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', isAuthenticated, productValidation.saveProduct, productController.createProduct);
router.put('/:id', isAuthenticated, productValidation.saveProduct, productController.updateProduct);
router.delete('/:id', isAuthenticated, productController.deleteProduct);

module.exports = router;