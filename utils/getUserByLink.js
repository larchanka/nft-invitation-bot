const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const { Api } = require("telegram/tl");

const getUserByLink = async (username) => {
  const apiId = 185045;
  const apiHash = "8a12499d57545e35da5e638b38b90667";

  try {
    const client = new TelegramClient(new StringSession(""), apiId, apiHash, {
      connectionRetries: 5,
    });
    await client.start({
      botAuthToken: process.env.BOT_KEY,
    });
  
    const result = await client.invoke(
      new Api.users.GetFullUser({
        id: username,
      })
    );

   const userTgId = Number(result?.fullUser?.id?.value);

   return userTgId;

  } catch (e) {
    console.log('Cannot get user', username, e.toString())

    return undefined;
  }
}

module.exports = getUserByLink;
