const { Pool } = require("pg");
const { nft } = require("../config/en");
const getUserNfts = require("../utils/getUserNfts");

const myNftController = (bot, user) => async (msg) => {
  const chatId = msg.chat.id;

  try {
    const pdb = new Pool();

    const walletReq = await pdb.query(`select * from verify where tgid=${chatId}`);
    await pdb.end();

    const wallet = walletReq?.rows[0]?.owner;

    const nfts = await getUserNfts(wallet);

    if (!nfts.length) {
      return bot.sendMessage(chatId, 'You dont have any NFTs yet');
    }

    const showNfts = nfts.filter(nft => nft.image);
    if (showNfts.length) {

      bot.sendMediaGroup(chatId, showNfts.splice(0,10).map(nft => ({
        type: 'photo',
        media: nft.image,
        caption: nft.name,
      })));
    } else {
      bot.sendMessage(chatId, 'Something went wrong. Try again later!');
    }

  } catch(e) {
    console.log('myNftController.js Error', e.toString());
  }
}

module.exports = myNftController;
