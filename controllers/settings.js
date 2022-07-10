const getLanguage = require("../utils/getLanguage");
const languageKeyboard = require("../utils/languageKeyboard");
const settingsKeyboard = require("../utils/settingsKeyboard");

const settingsController = (bot, user) => (msg) => {
  const chatId = msg.chat.id;
  const lang = getLanguage(user);

  bot.sendMessage(chatId, lang.whatToChange, {
    reply_markup: {
      inline_keyboard: settingsKeyboard(chatId, lang.language, lang.wallet),
    },
  });
};

const settingsLanguageController = (bot, user) => (msg) => {
  const chatId = msg.chat.id;
  const lang = getLanguage(user);

  bot.sendMessage(chatId, lang.selectLang, {
    reply_markup: {
      keyboard: languageKeyboard(chatId, lang.ru, lang.en),
      resize_keyboard: true,
      input_field_placeholder: lang.selectLang
    },
  });
};

const settingsWalletController = (bot, user) => (msg) => {
  const chatId = msg.chat.id;
  const lang = getLanguage(user);

  bot.sendMessage(chatId, lang.sendWallet);
};

module.exports = {
  settingsController,
  settingsLanguageController,
  settingsWalletController,
};