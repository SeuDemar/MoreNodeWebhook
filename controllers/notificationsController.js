const apiService = require('../services/notificationsService');


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
    if (!notification) 
        return res.status(404).json({ error: 'Notificação não encontrada' });
    
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