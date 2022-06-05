const { doc, setDoc, getDoc } = require('firebase/firestore');
const { db } = require('../connections/firebase');
const generatUserObject = require('../utils/generateUserObject');

const createUserFromInvitation = async (userId, invitedById) => {
  try {
    const userRawData = doc(db, 'users', String(userId));
    await setDoc(userRawData, generatUserObject({
      id: userId,
      invitedBy: invitedById,
    }));
    const userData = await getDoc(userRawData);
    const invitedUserDoc = doc(db, 'users', String(invitedById));
    const invitedUserRawData = await getDoc(invitedUserDoc);
    const invitedUserData = invitedUserRawData.data();

    await setDoc(invitedUserDoc, {
      invitations: invitedUserData.invitations - 1,
    }, { merge : true })
    
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

module.exports = createUserFromInvitation;
