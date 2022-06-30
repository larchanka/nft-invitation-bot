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

  try {
    const nftCollectionReq = await fetch(
      `${process.env.TON_API}v1/nft/getItemsByCollectionAddress?account=${process.env.SC_WALLET}`
    );
    const { nft_items } = await nftCollectionReq.json();

    return nft_items?.filter(
      ({ owner: { address } }) => new TonWeb.Address(address).toString(true, true, true) === process.env.OWNER
    ).map(
      ({ index, address }) => ({
        index,
        address,
      })
    );

  } catch (e) {

  }

  return availableList;

}

module.exports = {
  tonweb,
  getNftList
};
