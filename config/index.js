const config = {
  price: Number(process.env.NFT_PRICE),
  nextPrice: 100,
  userExpiration: 7,
  amountToBuyForReward: 3,
  // collectionParams: (walletAddress, NftItem) => ({
  //   ownerAddress: walletAddress,
  //   royalty: 0.88,
  //   royaltyAddress: walletAddress,
  //   collectionContentUri: 'https://nft-collection.credu.io/json/0.json',
  //   nftItemContentBaseUri: 'https://nft-collection.credu.io/json/',
  //   nftItemCodeHex: NftItem.codeHex,
  // }),
};

module.exports = config;