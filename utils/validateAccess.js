const createInvitation = require('./createInvitation');
const createUserFromInvitation = require('./createUserFromInvitation');
const getInvitedUser = require('./getInvitedUser');
const getUser = require('./getUser');

const validateAccess = (bot, cb, showMessage = true) => async (msg) => {
  const chatId = msg.chat.id;

  let authUser = await getUser(chatId);
  const invitedUser = await getInvitedUser(chatId);

  if (!authUser && invitedUser) {
    authUser = await createUserFromInvitation(chatId, invitedUser.fromId);
  }

  if (authUser) {
    cb(bot)(msg);
  } else {
    if (showMessage)
      bot.sendMessage(chatId, 'You dont have access');
  }
};

module.exports = validateAccess;
