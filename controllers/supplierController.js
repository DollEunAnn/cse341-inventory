const mongodb = require('../database/connect');
const { get } = require('../routes/productRoutes');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try{
        const result = await mongodb
        .getDatabase()
        .db('inventory')
        .collection('suppliers')
        .find()
        .toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);

    } catch (error) {
        res.status(400).json({ message: error});
    }
};

const getById = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid supplier id to get a supplier.');
    }

    try {
        const supplierId = new ObjectId(req.params.id);
    
        const result = await mongodb
        .getDatabase()
        .db('inventory')
        .collection('suppliers')
        .find({_id: supplierId})
        .toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);

    } catch (error) {
        res.status(400).json({ message: error});
    }
};

const createSupplier = async (req, res) => {
    try {
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

    } catch (error) {
        res.status(400).json({ message: error});
    }
}

const updateSupplier = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid supplier id to update a supplier.');
    }

    try {

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
    } catch (error) {
        res.status(400).json({ message: error});
    }
}

const deleteSupplier = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid supplier id to delete a supplier.');
    }
    
    try {
    
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
    } catch (error) {
        res.status(400).json({ message: error});
    }
}

module.exports = {
    getAll,
    getById,
    createSupplier,
    updateSupplier,
    deleteSupplier
};