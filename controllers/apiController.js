const apiService = require('../services/apiService');

exports.ping = (req, res) => {
  res.send('pong');
};

exports.getItems = (req, res) => {
  const items = apiService.getItems();
  res.json(items);
};

exports.createItem = (req, res) => {
  const { name } = req.body;
  const newItem = apiService.createItem(name);
  res.status(201).json(newItem);
};

exports.deleteItem = (req, res) => {
  const id = parseInt(req.params.id);
  const success = apiService.deleteItem(id);
  if (success) {
    res.json({ message: `Item ${id} deletado` });
  } else {
    res.status(404).json({ error: 'Item não encontrado' });
  }
};
