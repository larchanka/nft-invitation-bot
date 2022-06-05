const { doc, setDoc, getDoc } = require('firebase/firestore');
const { db } = require('../connections/firebase');
const generateInvitationObject = require('./generateInvitationObject');
const getInvitedUser = require('./getInvitedUser');
const getUser = require('./getUser');

const createInvitation = async (fromId, toId) => {
  try {
    const userExists = await getUser(toId);
    const invitedUserExists = await getInvitedUser(toId);

    if (!!userExists || !!invitedUserExists) {
      return null;
    }

    const invitationRawData = doc(db, 'invitations', String(toId));
    await setDoc(invitationRawData, generateInvitationObject({
      fromId,
      toId,
    }));
    const uinvitationData = await getDoc(invitationRawData);
    
    if (uinvitationData.exists()) {
      return uinvitationData.data();
    } else {
      return null
    }
  } catch(e) {
    console.log(e.toString());

    return null;
  }
}

module.exports = createInvitation;
