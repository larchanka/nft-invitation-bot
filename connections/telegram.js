const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_KEY;

if (!token) {
  throw Error('No telegram token');
}

const bot = new TelegramBot(token, { polling: true });

module.exports = bot;
