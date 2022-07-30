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
const verifyPurchases = require('./tasks/verifyPurchases');
const englishLang = require('./config/en');
const russianLang = require('./config/ru');
const linksController = require('./controllers/links');
const howToBuyController = require('./controllers/howToBuy');
const roadmapController = require('./controllers/roadmap');
const extendLevel2 = require('./tasks/extendLevel2');
const addBloggerController = require('./controllers/addBlogger');
const deleteBloggerController = require('./controllers/deleteBlogger');
const addInvitesController = require('./controllers/addInvites');


bot.onText(new RegExp(`^(${englishLang.invite}|${russianLang.invite})`), validateAccess(bot, inviteController));

bot.onText(new RegExp(`^(${englishLang.nft}|${russianLang.nft})`), validateAccess(bot, nftCheckConfroller));

bot.onText(new RegExp(`^(${englishLang.myNft}|${russianLang.myNft})`), validateAccess(bot, myNftController));

bot.onText(new RegExp(`^(${englishLang.settings}|${russianLang.settings})`), validateAccess(bot, settingsController));

bot.onText(new RegExp(`^(${englishLang.links}|${russianLang.links})`), validateAccess(bot, linksController));

bot.onText(new RegExp(`^(${englishLang.howTobuy}|${russianLang.howTobuy})`), validateAccess(bot, howToBuyController));

bot.onText(new RegExp(`^(${englishLang.roadmap}|${russianLang.roadmap})`), validateAccess(bot, roadmapController));

bot.onText(new RegExp('^(' + ru + '|' + en + ')'), validateAccess(bot, languageController));

bot.onText(new RegExp('^/bl_([0-9]+) (\@|https:\/\/t.me\/)([a-zA-Z0-9-_]{3,})'), validateAccess(bot, addBloggerController));
bot.onText(new RegExp('^/dbl (\@|https:\/\/t.me\/)([a-zA-Z0-9-_]{3,})'), validateAccess(bot, deleteBloggerController));
bot.onText(new RegExp('^/in_([0-9]+) (\@|https:\/\/t.me\/)([a-zA-Z0-9-_]{3,})'), validateAccess(bot, addInvitesController));


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
verifyPurchases(bot);
extendLevel2(bot);
