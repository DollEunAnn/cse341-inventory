const mongodb = require('../database/connect');
const { get } = require('../routes/productRoutes');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb
    .getDatabase()
    .db('inventory')
    .collection('suppliers')
    .find();

    result.toArray().then((suppliers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(suppliers);
    });
};

const getById = async (req, res) => {

    const supplierId = new ObjectId(req.params.id);

    const result = await mongodb
    .getDatabase()
    .db('inventory')
    .collection('suppliers')
    .find(supplierId);

    result.toArray().then((suppliers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(suppliers);
    });
};

const createSupplier = async (req, res) => {
    const supplier = {
        supplierName: req.body.supplierName,
        supplierAddress:req.body.supplierAddress,
        supplierTelephone: req.body.supplierTelephone,
        supplierPersonel: req.body.supplierPersonel,
    };

    const response = await mongodb
    .getDatabase()
    .db('inventory')
    .collection('suppliers')
    .insertOne(supplier); 

    if(response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the supplier.');
    }
}

const updateSupplier = async (req, res) => {

    const supplierId = new ObjectId(req.params.id);

     const supplier = {
        supplierName: req.body.supplierName,
        supplierAddress:req.body.supplierAddress,
        supplierTelephone: req.body.supplierTelephone,
        supplierPersonel: req.body.supplierPersonel,
    };

    const response = await mongodb
    .getDatabase()
    .db('inventory')
    .collection('suppliers')
    .replaceOne({ _id: supplierId }, supplier); 

    if(response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the supplier.');
    }
}

const deleteSupplier = async (req, res) => {

    const supplierId = new ObjectId(req.params.id);

    const response = await mongodb
    .getDatabase().db('inventory')
    .collection('suppliers')
    .deleteOne({ _id: supplierId });

    if(response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(404).json(response.error || 'Some error occurred while deleting the supplier.');
    }
}

module.exports = {
    getAll,
    getById,
    createSupplier,
    updateSupplier,
    deleteSupplier
};