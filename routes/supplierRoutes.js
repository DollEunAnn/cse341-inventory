const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const supplierValidation = require('../middleware/supplierValidation');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', supplierController.getAll);
router.get('/:id', supplierController.getById);
router.post('/', isAuthenticated, supplierValidation.saveSupplier, supplierController.createSupplier);
router.put('/:id', isAuthenticated, supplierValidation.saveSupplier, supplierController.updateSupplier);
router.delete('/:id', isAuthenticated, supplierController.deleteSupplier);

module.exports = router;