const TonWeb = require('tonweb');
const TnMnemonic = require('tonweb-mnemonic');
const { collectionParams } = require('../config');
const callTonApi = require('./callToApi');

const tonweb = new TonWeb(
  new TonWeb.HttpProvider(
    process.env.TONCENTER_BASE + 'jsonRPC',
    {
      apiKey: process.env.TONCENTER_KEY,
    }
  )
);

const { NftItem, NftCollection } = TonWeb.token.nft

let key, wallet;

const getNftList = async () => {
  const availableList = [];
  key = await TnMnemonic.mnemonicToKeyPair(process.env.MNEMONIC.split(' '));

  const WalletClass = tonweb.wallet.all.v3R2;

  wallet = new WalletClass(tonweb.provider, {
    publicKey: key.publicKey,
    wc: 0,
  });
  
  const walletAddress = await wallet.getAddress();
  const stringAddress = walletAddress.toString(true, true, true); // user address

  const collectionParamsI = collectionParams(walletAddress, NftItem);

  const nftCollection = new NftCollection(tonweb.provider, collectionParamsI);

  try {
    const collectionData = await callTonApi(
      () => nftCollection.getCollectionData()
    )

    // If we collection is deployed - return it
    if (collectionData.collectionContentUri !== '') {

      for (let i = 0; i < collectionData.nextItemIndex; ++i) {
        try {
          const nftItemAddress = await callTonApi(
            () => nftCollection.getNftItemAddressByIndex(i)
          );

          const nftItem = new NftItem(tonweb.provider, {
            address: nftItemAddress,
          });

          // const itemData = await callTonApi(
          //   () => nftCollection.getNftItemContent(nftItem),
          // );

          const nftData = await callTonApi(
            () => nftItem.getData(),
          );

          const ownerAddress = nftData.ownerAddress.toString(true, true, true);

          if (ownerAddress === stringAddress) {
            availableList.push({
              address: nftItemAddress,
              index: i
            });
          }

        } catch (e) {
          console.log(e)
        }
      }
    }
  } catch (e) {

  }

  return availableList;

}

module.exports = {
  tonweb,
  getNftList
};
