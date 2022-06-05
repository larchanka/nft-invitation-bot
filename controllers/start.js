const inviteKeyboard = require('../utils/inviteKeyboard');

const startController = (bot) => (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Select action', {
    reply_markup: {
      keyboard: inviteKeyboard(chatId),
    }
  });
};

module.exports = startController;
