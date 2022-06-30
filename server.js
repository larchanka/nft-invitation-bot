require('dotenv').config();

const { invite, ru, en, nft, nftBuy, myNft, settings, language, wallet } = require('./config/actions');
const validateAccess = require('./utils/validateAccess');
const bot = require('./connections/telegram');
const startController = require('./controllers/start');
const inviteController = require('./controllers/invite');
const generalMessageController = require('./controllers/_');
const languageController = require('./controllers/language');
const nftCheckConfroller = require('./controllers/nftCheck');
const walletController = require('./controllers/wallet');
const buyNftController = require('./controllers/buyNft');
const verifyTransactions = require('./tasks/verifyTransactions');
const myNftController = require('./controllers/myNft');
const { settingsController, settingsLanguageController, settingsWalletController } = require('./controllers/settings');
const deleteInvitationController = require('./controllers/deleteInvitation');

bot.onText(/^\/start/, validateAccess(bot, startController));

bot.onText(new RegExp('^' + invite), validateAccess(bot, inviteController));

bot.onText(new RegExp('^' + nft), validateAccess(bot, nftCheckConfroller));

bot.onText(new RegExp('^' + myNft), validateAccess(bot, myNftController));

bot.onText(new RegExp('^' + settings), validateAccess(bot, settingsController));

bot.onText(new RegExp('^(' + ru + '|' + en + ')'), validateAccess(bot, languageController));

bot.onText(new RegExp('^[a-zA-Z0-9-_]{48}$'), validateAccess(bot, walletController));

bot.on('message', validateAccess(bot, generalMessageController, false));

bot.on("callback_query", (callbackQuery) => {
  const msg = callbackQuery.message;
  const command = callbackQuery.data;

    bot.answerCallbackQuery(callbackQuery.id)
        .then((data) => {
          if (data) {

            if (command === 'nftBuy') {
              return validateAccess(bot, buyNftController)(msg);
            }

            if (command === 'language') {
              return validateAccess(bot, settingsLanguageController)(msg);
            }

            if (command === 'wallet') {
              return validateAccess(bot, settingsWalletController)(msg);
            }

            const deleteInviteMatch = command.match(/^deleteInvite_([0-9]{1,})$/);

            if (deleteInviteMatch) {
              return validateAccess(bot, deleteInvitationController)(msg, [deleteInviteMatch[1]]);
            }
          }
        });
});

verifyTransactions(bot);
