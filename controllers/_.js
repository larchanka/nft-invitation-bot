const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input");
const { Api } = require("telegram/tl");

const createInvitation = require("../utils/createInvitation");
const getLanguage = require("../utils/getLanguage");
const startController = require("./start");
//bot.onText(/^\/start/, validateAccess(bot, startController));
const getUserByLink = async (username) => {
  const apiId = 185045;
  const apiHash = "8a12499d57545e35da5e638b38b90667";

  try {
    const client = new TelegramClient(new StringSession(""), apiId, apiHash, {
      connectionRetries: 5,
    });
    await client.start({
      botAuthToken: process.env.BOT_KEY,
    });
  
    const result = await client.invoke(
      new Api.users.GetFullUser({
        id: username,
      })
    );

   const userTgId = Number(result?.fullUser?.id?.value);

   return userTgId;

  } catch (e) {
    console.log('Cannot get user', username, e.toString())

    return undefined;
  }
}

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
        userId = await getUserByLink(isUserLink[2]);
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
                      switch_inline_query: `@${botInfo.username}\n\n${lang.invitation}`
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
