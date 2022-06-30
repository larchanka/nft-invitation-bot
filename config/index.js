const config = {
  price: 0.1,
  userExpiration: 7,
  collectionParams: (walletAddress, NftItem) => ({
    ownerAddress: walletAddress,
    royalty: 0.1,
    royaltyAddress: walletAddress,
    collectionContentUri: 'https://sandbox.mobila.name/nft/json/my_collection.json',
    nftItemContentBaseUri: 'https://sandbox.mobila.name/nft/json/',
    nftItemCodeHex: NftItem.codeHex,
  }),
};

module.exports = config;