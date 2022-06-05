const { invite, nft } = require("../config/actions");

const inviteKeyboard = (userId) => {
  // check if user is valid for invites

  return [
    [
      {text: invite},
      {text: nft}
    ]
  ]
}

module.exports = inviteKeyboard;
