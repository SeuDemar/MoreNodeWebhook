const express = require('express');
const router = express.Router();
const apiController = require('../controllers/notificationsController');


/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Lista notificações com filtros (período, cedente, conta, convênio, IDs de integração, status)
 *     tags:
 *       - Notificações
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Data inicial do período (máx. 24h)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Data final do período (máx. 24h)
 *       - in: query
 *         name: cnpj
 *         schema:
 *           type: string
 *         description: CNPJ do cedente
 *       - in: query
 *         name: account
 *         schema:
 *           type: string
 *         description: Conta vinculada à notificação
 *       - in: query
 *         name: agreement
 *         schema:
 *           type: string
 *         description: Convênio bancário
 *       - in: query
 *         name: integrationIds
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         description: Lista de IDs de integração
 *       - in: query
 *         name: status
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         description: Situações das notificações
 */
router.get('/notifications', apiController.listNotifications);

/**
 * @swagger
 * /notifications/{notificationId}:
 *   get:
 *     summary: Recupera detalhes de uma notificação específica
 *     tags:
 *       - Notificações
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID da notificação
 */
router.get('/notifications/:notificationId', apiController.getNotificationById);

/**
 * @swagger
 * /notifications/{notificationId}/reprocess:
 *   post:
 *     summary: Reprocessa uma notificação por ID (webhook, agendado, evento)
 *     tags:
 *       - Notificações
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID da notificação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [webhook, scheduled, event]
 *               scheduleAt:
 *                 type: string
 *                 format: date-time
 *                 description: Data/hora para envio agendado
 */
router.post('/notifications/:notificationId/reprocess', apiController.reprocessNotification);

/**
 * @swagger
 * /notifications/reprocess/batch:
 *   post:
 *     summary: Reprocessa em lote (até 50 notificações)
 *     tags:
 *       - Notificações
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
 *               type:
 *                 type: string
 *                 enum: [webhook, scheduled, event]
 *               scheduleAt:
 *                 type: string
 *                 format: date-time
 */
router.post('/notifications/reprocess/batch', apiController.reprocessBatch);

module.exports = router;