const { Pool } = require("pg");
const { nft } = require("../config/en");
const getUserNfts = require("../utils/getUserNfts");

const myNftController = (bot, user) => async (msg) => {
  const chatId = msg.chat.id;

  try {
    const loadingMsg = await bot.sendMessage(
      chatId,
      '...'
    );
    const pdb = new Pool();

    const walletReq = await pdb.query(`select * from verify where tgid=${chatId}`);
    await pdb.end();

    const wallet = walletReq?.rows[0]?.owner;

    const nfts = await getUserNfts(wallet);

    await bot.deleteMessage(chatId, loadingMsg.message_id);

    if (!nfts.length) {
      return bot.sendMessage(chatId, 'You dont have any NFTs yet');
    }

    return bot.sendMediaGroup(chatId, nfts.filter(nft => nft.image).splice(0,10).map(nft => ({
      type: 'photo',
      media: nft.image,
      caption: nft.name,
    })));

  } catch(e) {
    console.log('myNftController.js Error', e);
  }
}

module.exports = myNftController;
