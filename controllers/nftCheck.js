const { Pool } = require('pg');
const buyNftKeyboard = require('../utils/buyNftKeyboard');
const tonNftList = require('../utils/getNftList');

const nftCheckConfroller = (bot) => async (msg) => {
  const chatId = msg.chat.id;
  const pdb = new Pool();

  try {
    const loadingMsg = await bot.sendMessage(
      chatId,
      '...'
    );
    
    const walletReq = await pdb.query('select * from verify where tgid=' + chatId)

    if (!walletReq?.rowCount) {
      return bot.sendMessage(chatId, 'Send me your TON Wallet address');
    }

    const availableList = await tonNftList.getNftList();

    await bot.deleteMessage(chatId, loadingMsg.message_id);
    
    bot.sendMessage(
      chatId,
      availableList.length > 0 ? `We have ${availableList.length} available` : 'No nft', {
        reply_markup: {
          inline_keyboard: buyNftKeyboard(chatId),
        },
      }
    );

    pdb.end();
  } catch(e) {
    console.log(e.toString());

    return null;
  }
  
};

module.exports = nftCheckConfroller;
