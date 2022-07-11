const config = {
  price: Number(process.env.NFT_PRICE),
  userExpiration: 7,
  amountToBuyForReward: 3,
  collectionParams: (walletAddress, NftItem) => ({
    ownerAddress: walletAddress,
    royalty: 1,
    royaltyAddress: walletAddress,
    collectionContentUri: 'https://sandbox.mobila.name/nft/json/my_collection.json',
    nftItemContentBaseUri: 'https://sandbox.mobila.name/nft/json/',
    nftItemCodeHex: NftItem.codeHex,
  }),
};

module.exports = config;