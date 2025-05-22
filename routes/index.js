const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// 4 rotas simples:
/**
 * @swagger
 * /:
 *   get:
 *     summary: Rota inicial da API
 *     responses:
 *       200:
 *         description: Retorna uma mensagem de boas-vindas
 */
router.get('/', (req, res) => {
    res.status(200).send('Bem-vindo à API!');
  });
  
/**
 * @swagger
 * /ping:
 *   get:
 *     summary: Verifica se a API está funcionando
 *     responses:
 *       200:
 *         description: Retorna "pong"
 */
router.get('/items', apiController.getItems);

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Cria um novo item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Item criado com sucesso
 */

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Deleta um item pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do item a ser deletado
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item deletado com sucesso
 *       404:
 *         description: Item não encontrado
 */
router.post('/items', apiController.createItem);

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Deleta um item pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do item a ser deletado
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item deletado com sucesso
 *       404:
 *         description: Item não encontrado
 */
router.delete('/items/:id', apiController.deleteItem);

module.exports = router;
