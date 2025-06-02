const amqplib = require('amqplib');

let connection;
let channel;

async function connectRabbitMQ() {
  if (connection) return channel; // reuse conexão se já existe

  connection = await amqplib.connect('amqp://localhost'); // ajuste a URL conforme seu RabbitMQ
  channel = await connection.createChannel();

  // garante que a fila existe antes de usar
  await channel.assertQueue('notificationsQueue', { durable: true });

  return channel;
}

module.exports = { connectRabbitMQ };
