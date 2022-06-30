const languageKeyboard = require("../utils/languageKeyboard");
const settingsKeyboard = require("../utils/settingsKeyboard");

const settingsController = (bot) => (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'What do you want to change', {
    reply_markup: {
      inline_keyboard: settingsKeyboard(chatId),
    },
  });
};

const settingsLanguageController = (bot) => (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Select language', {
    reply_markup: {
      keyboard: languageKeyboard(chatId),
      resize_keyboard: true,
      input_field_placeholder: 'Select language'
    },
  });
};

const settingsWalletController = (bot) => (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Send me your TON Wallet address');
};

module.exports = {
  settingsController,
  settingsLanguageController,
  settingsWalletController,
};