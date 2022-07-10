const { Pool } = require("pg");
const { ru } = require("../config/actions");
const getLanguage = require("../utils/getLanguage");
const inviteKeyboard = require("../utils/inviteKeyboard");

const languageController = (bot, user) => async (msg, match) => {
  const chatId = msg.chat.id;
  let lng = 'en';
  const lang = getLanguage(user);

  const langCmd = match[0];

  if (langCmd === ru) {
    lng = 'ru';
  }

  try {
    const pdb = new Pool();
    await pdb.query(`
    UPDATE users SET lang='${lng}'
    WHERE tgId=${chatId};`)

    bot.sendMessage(chatId, lng === 'ru' ? lang.ruSelected : lang.enSelected, {
      reply_markup: {
        keyboard: inviteKeyboard(chatId, lang.invite, lang.nft, lang.myNft, lang.settings),
        resize_keyboard: true,
        input_field_placeholder: lang.selectAction,
      },
    });

    await pdb.end();

  } catch(e) {
    console.log(e);

    return null;
  }
  
};

module.exports = languageController;
