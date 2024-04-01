const getBlockchainInfo = ({
  getBlock,
  getGasPrice,
  getBlockNumber,
  getChainId,
}) => async () => {
  const [
    block,
    gasPrice,
    blockNumber,
    chainId,
  ] = await Promise.all([
    getBlock('latest'),
    getGasPrice(),
    getBlockNumber(),
    getChainId(),
  ]);
  return {
    blockchain: {
      blockNumber,
      block,
      gasPrice,
      chainId,
    },
  };
}

export default (web3) => ({
  getBlockchainInfo: getBlockchainInfo(web3),
});
