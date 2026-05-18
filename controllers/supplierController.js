const mongodb = require('../database/connect');
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

module.exports = {
    getAll
};