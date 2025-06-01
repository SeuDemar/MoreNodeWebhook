const express = require('express');
const router = express.Router();
const apiController = require('../controllers/batchesController');

/**
 * @swagger
 * /batches:
 *   post:
 *     summary: Cria um pacote de até 50 notificações para processamento em lote
 *     tags:
 *       - Lotes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notificationIds:
 *                 type: array
 *                 items:
 *                   type: string
 */
router.post('/batches', apiController.createBatch);

/**
 * @swagger
 * /batches/{batchId}:
 *   get:
 *     summary: Consulta status e detalhes de um lote específico
 *     tags:
 *       - Lotes
 *     parameters:
 *       - in: path
 *         name: batchId
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID do lote
 */
router.get('/batches/:batchId', apiController.getBatchById);

module.exports = router;