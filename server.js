require('dotenv').config();

const { invite } = require('./config/actions');
const validateAccess = require('./utils/validateAccess');
const bot = require('./connections/telegram');
const startController = require('./controllers/start');
const inviteController = require('./controllers/invite');
const generalMessageController = require('./controllers/_');

require('./connections/firebase');

bot.onText(/^\/start/, validateAccess(bot, startController));

bot.onText(new RegExp('^' + invite), validateAccess(bot, inviteController));

bot.on('message', validateAccess(bot, generalMessageController, false));
