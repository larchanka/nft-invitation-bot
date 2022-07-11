const TonWeb = require("tonweb");
const TnMnemonic = require('tonweb-mnemonic');
const callTonApi = require("./callToApi");
const { getNftList } = require("./getNftList");

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

const sendNft = async (newOwnerAddress) => {
  try {
    key = await TnMnemonic.mnemonicToKeyPair(process.env.MNEMONIC.split(' '));

    const WalletClass = tonweb.wallet.all[process.env.WALLET_TYPE];

    wallet = new WalletClass(tonweb.provider, {
      publicKey: key.publicKey,
      wc: 0,
    });

    const availableList = await getNftList();

    const randomNft = availableList[Math.floor(Math.random() * availableList.length)];

    const nftItem = new NftItem(tonweb.provider, {
      address: randomNft.address,
    });

    const seqno = await callTonApi(wallet.methods.seqno().call);

    await callTonApi(
      wallet.methods.transfer({
        secretKey: key.secretKey,
        toAddress: new TonWeb.utils.Address(randomNft.address),
        amount: TonWeb.utils.toNano('0.01'),
        seqno,
        payload: await nftItem.createTransferBody({
          newOwnerAddress: new TonWeb.utils.Address(newOwnerAddress),
          responseAddress: new TonWeb.utils.Address(newOwnerAddress),
          forwardAmount: TonWeb.utils.toNano('0'),
					forwardPayload: new TextEncoder().encode('gift'),
        }),
        sendMode: 3,
      }).send
    );

    return randomNft.address;
    
  } catch(e) {
    console.log('sendNft.js Error', e);

    return;
  }
  
};

module.exports = sendNft;
