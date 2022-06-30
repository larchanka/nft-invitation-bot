require('dotenv').config();

const { invite, ru, en, nft, nftBuy, myNft } = require('./config/actions');
const validateAccess = require('./utils/validateAccess');
const bot = require('./connections/telegram');
const startController = require('./controllers/start');
const inviteController = require('./controllers/invite');
const generalMessageController = require('./controllers/_');
const languageController = require('./controllers/languageController');
const nftCheckConfroller = require('./controllers/nftCheck');
const walletController = require('./controllers/walletController');
const buyNftController = require('./controllers/buyNft');
const verifyTransactions = require('./tasks/verifyTransactions');
const myNftController = require('./controllers/myNft');

require('./connections/firebase');

require('./connections/postgres');

bot.onText(/^\/start/, validateAccess(bot, startController));

bot.onText(new RegExp('^' + invite), validateAccess(bot, inviteController));

bot.onText(new RegExp('^' + nft), validateAccess(bot, nftCheckConfroller));

bot.onText(new RegExp('^' + myNft), validateAccess(bot, myNftController));

bot.onText(new RegExp('^(' + ru + '|' + en + ')'), validateAccess(bot, languageController));

bot.onText(new RegExp('^[a-zA-Z0-9-_]{48}$'), validateAccess(bot, walletController));

bot.on('message', validateAccess(bot, generalMessageController, false));

bot.on("callback_query", (callbackQuery) => {
  const msg = callbackQuery.message;
  const command = callbackQuery.data;

  if (command === nftBuy) {
    bot.answerCallbackQuery(callbackQuery.id)
        .then((data) => {
          if (data) {
            validateAccess(bot, buyNftController)(msg);
          }
        });
  }
});

verifyTransactions(bot);
