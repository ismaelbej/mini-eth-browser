const Web3 = require('web3');
const Promise = require('bluebird');

const web3 = new Web3(Web3.givenProviders || 'http://localhost:8545');

const getBalance = web3.eth.getBalance;
const getBlock = web3.eth.getBlock;
const getBlockNumber = web3.eth.getBlockNumber;
const getBlockTransactionCount = web3.eth.getBlockTransactionCount;
const getGasPrice = web3.eth.getGasPrice;
const getTransaction = web3.eth.getTransaction;
const getTransactionCount = web3.eth.getTransactionCount;
const getTransactionReceipt = web3.eth.getTransactionReceipt;
const getTransactionFromBlock = web3.eth.getTransactionFromBlock;

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
  getBalance,
  getBlockInfo,
  getBlockTransactionCount,
  getGasPrice,
  getLatestBlock,
  getPendingTransactions,
  getTransactionCount,
  getTransactionInfo,
  getTransactionFromBlock,
};
