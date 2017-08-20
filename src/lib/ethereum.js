const Web3 = require('web3');
const Promise = require('bluebird');

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const getBlockNumber = Promise.promisify(web3.eth.getBlockNumber);
const getBlock = Promise.promisify(web3.eth.getBlock);
const getTransaction = Promise.promisify(web3.eth.getTransaction);
const getTransactionReceipt = Promise.promisify(web3.eth.getTransactionReceipt);
const getTransactionFromBlock = Promise.promisify(web3.eth.getTransactionFromBlock);
const getBlockTransactionCount = Promise.promisify(web3.eth.getBlockTransactionCount);
const getGasPrice = Promise.promisify(web3.eth.getGasPrice);

function getLatestBlock() {
  return getBlockNumber();
}

async function getBlockInfo(hash) {
  const block = await getBlock(hash);
  if (!block) {
    throw new Error(`Invalid block ${hash}`);
  }
  return block;
}

function getPendingTransactions() {
  return [];
}

async function getTransactionInfo(txid) {
  const [tx, receipt] = await Promise.all([
    getTransaction(txid),
    getTransactionReceipt(txid),
  ]);
  const block = receipt ? await getBlock(tx.blockHash) : null;
  if (block) {
    tx.block = block;
  }
  if (receipt) {
    tx.receipt = receipt;
  }
  return tx;
}

module.exports = {
  getBlockInfo,
  getBlockTransactionCount,
  getGasPrice,
  getLatestBlock,
  getPendingTransactions,
  getTransactionInfo,
  getTransactionFromBlock,
};