const apiService = require('../services/apiService');

// Ping (para teste de saúde simples)
exports.ping = (req, res) => {
  res.status(200).send('pong');
};

// Notificações
exports.listNotifications = async (req, res, next) => {
  try {
    const filters = {
      startDate: req.query.startDate,
      endDate: req.query.endDate,
      cnpj: req.query.cnpj,
      account: req.query.account,
      agreement: req.query.agreement,
      integrationIds: req.query.integrationIds,
      status: req.query.status
    };
    const data = await apiService.listNotifications(filters);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getNotificationById = async (req, res, next) => {
  try {
    const { notificationId } = req.params;
    const notification = await apiService.getNotificationById(notificationId);
    if (!notification) return res.status(404).json({ error: 'Notificação não encontrada' });
    res.json(notification);
  } catch (err) {
    next(err);
  }
};

exports.reprocessNotification = async (req, res, next) => {
  try {
    const { notificationId } = req.params;
    const { type, scheduleAt } = req.body;
    const protocol = await apiService.reprocessNotification(notificationId, { type, scheduleAt });
    res.status(201).json(protocol);
  } catch (err) {
    next(err);
  }
};

exports.reprocessBatch = async (req, res, next) => {
  try {
    const { notificationIds, type, scheduleAt } = req.body;
    const batch = await apiService.reprocessBatch(notificationIds, { type, scheduleAt });
    res.status(201).json(batch);
  } catch (err) {
    next(err);
  }
};

// Protocolos
exports.listProtocols = async (req, res, next) => {
  try {
    const filters = {
      clientCnpj: req.query.clientCnpj,
      type: req.query.type,
      status: req.query.status,
      startDate: req.query.startDate,
      endDate: req.query.endDate
    };
    const data = await apiService.listProtocols(filters);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getProtocolById = async (req, res, next) => {
  try {
    const { protocolId } = req.params;
    const protocol = await apiService.getProtocolById(protocolId);
    if (!protocol) return res.status(404).json({ error: 'Protocolo não encontrado' });
    res.json(protocol);
  } catch (err) {
    next(err);
  }
};

exports.createProtocol = async (req, res, next) => {
  try {
    const { clientCnpj, type } = req.body;
    const protocol = await apiService.createProtocol({ clientCnpj, type });
    res.status(201).json(protocol);
  } catch (err) {
    next(err);
  }
};

// Lotes
exports.createBatch = async (req, res, next) => {
  try {
    const { notificationIds } = req.body;
    const batch = await apiService.createBatch(notificationIds);
    res.status(201).json(batch);
  } catch (err) {
    next(err);
  }
};

exports.getBatchById = async (req, res, next) => {
  try {
    const { batchId } = req.params;
    const batch = await apiService.getBatchById(batchId);
    if (!batch) return res.status(404).json({ error: 'Batch não encontrado' });
    res.json(batch);
  } catch (err) {
    next(err);
  }
};

// Métricas
exports.getMetrics = async (req, res, next) => {
  try {
    const metrics = await apiService.getMetrics();
    res.json(metrics);
  } catch (err) {
    next(err);
  }
};
