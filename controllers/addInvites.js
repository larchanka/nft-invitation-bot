const { Pool } = require("pg");
const getUserByLink = require("../utils/getUserByLink");

const addInvitesController = (bot, _user) => async (msg, match) => {
  const chatId = msg.chat.id;
  const [, invitations, _, user] = match;

  try {

    if (Number(chatId) === Number(process.env.DEFAULT_TG_ACCOUNT)) {
      const userId = await getUserByLink(user);
      const pdb = new Pool();
      await pdb.query(`update users set invitations='${invitations}' where tgid=${userId}`);
      await pdb.end();

      bot.sendMessage(chatId, `${invitations} приглашения для @${user} добавлены`);
    } else {
      bot.sendMessage(chatId, `Нет прав`);
    }
  } catch (e) {
    console.log('addInvitesController.js Error', e.toString());
  }
}

module.exports = addInvitesController;
