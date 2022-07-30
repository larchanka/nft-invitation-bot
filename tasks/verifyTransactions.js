const { Pool } = require('pg');
const TonWeb = require('tonweb');
const https = require('https');
const { price, userExpiration, collectionParams } = require('../config');
const generatePreviewUrl = require('../utils/generatePreviewUrl');
const sendNft = require('../utils/sendNft');
const getLanguage = require('../utils/getLanguage');

const verifyTransactions = async (bot, repeat = true) => {
  const pdb = new Pool();
  try {
    const transactionsReq = await fetch(`${process.env.TONCENTER_BASE}getTransactions?address=${process.env.OWNER}&limit=10&to_lt=0&archival=false`, {
      agent: new https.Agent({
        rejectUnauthorized: false,
      })
    });
    const transactionsList = await transactionsReq.json();

    if (transactionsList?.result) {
      const transactions = transactionsList.result;

      transactions.forEach(async (i) => {
        const transaction = i['in_msg']
        const value = transaction['value'];
        const msg = transaction['message'];
        const source = transaction['source'];

        if(Number(TonWeb.utils.fromNano(value)) === price && msg) {
          const trReq = await pdb.query(`select * from transactions where owner='${source}' and secret='${msg}'`);

          if (trReq?.rowCount) {
            const purchase = await sendNft(source);
            
            if (purchase) {
              await pdb.query(`delete from transactions where owner='${source}' and secret='${msg}'`);
              const uReq = await pdb.query(`select * from verify where owner='${source}'`);

              const nftReq = await fetch(
                `${process.env.TON_API}v1/nft/getItem?account=${purchase}`);

              const nftData = await nftReq.json();
              
              if(uReq?.rows[0]) {
                const tgId = uReq.rows[0].tgid;

                const uDataReq = await pdb.query(`select * from users where tgid='${tgId}' limit 1`);
                const invitedByTgId = uDataReq?.rows[0].invitedbytgid;
                const lang = getLanguage(uDataReq?.rows[0]?.lang);
                await pdb.query(`update users set invitations=invitations+3, purchases=purchases+1, expiresAt=${new Date().getTime() + userExpiration * 24 * 60 * 60 * 1000} where tgid='${tgId}'`);
                await pdb.query(`insert into purchases (tgid, initedByTgId, createdAt, payed) values (${tgId}, ${invitedByTgId}, ${new Date().getTime()}, 0)`);

                bot.sendPhoto(uReq.rows[0].tgid, generatePreviewUrl(nftData.metadata.image), {
                  caption: lang.congrats,
                });
              }
            }
          }
        }
      })
    }

  } catch(e) {
    console.log('verifyTransactions.js Error', e)
  }
  await pdb.end();

  if (repeat) {
    setTimeout(() => verifyTransactions(bot), 30 * 1000)
  }
}

module.exports = verifyTransactions;