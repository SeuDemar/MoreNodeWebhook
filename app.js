// app.js
const express = require('express');
const routes = require('./routes');                // nosso arquivo de rotas
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();
const PORT = process.env.PORT || 3000;

// === CONFIGURAÇÃO DO SWAGGER ===
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
        url: `http://localhost:${PORT}/api/v1`,
        description: 'Servidor local (desenvolvimento)'
      }
    ]
  },
  apis: ['./routes/index.js']   // ou './routes/**/*.js' se você migrar pra várias pastas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
// ===============================

app.use(express.json());

// 1) Monta o Swagger UI em /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// 2) Monta todas as rotas da versão 1 em /api/v1
app.use('/api/v1', routes);

// 3) Handler de erros genérico (opcional)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📖 Swagger UI disponível em http://localhost:${PORT}/api-docs`);
});
