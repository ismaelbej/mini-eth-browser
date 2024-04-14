const getBlockchainInfo = ({
  getBlockNumber,
  getChainId,
  getGasPrice,
}) => async () => {
    const [
    blockNumber,
    chainId,
    gasPrice,
  ] = await Promise.all([
    getBlockNumber(),
    getChainId(),
    getGasPrice(),
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
