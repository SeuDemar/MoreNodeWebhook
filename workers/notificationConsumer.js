const { getChannel } = require('../services/messageQueue');

async function startNotificationConsumer() {
  const channel = getChannel();
  const queue = 'notifications';

  await channel.assertQueue(queue, { durable: true });

  console.log('🟢 Consumidor de notificações iniciado. Aguardando mensagens...');

  channel.consume(queue, async (msg) => {
    if (msg !== null) {
      const message = JSON.parse(msg.content.toString());
      console.log('📩 Mensagem recebida da fila:', message);

      try {
        console.log(`🔧 Processando notificação ${message.data.notificationId}...`);
        await new Promise(res => setTimeout(res, 2000)); 

        console.log(`✅ Notificação ${message.data.notificationId} processada com sucesso.`);
        channel.ack(msg);
      } catch (err) {
        console.error('❌ Erro ao processar notificação:', err);
        channel.nack(msg); 
      }
    }
  });
}

module.exports = { startNotificationConsumer };
