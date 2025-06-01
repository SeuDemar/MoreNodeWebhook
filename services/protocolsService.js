// Protocolos
exports.listProtocols = async (filters) => {
  return protocols;
};

exports.getProtocolById = async (protocolId) => {
  return protocols.find(p => p.id === protocolId) || null;
};

exports.createProtocol = async ({ clientCnpj, type }) => {
  const protocol = {
    id: uuidv4(),
    clientCnpj,
    type,
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  protocols.push(protocol);
  return protocol;
};