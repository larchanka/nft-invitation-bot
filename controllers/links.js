const getLanguage = require('../utils/getLanguage');
const inviteKeyboard = require('../utils/inviteKeyboard');

const linksController = (bot, user) => async (msg) => {
  const chatId = msg.chat.id;
  const lang = getLanguage(user);
  const loadingMsg = await bot.sendMessage(chatId, '...');

  await bot.sendMessage(chatId, lang.linksContent, {
    reply_markup: {
      keyboard: inviteKeyboard(
        chatId, lang.invite, lang.nft, lang.myNft, lang.settings,
        lang.howTobuy, lang.links, lang.roadmap
      ),
      resize_keyboard: true,
      input_field_placeholder: lang.selectAction,
    },
  });

  bot.deleteMessage(chatId, loadingMsg.message_id);
};

module.exports = linksController;
