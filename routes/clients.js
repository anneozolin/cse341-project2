const express = require('express');
const router = express.Router();

const clientsController = require('../controllers/clients');

const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', clientsController.getAll);

router.get('/:id', clientsController.getSingle);

router.post('/', isAuthenticated, clientsController.createClient);

router.put('/:id', isAuthenticated, clientsController.updateClient);

router.delete('/:id', isAuthenticated, clientsController.deleteClient);

module.exports = router;