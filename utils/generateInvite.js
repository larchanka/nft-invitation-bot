const { v4: uuidv4 } = require('uuid');

const generateInvite = (fromId, toId) => {
  const data = {
    id: uuidv4(),
    fromId,
    toId,
    createdAt: new Date().getTime(),
    expiresAt: new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
    activatedAt: '',
  };

  return data;
}

module.exports = generateInvite;
