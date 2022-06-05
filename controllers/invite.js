const inviteController = (bot) => (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Forward some message from the user you want to invite');
};

module.exports = inviteController;
