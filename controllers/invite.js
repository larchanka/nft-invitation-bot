const { Pool } = require("pg");
const getLanguage = require("../utils/getLanguage");

const inviteController = (bot, user) => async (msg, replyMsgId) => {
  const chatId = msg.chat.id;
  const isReply = typeof replyMsgId === 'number';
  const lang = getLanguage(user);
  const pdb = new Pool();

  try {
    console.log(`select * from invitations where fromtgid='${chatId}' and activatedat=''`)
    console.log(`select * from users where tgid='${chatId}'`);

    const invitationsReq = await pdb.query(`select * from invitations where fromtgid='${chatId}' and activatedat=NULL`);
    const userReq = await pdb.query(`select * from users where tgid='${chatId}'`);

    const invitations = invitationsReq?.rows || [];
    const currentInvitations = invitations.length ? lang.activeInvites : lang.noActiveInvites;
    const userInvitations = userReq?.rows[0]?.invitations;
    
    const currentinvitationsList = [];
    const currentinvitationsBtns = [];
    
    for (let i = 0; i < invitations.length; ++i) {
      
      const { totgid, expiresat } = invitations[i];
      // const invitedUser = await bot.getChat(totgid);
      currentinvitationsList.push(lang.inviteTo(totgid, expiresat));
      currentinvitationsBtns.push({
        text: lang.deleteInvite(totgid),
        callback_data: `deleteInvite_${totgid}`,
      })
    }

    const messageTxt = lang.yourInvitations(Number(userInvitations), isReply, currentInvitations, currentinvitationsList);
    const messageOptions = {
      parse_mode: 'HTML',
      reply_markup: currentinvitationsBtns.length ? {
        inline_keyboard: [
          ...currentinvitationsBtns.map(btn => ([btn]))
        ],
      } : {},
    };

    if (isReply) {
      bot.editMessageText(messageTxt, {
        chat_id: chatId, message_id: replyMsgId,
        ...messageOptions
      })
    } else {
      bot.sendMessage(chatId, messageTxt, messageOptions);
    }

  } catch(e) {
    console.log('inviteController.js Error', e.toString())
  }
  await pdb.end();
};

module.exports = inviteController;
