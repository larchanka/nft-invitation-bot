const createInvitation = require("../utils/createInvitation");

const generalMessageController = (bot, user) => async (msg) => {
  const { chat: { id: chatId }, forward_from } = msg;
  const botInfo = await bot.getMe();

  if (forward_from?.is_bot === false) {
    const { id, first_name, username } = forward_from;

    if (user?.invitations > 0) {
      const invitation = await createInvitation(chatId, id);

      if (invitation) {
        await bot.sendMessage(
          chatId, 
          `@${botInfo.username}\n\nHello ${first_name}. This is the bot you've been invited to`,
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: 'Forward',
                    switch_inline_query: `\n\nHello ${first_name}. This is the bot you've been invited to`
                  }
                ]
              ],
            },
          }
        );
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
