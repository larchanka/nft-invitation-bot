const getLanguage = require('../utils/getLanguage');
const inviteKeyboard = require('../utils/inviteKeyboard');

const linksController = (bot, user) => async (msg) => {
  const chatId = msg.chat.id;
  const lang = getLanguage(user);

  bot.sendMessage(chatId, lang.selectAction, {
    reply_markup: {
      keyboard: inviteKeyboard(
        chatId, lang.invite, lang.nft, lang.myNft, lang.settings,
        lang.howTobuy, lang.links, lang.roadmap
      ),
      resize_keyboard: true,
      input_field_placeholder: lang.selectAction,
    },
  });
};

module.exports = linksController;
