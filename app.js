const express = require('express');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Minha API com Swagger',
      version: '1.0.0',
      description: 'Documentação da API gerada automaticamente com swagger-jsdoc',
    },
  },
  apis: ['./routes/*.js'], // <-- Caminho dos arquivos com comentários JSDoc
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Middlewares
app.use(express.json());
app.use('/', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Swagger UI disponível em: http://localhost:${PORT}/api-docs`);
});
