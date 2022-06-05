const required = ['fromId', 'toId'];

const generateInvitationObject = (sourceData) => {
  const defaultInterface = {
    fromId: NaN,
    toId: NaN,
    createdAt: new Date().getTime(),
    expiresAt: new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
    activatedAt: '',
  };

  const newData = JSON.parse(JSON.stringify(defaultInterface));
  const checked = Object.keys(sourceData).find(key => key in required && !!sourceData[key]);

  if (checked?.length === required.length) {
    throw Error('generateInvitationObject.js: Incorrect data object');
  }

  Object.keys(sourceData).forEach(key => {
    if (sourceData[key]) {
      newData[key] = sourceData[key];
    }
  });

  return newData;
};

module.exports = generateInvitationObject;
