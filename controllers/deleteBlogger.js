const { Pool } = require("pg");
const getUserByLink = require("../utils/getUserByLink");

const deleteBloggerController = (bot, _user) => async (msg, match) => {
  const chatId = msg.chat.id;
  const [, _, user] = match;

  try {
    const userId = await getUserByLink(user);
    const pdb = new Pool();
    await pdb.query(`update users set level='1', invitations='0' where tgid=${userId}`);
    await pdb.end();

    bot.sendMessage(chatId, `Блоггер @${user} удален`)
  } catch (e) {
    console.log('deleteBloggerController.js Error', e.toString());
  }
}

module.exports = deleteBloggerController;
