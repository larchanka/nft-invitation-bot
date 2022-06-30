const required = ['id', 'invitedBy'];

const generateUserObject = (sourceData) => {
  const defaultInterface = {
    id: NaN,
    invitedBy: NaN,
    createdAt: new Date().getTime(),
    updatedAt: '',
    invitations: 0,
    level: 1,
    expiresAt: '',
    tokens: [],
    banned: false,
    banedTo: '',
    lang: 'en',
    wallet: '',
  };
  
  const newData = JSON.parse(JSON.stringify(defaultInterface));
  const checked = Object.keys(sourceData).find(key => key in required && !!sourceData[key]);

  if (checked?.length === required.length) {
    throw Error('generateUserObject.js: Incorrect data object');
  }

  Object.keys(sourceData).forEach(key => {
    if (sourceData[key]) {
      newData[key] = sourceData[key];
    }
  });

  return newData;
};

module.exports = generateUserObject;
