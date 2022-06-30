const { Pool } = require("pg");

const inviteController = (bot, user) => async (msg, replyMsgId) => {
  const chatId = msg.chat.id;

  try {
    const pdb = new Pool();

    const invitationsReq = await pdb.query(`select * from invitations where fromtgid=${chatId} and activatedat=''`);
    await pdb.end();
    const invitations = invitationsReq?.rows || [];
    const currentInvitations = invitations.length ? 'Your active invites:' : 'You dont have active invites';
    

    const currentinvitationsList = [];
    const currentinvitationsBtns = [];
    
    for (let i = 0; i < invitations.length; ++i) {
      const { totgid, expiresat } = invitations[i];
      const invitedUser = await bot.getChat(totgid);
      currentinvitationsList.push(`\n- to @${invitedUser.username}, expires at ${new Date(Number(expiresat)).toLocaleDateString()}`);
      currentinvitationsBtns.push({
        text: `Delete invite for @${invitedUser.username}`,
        callback_data: `deleteInvite_${totgid}`,
      })
    }

    const messageTxt = `
You have ${user.invitations} invitations.

${currentInvitations}${currentinvitationsList.join('')}

${user.invitations > 0 ? 'Forward some message from the user you want to invite' : ''}
        `;
    const messageOptions = {
      reply_markup: currentinvitationsBtns.length ? {
        inline_keyboard: [
          ...currentinvitationsBtns.map(btn => ([btn]))
        ],
      } : {},
    };

    if (typeof replyMsgId === 'number') {
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
};

module.exports = inviteController;
