const { Pool } = require("pg");
const { getUserIdByLink } = require("../utils/getUserByLink");

const deleteBloggerController = (bot, _user) => async (msg, match) => {
  const chatId = msg.chat.id;
  const [, _, user] = match;
  const pdb = new Pool();

  try {

    if (Number(chatId) === Number(process.env.DEFAULT_TG_ACCOUNT)) {
      const userId = await getUserIdByLink(user);
      await pdb.query(`update users set level='1', invitations='0' where tgid=${userId}`);

      bot.sendMessage(chatId, `Блоггер @${user} удален`);
    } else {
      bot.sendMessage(chatId, `Нет прав`);
    }
    
  } catch (e) {
    console.log('deleteBloggerController.js Error', e.toString());
  }
  await pdb.end();
}

module.exports = deleteBloggerController;
