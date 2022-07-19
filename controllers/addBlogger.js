const { Pool } = require("pg");
const getUserByLink = require("../utils/getUserByLink");

const addBloggerController = (bot, _user) => async (msg, match) => {
  const chatId = msg.chat.id;
  const [, invitations, _, user] = match;

  try {
    const userId = await getUserByLink(user);
    const pdb = new Pool();
    await pdb.query(`update users set level='2', invitations='${invitations}' where tgid=${userId}`);
    await pdb.end();

    bot.sendMessage(chatId, `Блоггер @${user} добавлен со ${invitations} приглашениями`)
  } catch (e) {
    console.log('addBloggerController.js Error', e.toString());
  }
}

module.exports = addBloggerController;
