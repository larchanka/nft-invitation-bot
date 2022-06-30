const { Pool } = require("pg");
const inviteController = require("./invite");

const deleteInvitationController = (bot, user) => async (msg, match) => {
  const chatId = msg.chat.id;
  try {
    const pdb = new Pool();
    await pdb.query(`delete from invitations where totgid=${Number(match)}`);
    await pdb.query(`UPDATE users SET invitations=invitations+1
    WHERE tgid=${chatId};`);
    await pdb.end();

    inviteController(bot, user)(msg, msg.message_id)
  } catch (e) {
    console.log('deleteInvitationController.js Error', e.toString());
  }
}

module.exports = deleteInvitationController;
