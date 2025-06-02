const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const notificationsRoutes = require('./routes/notificationsRoutes');
const batchesRoutes = require('./routes/batchesRoutes');
const protocolsRoutes = require('./routes/protocolsRoutes');
const utilitiesRoutes = require('./routes/utilitiesRoutes');

const app = express();

const port = process.env.PORT || 3000;
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
  apis: ['./routes/*.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

require('dotenv').config();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/v1', notificationsRoutes);
app.use('/api/v1', batchesRoutes);
app.use('/api/v1', protocolsRoutes);
app.use('/api/v1', utilitiesRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;
