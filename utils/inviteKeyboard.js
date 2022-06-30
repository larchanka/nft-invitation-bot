const { invite, nft, myNft } = require("../config/actions");

const inviteKeyboard = (userId) => {
  // check if user is valid for invites

  return [
    [
      {text: invite},
      {text: nft},
      {text: myNft}
    ]
  ]
}

module.exports = inviteKeyboard;
