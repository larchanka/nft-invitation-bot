const { Pool } = require('pg');
const { amountToBuyForReward, price, userExpiration } = require('../config');
const sendReturn = require('../utils/sendReturn');

const verifyPurchases = async (bot, repeat = true) => {
  try {
    const pdb = new Pool();
    const now = new Date().getTime();
    const uDataReq = await pdb.query(`select * from users where expiresAt>='${now}'`);
    
    await pdb.end();
    
    uDataReq.rows.forEach(async (user) => {
      const pdb = new Pool();
      const purchasesReq = await pdb.query(
        `select distinct tgid, initedByTgId, createdat, payed from purchases 
          where initedByTgId='${user.tgid}' 
          and payed='0' 
          and createdAt<='${Number(user.expiresat)}'
          and createdAt>'${Number(user.expiresat) - (userExpiration * 24 * 60 * 60 * 1000)}' limit 3`
      );
      await pdb.end();
      const totalPurchases = purchasesReq.rowCount;

      if(totalPurchases >= amountToBuyForReward) {
        const sendBack = await sendReturn(user.tgid);

        if (sendBack) {
          const pdb = new Pool();
          purchasesReq.rows.forEach(async purchase => {
            await pdb.query(`update purchases set payed='1' where createdAt='${purchase.createdat}' and initedByTgId='${user.tgid}'`);
          });
          await pdb.end();
        }
        await bot.sendMessage(user.tgid, 'You have a return ' + price + ' TON');
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