const TonWeb = require('tonweb');

const tonweb = new TonWeb(
  new TonWeb.HttpProvider(
    process.env.TONCENTER_BASE + 'jsonRPC',
    {
      apiKey: process.env.TONCENTER_KEY,
    }
  )
);

const getNftList = async () => {
  const availableList = [];

  try {
    const nftCollectionReq = await fetch(
      `${process.env.TON_API}v1/nft/getItemsByCollectionAddress?account=${process.env.SC_WALLET}`
    );
    const { nft_items } = await nftCollectionReq.json();

    return nft_items.splice(0,111)?.filter(
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
