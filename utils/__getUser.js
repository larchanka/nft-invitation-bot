const { doc, getDoc } = require('firebase/firestore');
const { db } = require('../connections/firebase');

const getUser = async (userId) => {
  try {
    const userRawData = doc(db, 'users', String(userId));
    const userData = await getDoc(userRawData);
    
    if (userData.exists()) {
      return userData.data();
    } else {
      return null
    }
  } catch(e) {
    console.log(e.toString());

    return null;
  }
}

module.exports = getUser;
