const apiService = require('../services/utilitiesService');

exports.ping = (req, res) => {
  res.status(200).send('pong');
};

exports.getMetrics = async (req, res, next) => {
  try {
    const metrics = await apiService.getMetrics();
    res.json(metrics);
  } catch (err) {
    next(err);
  }
};