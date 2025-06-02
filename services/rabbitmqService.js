const amqplib = require('amqplib');

let connection;
let channel;

async function connectRabbitMQ() {
  if (connection) return channel;

  connection = await amqplib.connect('amqp://localhost'); 
  channel = await connection.createChannel();

  await channel.assertQueue('notificationsQueue', { durable: true });

  return channel;
}

module.exports = { connectRabbitMQ };
