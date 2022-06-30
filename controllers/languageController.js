const { Pool } = require("pg");
const { ru } = require("../config/actions");
const inviteKeyboard = require("../utils/inviteKeyboard");

const languageController = (bot) => async (msg, match) => {
  const chatId = msg.chat.id;
  let lng = 'en';

  const langCmd = match[0];

  if (langCmd === ru) {
    lng = 'ru';
  }

  try {
    const pdb = new Pool();
    await pdb.query(`
    UPDATE users SET lang='${lng}'
    WHERE tgId=${chatId};`)

    bot.sendMessage(chatId, lng === 'ru' ? 'Вы выбрали русский язык' : 'You selected english language', {
      reply_markup: {
        keyboard: inviteKeyboard(chatId),
      },
    });

    pdb.end();

  } catch(e) {
    console.log(e);

    return null;
  }
  
};

module.exports = languageController;
