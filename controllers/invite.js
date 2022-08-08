const { Pool } = require("pg");
const getLanguage = require("../utils/getLanguage");
const { getUserDataByLink } = require("../utils/getUserByLink");

const inviteController = (bot, user) => async (msg, replyMsgId) => {
  const chatId = msg.chat.id;
  const isReply = typeof replyMsgId === 'number';
  const lang = getLanguage(user);
  const pdb = new Pool();

  try {
    console.log(`select * from invitations where fromtgid='${chatId}' and activatedat is null`)
    console.log(`select * from users where tgid='${chatId}'`);

    const invitationsReq = await pdb.query(`select * from invitations where fromtgid='${chatId}' and activatedat is null`);
    const invitationsAcceptedReq = await pdb.query(`select * from invitations where fromtgid='${chatId}' and activatedat is not null`);
    const userReq = await pdb.query(`select * from users where tgid='${chatId}'`);

    const invitations = invitationsReq?.rows || [];
    const invitationsAccepted = invitationsAcceptedReq?.rows || [];
    const currentInvitations = invitations.length ? lang.activeInvites : lang.noActiveInvites;
    const userInvitations = userReq?.rows[0]?.invitations;
    
    const currentinvitationsList = [];
    const currentinvitationsAcceptedList = [];
    const currentinvitationsBtns = [];
    
    for (let i = 0; i < invitations.length; ++i) {
      const { totgid, expiresat } = invitations[i];
      let invitedUser;
      
      try {
        invitedUser = await bot.getChat(Number(totgid));
      } catch(e) {
        console.log(e.toString());
      }
      currentinvitationsList.push(lang.inviteTo(invitedUser?.username ? `@${invitedUser.username}` : totgid, expiresat));
      currentinvitationsBtns.push({
        text: lang.deleteInvite(invitedUser?.username ? `@${invitedUser.username}` : totgid),
        callback_data: `deleteInvite_${totgid}`,
      })
    }

    for (let i = 0; i < invitationsAccepted.length; ++i) {
      const { totgid } = invitationsAccepted[i];
      
      const userReq = await pdb.query(`select * from users where tgid=${totgid} limit 1`);

      const userData = userReq?.rows[0];

      let invitedUser;
      
      try {
        invitedUser = await bot.getChat(Number(totgid));
      } catch(e) {
        console.log(e.toString());
      }

      if (invitedUser) {
        currentinvitationsAcceptedList.push(lang.inviteAccepted(invitedUser?.username ? `@${invitedUser.username}` : totgid, userData?.purchases || 0));
      }
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
      bot.sendMessage(chatId, lang.yourAcceptedInvitations(invitationsAccepted.length, currentinvitationsAcceptedList));
    }

  } catch(e) {
    console.log('inviteController.js Error', e.toString())
  }
  await pdb.end();
};

module.exports = inviteController;
