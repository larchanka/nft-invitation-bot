const { Pool } = require('pg');
const { amountToBuyForReward, price, userExpiration } = require('../config');
const getLanguage = require('../utils/getLanguage');
const sendReturn = require('../utils/sendReturn');

const verifyPurchases = async (bot, repeat = true) => {
  try {
    const pdb = new Pool();
    const now = new Date().getTime();
    const uDataReq = await pdb.query(`select * from users where expiresAt>='${now}'`);

    console.log({
      uDataReq: uDataReq.rows
    })
    
    await pdb.end();
    
    uDataReq.rows.forEach(async (user) => {
      let reward = price;
      const lang = getLanguage(user.lang);

      if (Number(user.level) === 1) {
        const pdb = new Pool();
        const purchasesReq = await pdb.query(
          `select distinct tgid, initedByTgId, createdat, payed from purchases 
            where initedByTgId='${user.tgid}' 
            and payed='0' 
            and createdAt<='${Number(user.expiresat)}' limit ${amountToBuyForReward}`
        );
        await pdb.end();
        const totalPurchases = purchasesReq.rowCount;

        if(totalPurchases === amountToBuyForReward) {
          const sendBack = await sendReturn(user.tgid);

          if (sendBack) {
            const pdb = new Pool();
            purchasesReq.rows.forEach(async purchase => {
              await pdb.query(`update purchases set payed='1' where createdAt='${purchase.createdat}' and initedByTgId='${user.tgid}'`);
            });
            await pdb.end();
            await bot.sendMessage(user.tgid, lang.reward(reward));
          }
        }
      } else if (Number(user.level) === 2) {
        reward = (price * 0.3333333333).toFixed(4);
        const pdb = new Pool();
        const purchasesReq = await pdb.query(
          `select distinct tgid, initedByTgId, createdat, payed from purchases 
            where initedByTgId='${user.tgid}' 
            and payed='0' 
            and createdAt<='${Number(user.expiresat)}'`
        );
        await pdb.end();
console.log(purchasesReq.rows)
        purchasesReq.rows.forEach(
          async (purchase) => {
            const sendBack = await sendReturn(user.tgid, reward);

            if (sendBack) {
              const pdb = new Pool();
              await pdb.query(`update purchases set payed='1' where createdAt='${purchase.createdat}' and initedByTgId='${user.tgid}'`);
              await pdb.end();
              await bot.sendMessage(user.tgid, lang.reward(reward));
            }

          }
        );
      }
    });


  } catch(e) {
    console.log('verifyPurchases.js Error', e)
  }

  if (repeat) {
    setTimeout(() => verifyPurchases(bot), 30 * 1000)
  }
}

module.exports = verifyPurchases;