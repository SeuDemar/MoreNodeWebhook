const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// 4 rotas simples:
router.get('/ping', apiController.ping);
router.get('/items', apiController.getItems);
router.post('/items', apiController.createItem);
router.delete('/items/:id', apiController.deleteItem);

module.exports = router;
