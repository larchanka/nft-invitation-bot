const { language, wallet } = require("../config/actions");

const settingsKeyboard = (userId) => {
  // check if user is valid for invites

  return [
    [
      {text: language, callback_data: 'language' },
      {text: wallet, callback_data: 'wallet' }
    ]
  ]
}

module.exports = settingsKeyboard;
