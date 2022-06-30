const inviteKeyboard = require('../utils/inviteKeyboard');
const languageKeyboard = require('../utils/languageKeyboard');

const startController = (bot, user) => async (msg) => {
  const chatId = msg.chat.id;

  if (!user?.lang) {
    return bot.sendMessage(chatId, 'Select language', {
      reply_markup: {
        keyboard: languageKeyboard(chatId),
      }
    });
  }

  return bot.sendMessage(chatId, 'Select action', {
    reply_markup: {
      keyboard: inviteKeyboard(chatId),
    },
  });
};

module.exports = startController;
