let items = [
  { id: 1, name: 'Item A' },
  { id: 2, name: 'Item B' }
];

exports.getItems = () => items;

exports.createItem = (name) => {
  const newItem = { id: Date.now(), name };
  items.push(newItem);
  return newItem;
};

exports.deleteItem = (id) => {
  const index = items.findIndex(item => item.id === id);
  if (index === -1) return false;
  items.splice(index, 1);
  return true;
};
