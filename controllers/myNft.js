const { Pool } = require("pg");
const { nft } = require("../config/en");
const getLanguage = require("../utils/getLanguage");
const getUserNfts = require("../utils/getUserNfts");

const myNftController = (bot, user) => async (msg) => {
  const chatId = msg.chat.id;
  const lang = getLanguage(user);

  try {
    const pdb = new Pool();

    const walletReq = await pdb.query(`select * from verify where tgid=${chatId}`);
    await pdb.end();

    const wallet = walletReq?.rows[0]?.owner;

    const nfts = await getUserNfts(wallet);


    if (!nfts.length) {
      return bot.sendMessage(chatId, lang.noNft);
    }

    const showNfts = nfts.filter(nft => nft.image);
    if (showNfts.length) {
      bot.sendMediaGroup(chatId, showNfts.splice(0,10).map(nft => ({
        type: 'photo',
        media: 'https://www.meetup.com/_next/image/?url=https%3A%2F%2Fsecure-content.meetupstatic.com%2Fimages%2Fclassic-events%2F505421614%2F676x380.webp&w=3840&q=75', // nft.image,
        caption: nft.name,
      })));
    } else {
      bot.sendMessage(chatId, lang.somethingWrong);
    }

  } catch(e) {
    console.log('myNftController.js Error', e.toString());
  }
}

module.exports = myNftController;
