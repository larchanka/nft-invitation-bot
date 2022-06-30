const { Pool } = require('pg');
const createUserFromInvitation = require('./createUserFromInvitation');

const validateAccess = (bot, cb, showMessage = true) => async (msg, match) => {
  const chatId = msg.chat.id;

  try {
    const pdb = new Pool();
    const userRes = await pdb.query('select * from users where tgid=' + chatId + ' and banned!=1');
    let authUser = userRes?.rows[0];

    const inviteRes = await pdb.query('select * from invitations where toTgId=' + chatId);
    const invitedUser = inviteRes?.rows[0];

    if (!authUser && invitedUser) {
      authUser = await createUserFromInvitation(chatId, invitedUser.fromid);
    }

    if (authUser) {
      cb(bot, authUser)(msg, match);
    } else {
      if (showMessage)
        bot.sendMessage(chatId, 'You dont have access');
    }

    pdb.end();
  } catch(e) {
    console.log('createUserFromInvitation.js Error', e);
  }
};

module.exports = validateAccess;
