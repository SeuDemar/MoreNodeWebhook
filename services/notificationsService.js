const { v4: uuidv4 } = require('uuid');
const { enqueueNotification } = require('./notificationProducer');

const notifications = [
  { id: '1', message: 'Teste notificação 1', createdAt: new Date() },
  { id: '2', message: 'Teste notificação 2', createdAt: new Date() },
];

const protocols = [
  { id: 'p1', notificationId: '1', status: 'pending', createdAt: new Date() },
];

const batches = [
  { id: 'b1', notificationIds: ['1', '2'], status: 'pending', createdAt: new Date() },
];

exports.listNotifications = async (filters) => {

  return notifications;
};

exports.getNotificationById = async (notificationId) => {
  return notifications.find(n => n.id === notificationId) || null;
};

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

  await enqueueNotification(protocol);

  return protocol;
};

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
