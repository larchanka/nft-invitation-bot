const inviteKeyboard = (userId, invite, nft, myNft, settings, howToBuy, links, roadmap) => {
  // check if user is valid for invites

  return [
    [
      {text: invite},
      {text: nft},
    ],
    [
      {text: myNft},
      {text: settings},
    ],
    [
      {text: howToBuy},
      {text: links},
      // {text: roadmap},
    ]
  ]
}

module.exports = inviteKeyboard;
