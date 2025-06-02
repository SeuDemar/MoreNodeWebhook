const { connectRabbitMQ } = require('./services/rabbitmq');

async function startWorker() {
  const channel = await connectRabbitMQ();

  channel.consume('notificationsQueue', (msg) => {
    if (msg !== null) {
      const notification = JSON.parse(msg.content.toString());
      console.log('Processando notificação:', notification);

      // Aqui você coloca a lógica do que fazer com a notificação
      // Depois de processar:
      channel.ack(msg);
    }
  }, { noAck: false });

  console.log('Worker iniciado e ouvindo fila...');
}

startWorker().catch(console.error);
