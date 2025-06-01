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