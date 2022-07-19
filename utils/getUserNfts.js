const Tonweb = require('tonweb');
const https = require('https');

const getUserNfts = async (address) => {
  try {
    const colelctionAddress = new Tonweb.utils.Address(process.env.SC_WALLET);

    
    const dataReq = await fetch(
    `${process.env.TON_API}v1/nft/getItemsByOwnerAddress?account=${address}`, {
      agent: new https.Agent({
        rejectUnauthorized: false,
      })
    });

    const { nft_items } = await dataReq.json();

    const filteredItems = nft_items
    .filter(nft => nft.collection_address === colelctionAddress.toString(false))

    return filteredItems
      .map((nft, idx) => {
        return {
          image: nft?.metadata?.image,
          name: nft?.metadata?.name,
          address: nft?.address,
        };
      })
  } catch(e) {
    console.log('getUserNfts.js Error', e.toString());

    return [];
  }
}

module.exports = getUserNfts;
