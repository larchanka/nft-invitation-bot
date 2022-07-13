const { Pool } = require("pg");
const getLanguage = require("../utils/getLanguage");
const inviteKeyboard = require("../utils/inviteKeyboard");

const walletController = (bot, user) => async (msg, match) => {
  const chatId = msg.chat.id;
  const lang = getLanguage(user);

  const address = match[0];

  try {
    const pdb = new Pool();
    await pdb.query(`DELETE FROM verify WHERE tgid=${chatId};`);
    await pdb.query(`INSERT INTO verify (
      tgid, 
      "owner"
    ) VALUES (
      ${chatId},
      '${address}'
    )`);

    bot.sendMessage(chatId, lang.walletSaved, {
      reply_markup: {
        keyboard: inviteKeyboard(
          chatId, lang.invite, lang.nft, lang.myNft, lang.settings,
          lang.howTobuy, lang.links, lang.roadmap
        ),
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

module.exports = walletController;
