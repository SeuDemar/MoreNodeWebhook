// services/apiService.js
// Camada de serviço: implementações stub para o Disparador de Webhooks

const { v4: uuidv4 } = require('uuid');

// Bancos de dados em memória (stubs)
let notifications = [];
let protocols = [];
let batches = [];

// Notificações
exports.listNotifications = async (filters) => {
  // Aqui você pode aplicar filtros recebidos
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

// Protocolos
exports.listProtocols = async (filters) => {
  return protocols;
};

exports.getProtocolById = async (protocolId) => {
  return protocols.find(p => p.id === protocolId) || null;
};

exports.createProtocol = async ({ clientCnpj, type }) => {
  const protocol = {
    id: uuidv4(),
    clientCnpj,
    type,
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  protocols.push(protocol);
  return protocol;
};

// Batches
exports.createBatch = async (notificationIds) => {
  if (notificationIds.length > 50) {
    throw new Error('Máximo de 50 notificações por batch');
  }
  const batch = {
    id: uuidv4(),
    notificationIds,
    status: 'pending',
    createdAt: new Date()
  };
  batches.push(batch);
  return batch;
};

exports.getBatchById = async (batchId) => {
  return batches.find(b => b.id === batchId) || null;
};

// Métricas
exports.getMetrics = async () => {
  // Exemplo de métrica: contagem de protocolos pendentes
  return {
    totalNotifications: notifications.length,
    totalProtocols: protocols.length,
    totalBatches: batches.length,
    pendingProtocols: protocols.filter(p => p.status === 'pending').length
  };
};
