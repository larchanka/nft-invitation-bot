const inviteKeyboard = require('../utils/inviteKeyboard');
const languageKeyboard = require('../utils/languageKeyboard');

const startController = (bot, user) => async (msg) => {
  const chatId = msg.chat.id;

  bot.setMyCommands([
    {
      command: 'start',
      description: 'Main action',
    },
    {
      command: 'help',
      description: 'Help section',
    },
    {
      command: 'about',
      description: 'About the project',
    },
  ]);

  if (!user?.lang) {
    return bot.sendMessage(chatId, 'Select language', {
      reply_markup: {
        keyboard: languageKeyboard(chatId),
        resize_keyboard: true,
        input_field_placeholder: 'Select language'
      }
    });
  }

  return bot.sendMessage(chatId, 'Select action', {
    reply_markup: {
      keyboard: inviteKeyboard(chatId),
      resize_keyboard: true,
      input_field_placeholder: 'Select action',
    },
  });
};

module.exports = startController;
