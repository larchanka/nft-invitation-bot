const { Pool } = require('pg');
const TonWeb = require('tonweb');
const { price, userExpiration } = require('../config');
const { buyNftKeyboard } = require('../utils');
const sendNft = require('../utils/sendNft');

const verifyTransactions = async (bot, repeat = true) => {
  try {
    const pdb = new Pool();
    const transactionsReq = await fetch(`${process.env.TONCENTER_BASE}getTransactions?address=${process.env.SC_WALLET}&limit=10&to_lt=0&archival=false`);
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
            const walletReq = await pdb.query(`select * from verify where owner='${source}'`);

            const tgid = walletReq.rows[0]?.tgid;

            const purchase = await sendNft(source);
            
            if (purchase) {
              await pdb.query(`delete from transactions where owner='${source}' and secret='${msg}'`);
              const uReq = await pdb.query(`select * from verify where owner='${source}'`);

              const nftReq = await fetch(
                `${process.env.TON_API}v1/nft/getItem?account=${purchase}`);

              const nftData = await nftReq.json();

              if(uReq?.rows[0]) {
                console.log(`update users set invitations=invitations+3 expiresAt='${new Date().getTime() + userExpiration * 24 * 60 * 60 * 1000}' where tgid=${uReq.rows[0].tgid}`)
                await pdb.query(`update users set invitations=invitations+3, expiresAt='${new Date().getTime() + userExpiration * 24 * 60 * 60 * 1000}' where tgid=${uReq.rows[0].tgid}`)
                bot.sendPhoto(uReq.rows[0].tgid, nftData.metadata.image, {
                  caption: 'You just purchased this NFT',
                });
              }
            }
          }
        }
      })
    }

    await pdb.end();

  } catch(e) {
    console.log('verifyTransactions.js Error', e)
  }

  if (repeat) {
    setTimeout(() => verifyTransactions(bot), 30 * 1000)
  }
}

module.exports = verifyTransactions;