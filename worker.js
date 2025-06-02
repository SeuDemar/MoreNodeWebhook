const { connectRabbitMQ } = require('./services/rabbitmqService');

async function startWorker() {
  const channel = await connectRabbitMQ();

  channel.consume('notificationsQueue', (msg) => {
    if (msg !== null) {
      const notification = JSON.parse(msg.content.toString());
      console.log('Processando notificação:', notification);

      channel.ack(msg);
    }
  }, { noAck: false });

  console.log('Worker iniciado e ouvindo fila...');
}

startWorker().catch(console.error);
