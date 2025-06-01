
// Notificações
exports.listNotifications = async (filters) => {
  // Aqui você pode aplicar filtros recebidos
  const notifications = db.getNotifcations();
  return notifications;
};

exports.getNotificationById = async (notificationId) => {
  return notifications.find(n => n.id === notificationId) || null;
};

exports.reprocessNotification = async (notificationId, { type, scheduleAt }) => {
  // Lógica de criação de protocolo + enfileiramento
  const protocol = {
    id: uuidv4(),
    notificationId,
    type,
    status: 'pending',
    createdAt: new Date(),
    scheduleAt: scheduleAt || null
  };

  protocols.push(protocol);
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
    scheduleAt: scheduleAt || null
  };
  batches.push(batch);
  return batch;
};