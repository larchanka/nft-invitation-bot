const inviteKeyboard = (userId, invite, nft, myNft, settings) => {
  // check if user is valid for invites

  return [
    [
      {text: invite},
      {text: nft},
    ],
    [
      {text: myNft},
      {text: settings},
    ]
  ]
}

module.exports = inviteKeyboard;
