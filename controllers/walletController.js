const { Pool } = require("pg");
const inviteKeyboard = require("../utils/inviteKeyboard");

const walletController = (bot) => async (msg, match) => {
  const chatId = msg.chat.id;

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

    bot.sendMessage(chatId, 'TON wallet address saved', {
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

module.exports = walletController;
