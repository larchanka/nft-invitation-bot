const { nftBuy, invite } = require("../config/actions");

const buyNftKeyboard = (userId) => {
  // check if user is valid for invites

  return [
    [
      {text: nftBuy, callback_data: nftBuy }
    ]
  ]
}

module.exports = buyNftKeyboard;
