const apiService = require('../services/batchesService');

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