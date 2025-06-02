const { v4: uuidv4 } = require('uuid');

const batches = []; 

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
