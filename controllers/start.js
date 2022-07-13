const getLanguage = require('../utils/getLanguage');
const inviteKeyboard = require('../utils/inviteKeyboard');
const languageKeyboard = require('../utils/languageKeyboard');

const startController = (bot, user) => async (msg) => {
  const chatId = msg.chat.id;
  const lang = getLanguage(user);

  bot.setMyCommands([
    {
      command: 'start',
      description: 'Main action',
    },
    // {
    //   command: 'help',
    //   description: 'Help section',
    // },
    // {
    //   command: 'about',
    //   description: 'About the project',
    // },
  ]);

  if (!user?.lang) {
    return bot.sendMessage(chatId, lang.selectLang, {
      reply_markup: {
        keyboard: languageKeyboard(chatId, lang.ru, lang.en),
        resize_keyboard: true,
        input_field_placeholder: lang.selectLang
      }
    });
  }

  return bot.sendMessage(chatId, lang.selectAction, {
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

module.exports = startController;
