const mongodb = require('../database/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb
    .getDatabase()
    .db('inventory')
    .collection('products')
    .find();

    result.toArray().then((products) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(products);
    });
};

const getById = async (req, res) => {

    const productId = new ObjectId(req.params.id);

    const result = await mongodb
    .getDatabase()
    .db('inventory')
    .collection('products')
    .find(productId);

    result.toArray().then((products) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(products);
    });
};

const createProduct = async (req, res) => {
    const product = {
        itemCode: req.body.itemCode,
        itemDescription:req.body.itemDescription,
        brand: req.body.brand,
        price: req.body.price,
        itemType: req.body.itemType
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
}

const updateProduct = async (req, res) => {

    const productId = new ObjectId(req.params.id);

    const product = {
        itemCode: req.body.itemCode,
        itemDescription:req.body.itemDescription,
        brand: req.body.brand,
        price: req.body.price,
        itemType: req.body.itemType
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
}

const deleteProduct = async (req, res) => {

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
}



module.exports = {
    getAll,
    getById,
    createProduct,
    updateProduct,
    deleteProduct
};