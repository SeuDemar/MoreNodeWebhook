const express = require('express');
const router = express.Router();

const utilsController = require('../controllers/utilitiesController');

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health-check simples da API
 *     tags:
 *       - Utilidades
 *     responses:
 *       200:
 *         description: API está rodando
 */
router.get('/health', utilsController.ping);

/**
 * @swagger
 * /metrics:
 *   get:
 *     summary: Exposição de métricas para Prometheus
 *     tags:
 *       - Utilidades
 */
router.get('/metrics', utilsController.getMetrics);

module.exports = router;