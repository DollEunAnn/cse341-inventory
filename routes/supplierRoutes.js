const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const supplierValidation = require('../middleware/supplierValidation');

router.get('/', supplierController.getAll);
router.get('/:id', supplierController.getById);
router.post('/', supplierValidation.saveSupplier, supplierController.createSupplier);
router.put('/:id', supplierValidation.saveSupplier, supplierController.updateSupplier);
router.delete('/:id', supplierController.deleteSupplier);

module.exports = router;