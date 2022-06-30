const { ru, en } = require("../config/actions");

const languageKeyboard = (userId) => {
  // check if user is valid for invites

  return [
    [
      {text: ru},
      {text: en}
    ]
  ]
}

module.exports = languageKeyboard;
