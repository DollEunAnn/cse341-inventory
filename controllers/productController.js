const mongodb = require('../database/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb
        .getDatabase()
        .db('inventory')
        .collection('products')
        .find()
        .toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);

    } catch (error) {
        res.status(400).json({ message: error });
    }
};

const getById = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid product id to get a product.');
    }

    try {
        const productId = new ObjectId(req.params.id);
    
        const result = await mongodb
        .getDatabase()
        .db('inventory')
        .collection('products')
        .find({ _id: productId })
        .toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);

    } catch (error) {
        res.status(400).json({ message: error });
    }
};

const createProduct = async (req, res) => {
    try {
        const product = {
            itemCode: req.body.itemCode,
            itemDescription:req.body.itemDescription,
            brand: req.body.brand,
            price: req.body.price,
            itemType: req.body.itemType,
            itemUnit: req.body.itemUnit,
            itemStock: req.body.itemStock
        };

        const response = await mongodb
        .getDatabase()
        .db('inventory')
        .collection('products')
        .insertOne(product); 

        if(response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the product.');
        }
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

const updateProduct = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid product id to update a product.');
    }

    try {
        const productId = new ObjectId(req.params.id);
    
        const product = {
            itemCode: req.body.itemCode,
            itemDescription:req.body.itemDescription,
            brand: req.body.brand,
            price: req.body.price,
            itemType: req.body.itemType,
            itemUnit: req.body.itemUnit,
            itemStock: req.body.itemStock
        };
    
        const response = await mongodb
        .getDatabase()
        .db('inventory')
        .collection('products')
        .replaceOne({ _id: productId }, product); 
    
        if(response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the product.');
        }
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

const deleteProduct = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid product id to delete a product.');
    }

    try{
        const productId = new ObjectId(req.params.id);

        const response = await mongodb
        .getDatabase().db('inventory')
        .collection('products')
        .deleteOne({ _id: productId });

        if(response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json(response.error || 'Some error occurred while deleting the product.');
        }
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

module.exports = {
    getAll,
    getById,
    createProduct,
    updateProduct,
    deleteProduct
};