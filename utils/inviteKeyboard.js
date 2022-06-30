const { invite, nft, myNft, settings } = require("../config/actions");

const inviteKeyboard = (userId) => {
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
