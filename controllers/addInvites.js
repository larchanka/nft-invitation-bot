const { Pool } = require("pg");
const { getUserIdByLink } = require("../utils/getUserByLink");

const addInvitesController = (bot, _user) => async (msg, match) => {
  const chatId = msg.chat.id;
  const [, invitations, _, user] = match;
  const pdb = new Pool();

  try {

    if (Number(chatId) === Number(process.env.DEFAULT_TG_ACCOUNT)) {
      const userId = await getUserIdByLink(user);
      await pdb.query(`update users set invitations='${invitations}' where tgid=${userId}`);

      bot.sendMessage(chatId, `${invitations} приглашения для @${user} добавлены`);
    } else {
      bot.sendMessage(chatId, `Нет прав`);
    }
  } catch (e) {
    console.log('addInvitesController.js Error', e.toString());
  }
  await pdb.end();
}

module.exports = addInvitesController;
