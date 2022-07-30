const { Pool } = require('pg');
const { amountToBuyForReward, price, userExpiration } = require('../config');
const getLanguage = require('../utils/getLanguage');
const sendReturn = require('../utils/sendReturn');

const verifyPurchases = async (bot, repeat = true) => {
  const pdb = new Pool();
  try {
    const now = new Date().getTime();
    const uDataReq = await pdb.query(`select * from users where expiresAt>='${now}'`);
    
    uDataReq.rows.forEach(async (user) => {
      let reward = price;
      const lang = getLanguage(user.lang);

      if (Number(user.level) === 1) {
        const purchasesReq = await pdb.query(
          `select distinct tgid, initedByTgId, createdat, payed from purchases 
            where initedByTgId='${user.tgid}' 
            and payed='0' 
            and createdAt<='${Number(user.expiresat)}' limit ${amountToBuyForReward}`
        );
        const totalPurchases = purchasesReq.rowCount;

        if(totalPurchases === amountToBuyForReward) {
          const sendBack = await sendReturn(user.tgid);

          if (sendBack) {
            purchasesReq.rows.forEach(async purchase => {
              await pdb.query(`update purchases set payed='1' where createdAt='${purchase.createdat}' and initedByTgId='${user.tgid}'`);
            });
            await bot.sendMessage(user.tgid, lang.reward(reward));
          }
        }
      } else if (Number(user.level) === 2) {
        reward = (price * 0.3333333333).toFixed(4);
        const purchasesReq = await pdb.query(
          `select distinct tgid, initedByTgId, createdat, payed from purchases 
            where initedByTgId='${user.tgid}' 
            and payed='0' 
            and createdAt<='${Number(user.expiresat)}'`
        );

        purchasesReq.rows.forEach(
          async (purchase) => {
            const sendBack = await sendReturn(user.tgid, reward);

            if (sendBack) {
              await pdb.query(`update purchases set payed='1' where createdAt='${purchase.createdat}' and initedByTgId='${user.tgid}'`);
              await bot.sendMessage(user.tgid, lang.reward(reward));
            }

          }
        );
      }
    });


  } catch(e) {
    console.log('verifyPurchases.js Error', e)
  }
  await pdb.end();

  if (repeat) {
    setTimeout(() => verifyPurchases(bot), 30 * 1000)
  }
}

module.exports = verifyPurchases;