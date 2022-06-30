const createInvitation = require("../utils/createInvitation");
const createUserFromInvitation = require("../utils/createUserFromInvitation");

const generalMessageController = (bot, user) => async (msg) => {
  const {chat: { id: chatId }, forward_from } = msg;
  const botInfo = await bot.getMe();

  if (forward_from?.is_bot === false) {
    const { id, first_name, username } = forward_from;

    if (user?.invitations > 0) {
      const invitation = await createInvitation(chatId, id);

      if (invitation) {
        await bot.sendMessage(chatId, `Hello ${first_name}. You have been invited to join World of NFTS.\n\nChat with this bot to start @${botInfo.username}`);
        await bot.sendMessage(chatId, `Forward message you see above to ${username ? `@${username}` : `the user you just invited`}`);
      } else {
        await bot.sendMessage(chatId, 'User is already invited');
      }
    } else {
      await bot.sendMessage(chatId, 'You don\'t have invitations.');
    }
  }
}

module.exports = generalMessageController;
