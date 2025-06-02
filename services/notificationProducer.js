const { connectRabbitMQ } = require('./rabbitmqService');

async function enqueueNotification(notification) {
  const channel = await connectRabbitMQ();

  const msg = JSON.stringify(notification);
  channel.sendToQueue('notificationsQueue', Buffer.from(msg), { persistent: true });

  console.log(`Mensagem enfileirada: ${notification.id}`);
}

module.exports = { enqueueNotification };
