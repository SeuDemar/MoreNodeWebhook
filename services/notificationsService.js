const { v4: uuidv4 } = require('uuid');
const { enqueueNotification } = require('./messageQueue');

const notifications = []; 
const protocols = [];    
const batches = [];       

// Listar notificações (com possibilidade de filtros, se quiser depois)
exports.listNotifications = async (filters) => {
  // Aqui você pode aplicar filtros em `notifications` usando o objeto filters, se desejar
  return notifications;
};

// Buscar notificação pelo ID
exports.getNotificationById = async (notificationId) => {
  return notifications.find(n => n.id === notificationId) || null;
};

// Reprocessar uma notificação (criar protocolo)
exports.reprocessNotification = async (notificationId, { type, scheduleAt }) => {
  const protocol = {
    id: uuidv4(),
    notificationId,
    type,
    status: 'pending',
    createdAt: new Date(),
    scheduleAt: scheduleAt || null,
  };

  protocols.push(protocol);

  // Enfileirar para processamento async via RabbitMQ
  await enqueueNotification(protocol);

  return protocol;
};

// Reprocessar batch (lote) de notificações
exports.reprocessBatch = async (notificationIds, { type, scheduleAt }) => {
  if (notificationIds.length > 50) {
    throw new Error('Máximo de 50 notificações por batch');
  }

  const batch = {
    id: uuidv4(),
    notificationIds,
    type,
    status: 'pending',
    createdAt: new Date(),
    scheduleAt: scheduleAt || null,
  };

  batches.push(batch);
  return batch;
};
