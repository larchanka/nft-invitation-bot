const { Pool } = require("pg");
const { nft } = require("../config/en");
const generatePreviewUrl = require("../utils/generatePreviewUrl");
const getLanguage = require("../utils/getLanguage");
const getUserNfts = require("../utils/getUserNfts");

const myNftController = (bot, user) => async (msg) => {
  const chatId = msg.chat.id;
  const lang = getLanguage(user);
  const pdb = new Pool();

  try {

    const walletReq = await pdb.query(`select * from verify where tgid=${chatId}`);

    const wallet = walletReq?.rows[0]?.owner;

    const nfts = await getUserNfts(wallet);


    if (!nfts.length) {
      return bot.sendMessage(chatId, lang.noNft);
    }

    const showNfts = nfts.filter(nft => nft.image);
    if (showNfts.length) {
      bot.sendMediaGroup(chatId, showNfts.splice(0,10).map(nft => ({
        type: 'photo',
        media: generatePreviewUrl(nft.image),
        caption: nft.name,
      })));
    } else {
      bot.sendMessage(chatId, lang.somethingWrong);
    }

  } catch(e) {
    console.log('myNftController.js Error', e.toString());
  }
  await pdb.end();
}

module.exports = myNftController;
