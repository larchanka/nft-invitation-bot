const { Pool } = require('pg');
const { price } = require('../config');
const generateRandomKey = require('../utils/generateRandomKey');
const getLanguage = require('../utils/getLanguage');
const tonNftList = require('../utils/getNftList');

const buyNftController = (bot, user) => async (msg) => {
  const chatId = msg.chat.id;
  const lang = getLanguage(user);

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
        lang.noFreeNft,
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
      lang.sendTonTo(price, process.env.OWNER, randomText),
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
