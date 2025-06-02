exports.getMetrics = async () => {

  return {
    totalNotifications: notifications.length,
    totalProtocols: protocols.length,
    totalBatches: batches.length,
    pendingProtocols: protocols.filter(p => p.status === 'pending').length
  };
};