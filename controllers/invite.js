const { Pool } = require("pg");

const inviteController = (bot, user) => async (msg, replyMsgId) => {
  const chatId = msg.chat.id;
  const isReply = typeof replyMsgId === 'number';

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
You have ${Number(user.invitations) + (isReply ? 1 : 0)} invitations.

${currentInvitations}${currentinvitationsList.join('')}

${user.invitations > 0 ? '-----------\n\n<i>Forward some message from the user you want to invite</i>' : ''}
        `;
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
};

module.exports = inviteController;
