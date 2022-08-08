const { Pool } = require("pg");
const { getUserIdByLink } = require("../utils/getUserByLink");

const addBloggerController = (bot, _user) => async (msg, match) => {
  const chatId = msg.chat.id;
  const [, invitations, _, user] = match;

  try {

    if (Number(chatId) === Number(process.env.DEFAULT_TG_ACCOUNT)) {
      const userId = await getUserIdByLink(user);
      const pdb = new Pool();
      await pdb.query(`update users set level='2', invitations='${invitations}' where tgid=${userId}`);
      await pdb.end();

      bot.sendMessage(chatId, `Блоггер @${user} добавлен со ${invitations} приглашениями`);
    } else {
      bot.sendMessage(chatId, `Нет прав`);
    }
  } catch (e) {
    console.log('addBloggerController.js Error', e.toString());
  }
}

module.exports = addBloggerController;
