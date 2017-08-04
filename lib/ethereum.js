const Web3 = require('web3');
const Promise = require('bluebird');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const getBlockNumber = Promise.promisify(web3.eth.getBlockNumber);
const getBlock = Promise.promisify(web3.eth.getBlock);
const getTransaction = Promise.promisify(web3.eth.getTransaction);

function getLatestBlock() {
  return getBlockNumber();
}

function getBlockInfo(block) {
  return getBlock(block);
}

function getTransactionInfo(txid) {
  return getTransaction(txid);
}

module.exports = {
  getLatestBlock,
  getBlockInfo,
  getTransactionInfo,
};
