const { Pool } = require("pg");
const getLanguage = require("../utils/getLanguage");

const inviteController = (bot, user) => async (msg, replyMsgId) => {
  const chatId = msg.chat.id;
  const isReply = typeof replyMsgId === 'number';
  const lang = getLanguage(user);

  try {
    console.log(0)
    const pdb = new Pool();
    const invitationsReq = await pdb.query(`select * from invitations where fromtgid='${chatId}' and activatedat=''`);
    const userReq = await pdb.query(`select * from users where tgid='${chatId}'`);
    await pdb.end();
console.log(1)
    const invitations = invitationsReq?.rows || [];
    const currentInvitations = invitations.length ? lang.activeInvites : lang.noActiveInvites;
    const userInvitations = userReq?.rows[0]?.invitations;
    
    const currentinvitationsList = [];
    const currentinvitationsBtns = [];
    console.log(2)
    for (let i = 0; i < invitations.length; ++i) {
      console.log(3, i)
      const { totgid, expiresat } = invitations[i];
      // const invitedUser = await bot.getChat(totgid);
      currentinvitationsList.push(lang.inviteTo(totgid, expiresat));
      currentinvitationsBtns.push({
        text: lang.deleteInvite(totgid),
        callback_data: `deleteInvite_${totgid}`,
      })
    }
    console.log(4)

    const messageTxt = lang.yourInvitations(Number(userInvitations), isReply, currentInvitations, currentinvitationsList);
    const messageOptions = {
      parse_mode: 'HTML',
      reply_markup: currentinvitationsBtns.length ? {
        inline_keyboard: [
          ...currentinvitationsBtns.map(btn => ([btn]))
        ],
      } : {},
    };

    console.log(5)

    if (isReply) {
      console.log(6)
      bot.editMessageText(messageTxt, {
        chat_id: chatId, message_id: replyMsgId,
        ...messageOptions
      })
    } else {
      console.log(7)
      bot.sendMessage(chatId, messageTxt, messageOptions);
    }

  } catch(e) {
    console.log('inviteController.js Error', e.toString())
  }
};

module.exports = inviteController;
