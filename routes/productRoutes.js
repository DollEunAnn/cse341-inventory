const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const productValidation = require('../middleware/productValidation');

router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', productValidation.saveProduct, productController.createProduct);
router.put('/:id', productValidation.saveProduct, productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;