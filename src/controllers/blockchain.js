const getBlockchainInfo = ({
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
    getGasPrice(),
    getBlockNumber(),
    getChainId(),
  ]);
  return {
    blockchain: {
      blockNumber,
      gasPrice,
      chainId,
    },
  };
}

export default (web3) => ({
  getBlockchainInfo: getBlockchainInfo(web3),
});
