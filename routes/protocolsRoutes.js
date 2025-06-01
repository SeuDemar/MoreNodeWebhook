const express = require('express');
const router = express.Router();

const apiController = require('../controllers/protocolsController');

/**
 * @swagger
 * /protocols:
 *   get:
 *     summary: Lista protocolos com filtros (cliente, tipo, status, período)
 *     tags:
 *       - Protocolos
 */
router.get('/protocols', apiController.listProtocols);

/**
 * @swagger
 * /protocols/{protocolId}:
 *   get:
 *     summary: Consulta o status de um protocolo específico
 *     tags:
 *       - Protocolos
 *     parameters:
 *       - in: path
 *         name: protocolId
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID do protocolo
 */
router.get('/protocols/:protocolId', apiController.getProtocolById);

/**
 * @swagger
 * /protocols:
 *   post:
 *     summary: Cria manualmente um protocolo genérico
 *     tags:
 *       - Protocolos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientCnpj:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [webhook, scheduled, event]
 */
router.post('/protocols', apiController.createProtocol);

module.exports = router;