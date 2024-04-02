import { Web3 } from 'web3';

export default ({ rpcnode }) => {
  const web3 = new Web3(rpcnode);
  return {
    web3,
    getBlock: (block) => web3.eth.getBlock(block),
    getGasPrice: () => web3.eth.getGasPrice(),
    getBlockNumber: () => web3.eth.getBlockNumber(),
    getChainId: () => web3.eth.getChainId(),
    getTransaction: (txid) => web3.eth.getTransaction(txid),
    getTransactionReceipt: (txid) => web3.eth.getTransactionReceipt(txid),
    getCode: (address) => web3.eth.getCode(address),
    getBalance: (address) => web3.eth.getBalance(address),
    getTransactionCount: (address) => web3.eth.getTransactionCount(address),
  };
}
