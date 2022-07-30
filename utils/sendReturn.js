const TonWeb = require("tonweb");
const TnMnemonic = require('tonweb-mnemonic');
const { price } = require('../config');
const { Pool } = require('pg');
const callTonApi = require("./callToApi");

const tonweb = new TonWeb(
  new TonWeb.HttpProvider(
    process.env.TONCENTER_BASE + 'jsonRPC',
    {
      apiKey: process.env.TONCENTER_KEY,
    }
  )
);

let key, wallet;

const sendReturn = async (tgId, reward) => {
  const pdb = new Pool();
  try {
    const uDataReq = await pdb.query(`select * from verify where tgid=${tgId}`);

    const walletAddress = uDataReq?.rows[0]?.owner;

    key = await TnMnemonic.mnemonicToKeyPair(process.env.MNEMONIC.split(' '));

    const WalletClass = tonweb.wallet.all[process.env.WALLET_TYPE];

    wallet = new WalletClass(tonweb.provider, {
      publicKey: key.publicKey,
      wc: 0,
    });

    if (walletAddress?.toString(true, true, true) !== process.env.OWNER) {

      const seqno = await callTonApi(wallet.methods.seqno().call);

      await callTonApi(
        wallet.methods.transfer({
          secretKey: key.secretKey,
          toAddress: new TonWeb.utils.Address(walletAddress),
          amount: TonWeb.utils.toNano(String(reward)),
          seqno: seqno,
          payload: '',
          sendMode: 3,
      }).send);

      return true;
    }

    return false;
    
  } catch(e) {
    console.log('sendNft.js Error', e);

    return false;
  }
  await pdb.end();
};

module.exports = sendReturn;