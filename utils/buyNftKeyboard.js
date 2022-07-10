const buyNftKeyboard = (userId, nftBuy) => {
  // check if user is valid for invites

  return [
    [
      {text: nftBuy, callback_data: 'nftBuy' }
    ]
  ]
}

module.exports = buyNftKeyboard;
