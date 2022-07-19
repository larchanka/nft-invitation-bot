const russianLang = {
  invite: '➕ Инвайты',
  nft: '🎑 Наши NFT',
  nftBuy: '🎑 Купить NFT',
  ru: 'Русский',
  en: 'English',
  myNft: 'Мои NFT',
  forward: 'Переслать',
  invitation: `Привет. Вы получили доступ через инвайт для покупки NFT коллекции CREDU Crypto Legion. У вас осталось " X " времени до окончания возможности покупки, по истечение времени инвайт сгорает.`,
  forwardTo: `Перешлите это сообщение в телеграме пользователю, которому вы хотите дать инвайт`,
  forwardFrom: 'Пришлите имя пользователя, например @username',
  invited: 'Пользователь уже приглашен',
  noInvitations: 'У вас нет приглашений',
  sendTonTo: (price, owner, randomText) => (`Пришлите <strong>${price}</strong> TON на адрес \n
<code>${owner}</code>\n

вот с таким описанием\n
<code>${randomText}</code>`),
  ruSelected: 'Вы выбрали русский язык',
  enSelected: 'You selected english language',
  noNft: 'У вас нет NFT',
  yourNft: 'Это ваши NFT',
  sendWallet: 'Пришлите мне адрес кошелька TON',
  weHave: (number, price, nextPrice) => (`У нас есть ${number} NFT для продажи по ${price} TON\nСледующие 111 NFT будут стоить ${nextPrice} TON`),
  noFreeNft: 'У нас нет NFT в продаже',
  selectLang: 'Select language | Выберите язык',
  selectAction: 'Выберите действие',
  walletSaved: 'Адрес кошелька TON сохранен',
  deleteInvite: (toTgId) => `Удалить прглашение для ${toTgId}`,
  inviteTo: (totgid, expiresat) => `\n- для ${totgid}, истекает ${new Date(Number(expiresat)).toLocaleDateString()}`,
  activeInvites: 'Ваши активные приглашения:',
  noActiveInvites: 'Вы никого не пригласили',
  yourInvitations: (invitations, isReply, currentInvitations, currentinvitationsList) => `
У вас ${Number(invitations) + (isReply ? 1 : 0)} неиспользованных приглашений.

${currentInvitations}${currentinvitationsList.join('')}

${invitations > 0 ? '-----------\n\n<i>Пришлите мне имя пользователя, которого хотите пригласить. Например @username</i>' : ''}
  `,
  somethingWrong: 'Что-то пошло не так. Попробуйте позже.',
  whatToChange: 'Что вы хотите изменить.',
  language: 'Язык',
  wallet: 'Кошелек TON',
  mainAction: 'Начать сначала',
  settings: 'Настройки',
  congrats: `
Поздравляем! 
Вы теперь стали Crypto-легионером.
У вас появилось 3 инвайта, которыми вы можете поделиться с друзьями.
Если в течение 7 дней с этого момента по 3 инвайтам будут покупки NFT Мы отправим 100% вашей стоимости NFT на ваш кошелек TON.
  `,
  howTobuy: '💎 Как купить TON?',
  links: '🌍 Ссылки',
  roadmap: '🗺 Дорожная карта',
  linksContent: `
сайт - https://credu.io
телеграм RU - https://t.me/nftcreduru
телеграм EN - https://t.me/nftcreduen
  `,
  howTobuyContent: `
Как купить валюту TON?

1) Сначала вам нужно скачать и установить кошелек Tonkeeper (https://tonkeeper.com/)
2) Теперь вы можете приобрести криптовалюту TON через сервис @wallet или через @CryptoBot
3) альтернативный вариант покупки через проверенные биржи от bestchange (слева в столбике выбираете пару к TON Coin и меняете через гаранта).
  `,
  roadmapContent: `
Запуск продажи NFT - 8 июля 2022
Старт закрытого клуба - 8 сентября 2022
AirDrop секретных NFT - 8 ноября 2022
  `,
  reward: (number) => `Вы получили ${number} TON`,
};

module.exports = russianLang;
