const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// Importa rotas separadas
const notificationsRoutes = require('./routes/notificationsRoutes');
const batchesRoutes = require('./routes/batchesRoutes');
const protocolsRoutes = require('./routes/protocolsRoutes');
const utilitiesRoutes = require('./routes/utilitiesRoutes');

const app = express();
const port = process.env.port || 3000;

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Disparador de Webhooks',
      version: '1.0.0',
      description: 'API para reprocessamento de notificações no PlugBoleto',
    },
    servers: [
      {
        url: `http://localhost:${port}/api/v1`,
        description: 'Servidor local (desenvolvimento)',
      },
    ],
  },
  apis: ['./routes/*.js'], // procura anotações Swagger nas rotas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Middlewares
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Aponta as rotas para o prefixo /api/v1
app.use('/api/v1', notificationsRoutes);
app.use('/api/v1', batchesRoutes);
app.use('/api/v1', protocolsRoutes);
app.use('/api/v1', utilitiesRoutes);

// Middleware de erro genérico
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
  console.log(`📖 Swagger em http://localhost:${port}/api-docs`);
});
