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

const { NftItem } = TonWeb.token.nft

let key, wallet;

const sendReturn = async (tgId) => {
  try {
    const pdb = new Pool();
    const now = new Date().getTime();
    const uDataReq = await pdb.query(`select * from verify where tgid=${tgId}`);
    await pdb.end();

    const walletAddress = uDataReq?.rows[0]?.owner;

    key = await TnMnemonic.mnemonicToKeyPair(process.env.MNEMONIC.split(' '));

    const WalletClass = tonweb.wallet.all.v3R2;

    wallet = new WalletClass(tonweb.provider, {
      publicKey: key.publicKey,
      wc: 0,
    });

    const seqno = await callTonApi(wallet.methods.seqno().call);

    await callTonApi(
      wallet.methods.transfer({
        secretKey: key.secretKey,
        toAddress: new TonWeb.utils.Address(walletAddress),
        amount: TonWeb.utils.toNano(String(price)),
        seqno: seqno,
        payload: '',
        sendMode: 3,
    }).send);

    return true;
    
  } catch(e) {
    console.log('sendNft.js Error', e);

    return false;
  }
};

module.exports = sendReturn;