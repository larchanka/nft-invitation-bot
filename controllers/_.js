const createInvitation = require("../utils/createInvitation");
const createUserFromInvitation = require("../utils/createUserFromInvitation");

const generalMessageController = (bot) => async (msg) => {
  const {chat: { id: chatId }, forward_from } = msg;
  const botInfo = await bot.getMe();

  if (forward_from?.is_bot === false) {
    const { id, first_name, username } = forward_from;

    const invitation = await createInvitation(chatId, id);

    if (invitation && invitation !== null) {
      await bot.sendMessage(chatId, `Hello ${first_name}. You have been invited to join World of NFTS.\n\nChat with this bot to start @${botInfo.username}`);
      
      await bot.sendMessage(chatId, `Forward message you see above to ${username ? `@${username}` : `the user you just invited`}`);
    } else {
      await bot.sendMessage(chatId, 'User is already invited');
    }
  }
}

module.exports = generalMessageController;
