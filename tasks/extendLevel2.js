const { Pool } = require('pg');
const { amountToBuyForReward, price, userExpiration } = require('../config');
const sendReturn = require('../utils/sendReturn');

const extendLevel2 = async (bot, repeat = true) => {
  try {
    const pdb = new Pool();
    const now = new Date().getTime();
    await pdb.query(`update users set expiresat='${now + 7 * 24 * 60 * 60 * 1000}' where level='2'`);
    
    await pdb.end();

  } catch(e) {
    console.log('extendLevel2.js Error', e)
  }

  if (repeat) {
    setTimeout(() => extendLevel2(bot), 30 * 1000)
  }
}

module.exports = extendLevel2;