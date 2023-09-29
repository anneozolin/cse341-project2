const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['clients']
    try {
        const result = await mongodb.getDatabase().db().collection('clients').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['clients']
    const clientId = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDatabase().db().collection('clients').find({ _id: clientId }).toArray();
        if (result.length === 0) {
            res.status(404).json({ error: 'Client not found' });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result[0]);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createClient = async (req, res) => {
    //#swagger.tags=['clients']
    const client = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
        document: req.body.document
    };
    try {
        const response = await mongodb.getDatabase().db().collection('clients').insertOne(client);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json({ error: 'Some error occurred while creating the client' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateClient = async (req, res) => {
    //#swagger.tags=['clients']
    const clientId = new ObjectId(req.params.id);
    const client = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
        document: req.body.document
    };
    try {
        const response = await mongodb.getDatabase().db().collection('clients').replaceOne({ _id: clientId }, client);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({ error: 'Some error occurred while updating the client' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteClient = async (req, res) => {
    //#swagger.tags=['clients']
    const clientId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDatabase().db().collection('clients').deleteOne({ _id: clientId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({ error: 'Some error occurred while deleting the client' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createClient,
    updateClient,
    deleteClient
};
