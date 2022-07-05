const { Pool } = require('pg');
const { price } = require('../config');
const generateRandomKey = require('../utils/generateRandomKey');
const tonNftList = require('../utils/getNftList');

const buyNftController = (bot) => async (msg, user) => {
  const chatId = msg.chat.id;

  try {
    const loadingMsg = await bot.sendMessage(
      chatId,
      '...'
    );

    const availableList = await tonNftList.getNftList();

    if (!availableList?.length) {
      await bot.deleteMessage(chatId, loadingMsg.message_id);
      return bot.sendMessage(
        chatId,
        `We dont have nft`,
        {
          parse_mode: 'HTML',
        }
      );
    }

    const randomText = generateRandomKey();

    let pdb = new Pool();
    const walletReq = await pdb.query('select * from verify where tgid=' + chatId);

    const wallet = walletReq.rows[0]?.owner;

    await pdb.query(`insert into transactions (secret, owner) values ('${randomText}', '${wallet}')`);

    await bot.deleteMessage(chatId, loadingMsg.message_id);
    
    await bot.sendMessage(
      chatId,
      `
Send <strong>${price}</strong> TON to \n
<code>${process.env.OWNER}</code>\n

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
