const apiService = require('../services/protocolsService');

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