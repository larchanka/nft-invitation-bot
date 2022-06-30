const { Pool } = require('pg');
const { price } = require('../config');
const pdb = require('../connections/postgres');
const buyNftKeyboard = require('../utils/buyNftKeyboard');
const generateRandomKey = require('../utils/generateRandomKey');
const tonNftList = require('../utils/getNftList');

const buyNftController = (bot) => async (msg, user) => {
  const chatId = msg.chat.id;

  try {
    const pdb = new Pool();

    const loadingMsg = await bot.sendMessage(
      chatId,
      '...'
    );

    const randomText = generateRandomKey();

    const walletReq = await pdb.query('select * from verify where tgid=' + chatId)

    const wallet = walletReq.rows[0]?.owner;

    await pdb.query(`insert into transactions (secret, owner) values ('${randomText}', '${wallet}')`);

    await bot.deleteMessage(chatId, loadingMsg.message_id);
    
    await bot.sendMessage(
      chatId,
      `
Send <strong>${price}</strong> TON to \n
<code>${process.env.SC_WALLET}</code>\n

with this description\n
<code>${randomText}</code>
      `,
      {
        parse_mode: 'HTML',
      }
    );

    await pdb.end();
  } catch(e) {
    console.log(e.toString());

    return null;
  }
  
};

module.exports = buyNftController;
