const { Pool } = require('pg');
const { price, nextPrice } = require('../config');
const buyNftKeyboard = require('../utils/buyNftKeyboard');
const getLanguage = require('../utils/getLanguage');
const tonNftList = require('../utils/getNftList');

const nftCheckConfroller = (bot, user) => async (msg) => {
  const chatId = msg.chat.id;
  const lang = getLanguage(user);

  try {
    const pdb = new Pool();
    const loadingMsg = await bot.sendMessage(
      chatId,
      '...'
    );
    
    const walletReq = await pdb.query('select * from verify where tgid=' + chatId)

    if (!walletReq?.rowCount) {
      return bot.sendMessage(chatId, lang.sendWallet);
    }

    const availableList = await tonNftList.getNftList();

    await bot.deleteMessage(chatId, loadingMsg.message_id);
    
    bot.sendMessage(
      chatId,
      availableList.length > 0 ? lang.weHave(availableList.length, price, nextPrice) : lang.noFreeNft, {
        reply_markup: {
          inline_keyboard: buyNftKeyboard(chatId, lang.nftBuy),
        },
      }
    );

    await pdb.end();
  } catch(e) {
    console.log(e.toString());

    return null;
  }
  
};

module.exports = nftCheckConfroller;
