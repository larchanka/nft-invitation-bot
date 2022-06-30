const { Pool } = require("pg");
const getUserNfts = require("../utils/getUserNfts");

const myNftController = (bot, user) => async (msg) => {
  const chatId = msg.chat.id;

  try {
    const pdb = new Pool();

    const walletReq = await pdb.query(`select * from verify where tgid=${chatId}`);
    pdb.end();

    const wallet = walletReq?.rows[0]?.owner;

    const nfts = await getUserNfts(wallet);

    if (!nfts.length) {
      return bot.sendMessage(chatId, 'You dont have any NFTs yet');
    }

    await bot.sendMessage(chatId, 'these are your nfts');

    for (let i = 0; i < nfts.length; ++i) {
      const nft = nfts[i];
      if (nft?.image) {
        setTimeout(async () => {
          await bot.sendPhoto(chatId, nft.image, {
            caption: nft.name,
          });
        }, 100 * i);
      }
    }

  } catch(e) {
    console.log('myNftController.js Error', e);
  }
}

module.exports = myNftController;
