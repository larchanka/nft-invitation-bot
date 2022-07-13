const englishLang = {
  invite: '➕ Invite',
  nft: '🎑 NFT',
  nftBuy: '🎑 Buy NFT',
  ru: 'Русский',
  en: 'English',
  myNft: 'My NFTs',
  forward: 'Forward',
  invitation: `Hello. You have been invited to join World of NFTS.\n\nChat with this bot to start `,
  forwardTo: `Forward message you see above to the user you just invited`,
  forwardFrom: 'Send me username, i.e. @username',
  invited: 'User is already invited',
  noInvitations: 'You don\'t have invitations.',
  sendTonTo: (price, owner, randomText) => (`Send <strong>${price}</strong> TON to \n
<code>${owner}</code>\n

with this description\n
<code>${randomText}</code>`),
  ruSelected: 'Вы выбрали русский язык',
  enSelected: 'You selected english language',
  noNft: 'You don\'t have NFT yet',
  yourNft: 'These are your NFTs',
  sendWallet: 'Send me your TON Wallet address',
  weHave: (number) => (`We have ${number} available`),
  noFreeNft: 'No NFTs are available',
  selectLang: 'Select language | Выберите язык',
  selectAction: 'Select action',
  walletSaved: 'TON wallet address saved',
  deleteInvite: (toTgId) => `Delete invite for ${toTgId}`,
  inviteTo: (totgid, expiresat) => `\n- to ${totgid}, expires at ${new Date(Number(expiresat)).toLocaleDateString()}`,
  activeInvites: 'Your active invites:',
  noActiveInvites: 'You dont have active invites',
  yourInvitations: (invitations, isReply, currentInvitations, currentinvitationsList) => `
You have ${Number(invitations) + (isReply ? 1 : 0)} invitations.

${currentInvitations}${currentinvitationsList.join('')}

${invitations > 0 ? '-----------\n\n<i>Send me username of the user you want to invite, i.e. `@super_user`</i>' : ''}
  `,
  somethingWrong: 'Something went wrong. Try again later!',
  whatToChange: 'What do you want to change',
  language: 'Language',
  wallet: 'Wallet Address',
  mainAction: 'Start from teh beginning',
  settings: 'Settings',
  congrats: `
Congratulations! 
Now you have 3 more invitations, which you can use to invite your friends.
If they will buy NFT during a week, you will receive you NFT's price back
  `,
  howTobuy: '💎 How To Buy TON?',
  links: '🌍 Links',
  roadmap: '🗺 RoadMap',
  linksContent: `
site - https://credu.io
telegram RU - https://t.me/nftcreduru
telegram EN - https://t.me/nftcreduen
  `,
  howTobuyContent: `
How to buy TON?

1) Download and istall wallet Tonkeeper (https://tonkeeper.com/)
2) Now you can buy TON using @wallet or @CryptoBot
3) You can also use respectable market, i.e. bestchange (select pair with TON Coin and just exchange).
  `,
  roadmapContent: `
Start of NFT sale - July 8, 2022
Start of private club - September 8, 2022
Secret NFT AirDrop - November 8, 2022
  `,
};

module.exports = englishLang;
