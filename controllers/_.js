const input = require("input");

const createInvitation = require("../utils/createInvitation");
const getLanguage = require("../utils/getLanguage");
const { getUserIdByLink } = require("../utils/getUserByLink");
const startController = require("./start");

const generalMessageController = (bot, user) => async (msg) => {
  const userLinkRegex = new RegExp('^(\@|https://t.me/)([a-zA-Z0-9-_]{3,})$');
  const lang = getLanguage(user);

  const { chat: { id: chatId }, forward_from } = msg;

  if (msg?.text === '/start') {
    startController(bot, user)(msg);
  } else {

    const loadingMsg = await bot.sendMessage(
      chatId,
      '...'
    );

    const botInfo = await bot.getMe();
    const isUserLink = msg.text?.match(userLinkRegex);

    if ((forward_from && forward_from?.is_bot === false )|| (isUserLink && isUserLink[2])) {
      const { id, first_name, username } = forward_from ? forward_from : {};
      let userId;

      if (isUserLink[2]) {
        userId = await getUserIdByLink(isUserLink[2]);
      }

      if (user?.invitations > 0) {
        const invitation = await createInvitation(chatId, id || userId);

        if (invitation) {
          await bot.sendMessage(
            chatId, 
            `@${botInfo.username}\n\n${lang.invitation}`,
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: lang.forward,
                      switch_inline_query: `${lang.invitation}`
                    }
                  ]
                ],
              },
            }
          );
          await bot.sendMessage(chatId, lang.forwardTo);
        } else {
          await bot.sendMessage(chatId, lang.invited);
        }
      } else {
        await bot.sendMessage(chatId, lang.noInvitations);
      }
    }

    await bot.deleteMessage(chatId, loadingMsg.message_id);
  }
}

module.exports = generalMessageController;
