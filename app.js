// app.js

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // ou .yaml convertido para JSON

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rota padrão
app.get('/', (req, res) => {
  res.send('API está rodando!');
});

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Suas rotas podem ser adicionadas aqui, por exemplo:
// const userRoutes = require('./routes/users');
// app.use('/users', userRoutes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação Swagger: http://localhost:${PORT}/api-docs`);
});
v